#!/usr/bin/env python3
"""
Hermes Client (AGNode1)
Automatically discovers Atlas's live HTTPS tunnel via GitHub Gist 0c0a727ed3934ec6675809316c68ccc7
or LAN mDNS so it never breaks across Wi-Fi networks or tunnel rotations!
"""

import sys
import os
import io
import json
import time
import base64
import tarfile
import urllib.request
import urllib.parse
from threading import Thread

GIST_API_URL = "https://api.github.com/gists/0c0a727ed3934ec6675809316c68ccc7"
CANDIDATE_SERVERS = [
    "http://192.168.1.249:8765",
    "http://mahdis-MacBook-Pro.local:8765",
    "http://10.15.38.116:8765",
    "http://192.168.1.67:8765",
]
NODE_NAME = "Hermes"
PEER_NAME = "Atlas"

def get_gist_tunnel_url():
    try:
        req = urllib.request.Request(GIST_API_URL, headers={"User-Agent": "Hermes-AGNode1"})
        with urllib.request.urlopen(req, timeout=4) as res:
            data = json.loads(res.read().decode("utf-8"))
            url = data.get("files", {}).get("atlas_tunnel_url.txt", {}).get("content", "").strip()
            if url.startswith("http"):
                return url
    except Exception:
        pass
    return None

def discover_server():
    for arg in sys.argv[1:]:
        if arg.startswith("http"):
            return arg
    if os.environ.get("ATLAS_URL"):
        return os.environ["ATLAS_URL"]
    # 1. Try local LAN first (fastest if on same Wi-Fi)
    for url in CANDIDATE_SERVERS:
        try:
            req = urllib.request.Request(f"{url}/api/status")
            with urllib.request.urlopen(req, timeout=1.0) as res:
                if res.status == 200:
                    return url
        except Exception:
            pass
    # 2. Fetch live HTTPS tunnel URL from GitHub Gist
    gist_url = get_gist_tunnel_url()
    if gist_url:
        return gist_url
    return CANDIDATE_SERVERS[0]

SERVER = discover_server()

def refresh_server():
    global SERVER
    for url in CANDIDATE_SERVERS:
        try:
            req = urllib.request.Request(f"{url}/api/status")
            with urllib.request.urlopen(req, timeout=1.5) as res:
                if res.status == 200:
                    SERVER = url
                    return SERVER
        except Exception:
            pass
    gist_url = get_gist_tunnel_url()
    if gist_url:
        SERVER = gist_url
    return SERVER

def send_heartbeat_once():
    try:
        req = urllib.request.Request(
            f"{SERVER}/api/heartbeat",
            data=json.dumps({"node": NODE_NAME, "role": "MacBook Air / Swift Envoy"}).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req, timeout=4)
    except Exception:
        refresh_server()

def send_heartbeat():
    while True:
        send_heartbeat_once()
        time.sleep(4)

def _upload_tar_bytes(raw_bytes, target_name):
    b64_str = base64.b64encode(raw_bytes).decode("ascii")
    for attempt in range(2):
        try:
            req = urllib.request.Request(
                f"{SERVER}/api/upload-folder",
                data=json.dumps({"folder_name": target_name, "tar_gz_base64": b64_str}).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=60) as res:
                out = json.loads(res.read().decode("utf-8"))
                print(f"[Success] Cloned '{target_name}' ({len(raw_bytes)/1024:.1f} KB) -> {out.get('target_dir')} ({out.get('extracted_files')} files)")
                return True
        except Exception as e:
            if attempt == 0:
                refresh_server()
            else:
                print(f"[Upload Warning for '{target_name}']: {e}")
    return False

def push_folder(folder_path, target_name=None):
    folder_path = os.path.abspath(os.path.expanduser(folder_path))
    if not os.path.isdir(folder_path):
        print(f"[Error] Folder not found: {folder_path}")
        return False
    folder_name = target_name or os.path.basename(folder_path.rstrip("/"))
    EXCLUDE = {"node_modules", ".venv", "venv", "__pycache__", ".next", "dist", ".cache", ".DS_Store"}

    # Pack in ~400KB batches so reverse-tunnel proxies never reject large payloads!
    MAX_BATCH_BYTES = 400 * 1024
    batch_buf = io.BytesIO()
    batch_tar = tarfile.open(fileobj=batch_buf, mode="w:gz")
    batch_count = 0
    total_files = 0

    for root, dirs, files in os.walk(folder_path):
        dirs[:] = [d for d in dirs if d not in EXCLUDE]
        for file in files:
            if file in EXCLUDE:
                continue
            full_p = os.path.join(root, file)
            rel_p = os.path.relpath(full_p, folder_path)
            try:
                fsize = os.path.getsize(full_p)
            except Exception:
                continue
            # If single file > MAX_BATCH_BYTES, send current batch first
            if batch_count > 0 and (batch_buf.tell() + fsize > MAX_BATCH_BYTES):
                batch_tar.close()
                _upload_tar_bytes(batch_buf.getvalue(), folder_name)
                batch_buf = io.BytesIO()
                batch_tar = tarfile.open(fileobj=batch_buf, mode="w:gz")
                batch_count = 0
            try:
                batch_tar.add(full_p, arcname=rel_p)
                batch_count += 1
                total_files += 1
            except Exception:
                pass

    batch_tar.close()
    if batch_count > 0:
        _upload_tar_bytes(batch_buf.getvalue(), folder_name)

    print(f"[Complete] Synced {total_files} files for '{folder_name}' to Atlas!")
    return True

def send_message(text, sender=NODE_NAME, recipient=PEER_NAME):
    send_heartbeat_once()
    for attempt in range(2):
        try:
            req = urllib.request.Request(
                f"{SERVER}/api/message",
                data=json.dumps({
                    "sender": sender,
                    "recipient": recipient,
                    "text": text
                }).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=5) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception as e:
            # Check if the server saved the message before closing connection
            try:
                req2 = urllib.request.Request(f"{SERVER}/api/messages")
                with urllib.request.urlopen(req2, timeout=3) as res2:
                    data2 = json.loads(res2.read().decode("utf-8"))
                    msgs = data2.get("messages", [])
                    if msgs and msgs[-1].get("sender") == sender and msgs[-1].get("text") == text:
                        return {"status": "ok", "message": msgs[-1]}
            except Exception:
                pass
            if attempt == 0:
                refresh_server()
            else:
                print(f"[Error] Failed to send message to {PEER_NAME} at {SERVER}: {e}")
    return None

STATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".hermes_last_id")

def get_last_seen_id():
    try:
        with open(STATE_FILE, "r") as f:
            return int(f.read().strip())
    except Exception:
        return 0

def set_last_seen_id(msg_id):
    try:
        with open(STATE_FILE, "w") as f:
            f.write(str(int(msg_id)))
    except Exception:
        pass

def wait_for_reply(after_id=None, timeout=86400):
    send_heartbeat_once()
    if after_id is None:
        after_id = get_last_seen_id()
        try:
            req = urllib.request.Request(f"{SERVER}/api/messages")
            with urllib.request.urlopen(req, timeout=4) as res:
                data = json.loads(res.read().decode("utf-8"))
                msgs = data.get("messages", [])
                for m in msgs:
                    if m.get("id", 0) > after_id and m.get("sender") == PEER_NAME:
                        set_last_seen_id(m.get("id", 0))
                        print(f"[{PEER_NAME} ({m.get('time_str', '')})]: {m.get('text')}", flush=True)
                        return m
                if msgs and msgs[-1].get("id", 0) > after_id:
                    after_id = msgs[-1].get("id", 0)
                    set_last_seen_id(after_id)
        except Exception:
            refresh_server()

    start = time.time()
    last_hb = 0
    while time.time() - start < timeout:
        if time.time() - last_hb > 4:
            send_heartbeat_once()
            last_hb = time.time()
        try:
            req = urllib.request.Request(f"{SERVER}/api/messages")
            with urllib.request.urlopen(req, timeout=4) as res:
                data = json.loads(res.read().decode("utf-8"))
                for m in data.get("messages", []):
                    if m.get("id", 0) > after_id and m.get("sender") == PEER_NAME:
                        set_last_seen_id(m.get("id", 0))
                        print(f"\n[{PEER_NAME} ({m.get('time_str', '')})]: {m.get('text')}", flush=True)
                        return m
        except Exception:
            refresh_server()
        time.sleep(1)

    print(f"[Timeout] No reply from {PEER_NAME} within {timeout}s.", flush=True)
    return None

def ping():
    t0 = time.time()
    send_heartbeat_once()
    try:
        req = urllib.request.Request(f"{SERVER}/api/status")
        with urllib.request.urlopen(req, timeout=4) as res:
            latency = (time.time() - t0) * 1000
            data = json.loads(res.read().decode("utf-8"))
            print(f"[Ping] Connected to Atlas at {SERVER} in {latency:.1f}ms")
            print(f"[Status] Atlas: {data.get('Atlas', {}).get('status', 'unknown')} | Hermes: {data.get('Hermes', {}).get('status', 'unknown')}")
            return True
    except Exception as e:
        print(f"[Ping Failed] Cannot reach Atlas at {SERVER}: {e}")
        return False

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("http")]
    command = args[0] if args else "ping"

    if command == "ping":
        ping()
    elif command == "push-folder":
        if len(args) < 2:
            print("Usage: python3 hermes_client.py push-folder /path/to/Hanken [target_name]")
            sys.exit(1)
        push_folder(args[1], args[2] if len(args) > 2 else None)
    elif command == "send":
        msg = " ".join(args[1:]) if len(args) > 1 else "Hello from Hermes!"
        res = send_message(msg)
        if res:
            print(f"[Sent to Atlas]: {msg}")
    elif command == "send-and-wait":
        msg = " ".join(args[1:]) if len(args) > 1 else "Hello from Hermes!"
        res = send_message(msg)
        if res and "message" in res:
            sent_id = res["message"]["id"]
            print(f"[Hermes -> Atlas]: {msg}")
            print("[Waiting for Atlas's reply...]")
            wait_for_reply(after_id=sent_id)
    elif command == "wait":
        print("[Waiting for Atlas's message...]")
        wait_for_reply()
    else:
        ping()

if __name__ == "__main__":
    main()
