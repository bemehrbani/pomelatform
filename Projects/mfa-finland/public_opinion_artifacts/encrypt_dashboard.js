const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const password = "helsinki2026";
const outputDir = path.join(__dirname, 'dist');
const outputPath = path.join(outputDir, 'index.html');

// Create dist directory if not exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// ----------------------------------------------------
// Raw HTML Payload (The Unencrypted Premium Dashboard)
// ----------------------------------------------------
const unencryptedHtml = fs.readFileSync(path.join(__dirname, 'dashboard_raw.html'), 'utf8');

// ----------------------------------------------------
// Password Gate HTML wrapper
// ----------------------------------------------------
const gateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consular Analytics Dashboard — SECURE ACCESS</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-primary: #040905;
            --bg-secondary: #08140b;
            --bg-card: rgba(11, 26, 17, 0.9);
            --border-card: rgba(212, 175, 55, 0.2);
            --accent-gold: #d4af37;
            --accent-gold-glow: rgba(212, 175, 55, 0.3);
            --text-main: #e8f0ea;
            --text-sub: #9eaf9f;
            --danger: #ff6b6b;
            --success: #2ecc71;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: relative;
        }

        /* Subtle glowing diplomatic crest background shape */
        body::before {
            content: '';
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%);
            border-radius: 50%;
            top: calc(50% - 300px);
            left: calc(50% - 300px);
            z-index: 0;
            pointer-events: none;
        }

        .gate-container {
            width: 100%;
            max-width: 450px;
            padding: 45px 40px;
            background: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.08);
            text-align: center;
            z-index: 10;
            position: relative;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }

        .shake {
            animation: shake 0.4s ease-in-out;
            border-color: var(--danger) !important;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.25) !important;
        }

        .crest-svg {
            width: 64px;
            height: 64px;
            fill: var(--accent-gold);
            margin-bottom: 25px;
            filter: drop-shadow(0 0 8px var(--accent-gold-glow));
        }

        .gate-header h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.12em;
            color: var(--accent-gold);
            text-transform: uppercase;
            margin-bottom: 8px;
        }

        .gate-header p {
            font-size: 12.5px;
            color: var(--text-sub);
            letter-spacing: 0.02em;
            line-height: 1.5;
            margin-bottom: 30px;
        }

        .input-group {
            margin-bottom: 20px;
            text-align: left;
        }

        .input-group label {
            font-size: 11px;
            font-weight: 600;
            color: var(--text-sub);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 8px;
            margin-left: 4px;
        }

        .passcode-field {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.35);
            border: 1px solid var(--border-card);
            border-radius: 8px;
            padding: 14px 18px;
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            text-align: center;
            letter-spacing: 0.25em;
            transition: all 0.3s ease;
            outline: none;
        }

        .passcode-field:focus {
            border-color: var(--accent-gold);
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
            background-color: rgba(0, 0, 0, 0.5);
        }

        .decrypt-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--accent-gold) 0%, #aa7c11 100%);
            border: none;
            padding: 14px 20px;
            color: #050d06;
            font-family: 'Outfit', sans-serif;
            font-size: 14.5px;
            font-weight: 700;
            letter-spacing: 0.06em;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
        }

        .decrypt-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
            filter: brightness(1.1);
        }

        .decrypt-btn:active {
            transform: translateY(0);
        }

        .alert-box {
            background-color: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: var(--danger);
            font-size: 12.5px;
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            display: none;
            line-height: 1.4;
            animation: fadeIn 0.3s ease-out;
        }

        .spinner-box {
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-top: 20px;
        }

        .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid rgba(212, 175, 55, 0.1);
            border-top: 3px solid var(--accent-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }
    </style>
</head>
<body>

    <div class="gate-container" id="passcode-card">
        <!-- Diplomatic Emblem SVG -->
        <svg class="crest-svg" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4M12,18C8.69,18 6,15.31 6,12C6,10 7,8.25 8.56,7.18L9.84,8.46C8.72,9.19 8,10.5 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12C16,10.5 15.28,9.19 14.16,8.46L15.44,7.18C17,8.25 18,10 18,12C18,15.31 15.31,18 12,18Z"/>
        </svg>

        <div class="gate-header">
            <h1>Embassy of Iran</h1>
            <p>Consular Public Opinion Analytics Dashboard<br><span style="font-size:11px; opacity:0.6;">RESTRICTED DIPLOMATIC REPORT • HELSINKI</span></p>
        </div>

        <form id="passcode-form" onsubmit="handleAccess(event)">
            <div class="input-group">
                <label for="passcode">Consular Passphrase</label>
                <input type="password" id="passcode" class="passcode-field" required placeholder="••••••••">
            </div>

            <button type="submit" class="decrypt-btn" id="submit-btn">Decrypt & Access</button>
        </form>

        <div class="alert-box" id="error-alert">
            Incorrect Passphrase. Secure decryption failed.<br>Access attempt logged.
        </div>

        <div class="spinner-box" id="loading-spinner">
            <div class="spinner"></div>
            <p style="font-size: 12px; color: var(--text-sub);">Deriving cryptographic keys and unlocking database...</p>
        </div>
    </div>

    <!-- Inject decrypted DOM container dynamically -->
    <div id="decrypted-app-root" style="display:none; width:100%; min-height:100vh;"></div>

    <!-- Cryptographic Engine -->
    <script>
        // Encrypted Payload details
        const SECURE_DATA = {
            salt: "PLACEHOLDER_SALT",
            iv: "PLACEHOLDER_IV",
            ciphertext: "PLACEHOLDER_CIPHERTEXT"
        };

        // Utility to convert Base64 string to ArrayBuffer
        function base64ToArrayBuffer(base64) {
            const binary_string = window.atob(base64);
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        // Web Crypto decryption routine
        async function decryptPayload(passphrase) {
            const salt = base64ToArrayBuffer(SECURE_DATA.salt);
            const iv = base64ToArrayBuffer(SECURE_DATA.iv);
            const combined = base64ToArrayBuffer(SECURE_DATA.ciphertext);

            const encoder = new TextEncoder();
            
            // 1. Import raw password bytes
            const passwordKey = await window.crypto.subtle.importKey(
                'raw',
                encoder.encode(passphrase),
                { name: 'PBKDF2' },
                false,
                ['deriveKey']
            );

            // 2. Derive key from password using PBKDF2
            const key = await window.crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                passwordKey,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );

            // 3. Decrypt concatenated ciphertext + auth tag
            const decryptedBuffer = await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                key,
                combined
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedBuffer);
        }

        // Handle unlock submission
        async function handleAccess(event) {
            event.preventDefault();
            const passcodeField = document.getElementById('passcode');
            const submitBtn = document.getElementById('submit-btn');
            const passcodeForm = document.getElementById('passcode-form');
            const errorAlert = document.getElementById('error-alert');
            const loadingSpinner = document.getElementById('loading-spinner');
            const passcodeCard = document.getElementById('passcode-card');

            const phrase = passcodeField.value;

            // Clean UI states
            errorAlert.style.display = 'none';
            passcodeCard.classList.remove('shake');

            // Show loading state
            passcodeForm.style.display = 'none';
            loadingSpinner.style.display = 'flex';

            try {
                // Cryptographic operations (PBKDF2 iteration time takes approx 100-300ms)
                const decryptedHTML = await decryptPayload(phrase);
                
                // Decryption successful!
                loadingSpinner.innerHTML = '<div style="color:var(--success); font-size:24px; font-weight:700;">✓ SECURE PAYLOAD UNLOCKED</div>';
                
                setTimeout(() => {
                    // Animate out card
                    passcodeCard.style.animation = 'fadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    
                    setTimeout(() => {
                        // Unmount Gate UI, Inject dashboard
                        passcodeCard.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        document.body.style.background = 'var(--bg-primary)';
                        
                        const root = document.getElementById('decrypted-app-root');
                        root.style.display = 'block';
                        root.innerHTML = decryptedHTML;

                        // Force script evaluation for active dashboard routines
                        const scripts = root.querySelectorAll('script');
                        scripts.forEach(oldScript => {
                            const newScript = document.createElement('script');
                            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                            oldScript.parentNode.replaceChild(newScript, oldScript);
                        });
                    }, 400);
                }, 800);

            } catch (err) {
                // Decryption failed (bad password)
                console.error(err);
                
                setTimeout(() => {
                    // Restore UI states
                    loadingSpinner.style.display = 'none';
                    passcodeForm.style.display = 'block';
                    passcodeCard.classList.add('shake');
                    errorAlert.style.display = 'block';
                    passcodeField.value = '';
                    passcodeField.focus();
                }, 600);
            }
        }
    </script>
</body>
</html>`;

// ----------------------------------------------------
// Node.js PBKDF2 + AES-GCM Encrypter Logic
// ----------------------------------------------------

console.log('Compiling dashboard raw HTML payload...');
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

// Derive Key in Node using identical parameters (100,000 PBKDF2 iterations, SHA-256, 32 bytes key)
console.log('Deriving cryptographic key...');
const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

console.log('Encrypting dashboard with AES-256-GCM...');
const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
let encrypted = cipher.update(unencryptedHtml, 'utf8');
encrypted = Buffer.concat([encrypted, cipher.final()]);
const tag = cipher.getAuthTag();

// Web Crypto standard for AES-GCM decryption expects the Auth Tag concatenated at the tail of the ciphertext Buffer
const combinedCiphertext = Buffer.concat([encrypted, tag]);

console.log('Formatting encrypted base64 payload strings...');
const saltBase64 = salt.toString('base64');
const ivBase64 = iv.toString('base64');
const ciphertextBase64 = combinedCiphertext.toString('base64');

// Substitute GCM details into Web wrapper template
console.log('Injecting base64 parameters into secure HTML gate wrapper...');
let finalHtml = gateHtml
    .replace('PLACEHOLDER_SALT', saltBase64)
    .replace('PLACEHOLDER_IV', ivBase64)
    .replace('PLACEHOLDER_CIPHERTEXT', ciphertextBase64);

// Write Index.html file
console.log(`Writing finalized secure index.html file to: ${outputPath}`);
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('BUILD COMPLETED SUCCESSFULLY!');
