"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, MapPin, CreditCard, Calendar } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  avatar: string;
  category: string[];
  hourlyRate: number;
}

const STEPS = ["Date & Time", "Address", "Review", "Pay"];
const DATES = [
  { label: "Mon", sub: "24 Feb" },
  { label: "Tue", sub: "25 Feb" },
  { label: "Wed", sub: "26 Feb" },
  { label: "Thu", sub: "27 Feb" },
  { label: "Fri", sub: "28 Feb" },
];
const SLOTS = ["09:00–11:00", "11:00–13:00", "13:00–15:00", "15:00–17:00"];

export default function BookClient({ provider, id }: { provider: Provider; id: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [hours, setHours] = useState(2);
  const [address, setAddress] = useState("Mannerheimintie 10");
  const [notes, setNotes] = useState("");
  const [paying, setPaying] = useState(false);

  const labor = hours * provider.hourlyRate;
  const deduction = labor * 0.45;
  const effective = labor - deduction;

  const canNext = step === 0 ? !!(date && slot) : step === 1 ? address.length > 4 : true;

  function handlePay() {
    setPaying(true);
    setTimeout(() => router.push("/booking-confirmed"), 1800);
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 20px" }}>
      {/* Back link */}
      <Link href={`/providers/${id}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: "#6b7280", textDecoration: "none", marginBottom: 20 }}>
        <ChevronLeft size={15} /> Back to profile
      </Link>

      {/* Provider mini-header */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
        <img src={provider.avatar} alt={provider.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#32373c" }}>{provider.name}</div>
          <div style={{ fontSize: 12, color: "#9ca3af", textTransform: "capitalize" }}>{provider.category.join(", ")} · €{provider.hourlyRate}/hr</div>
        </div>
      </div>

      {/* Step progress */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: i < step ? "#76b82a" : i === step ? "#32373c" : "#e5e7eb",
                color: i <= step ? "white" : "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, transition: "all 0.2s",
              }}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span style={{ fontSize: 10, marginTop: 4, fontWeight: i === step ? 600 : 400, color: i === step ? "#32373c" : "#9ca3af", whiteSpace: "nowrap" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < step ? "#76b82a" : "#e5e7eb", margin: "0 6px", marginBottom: 18, transition: "background 0.2s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card" style={{ padding: "24px 22px", marginBottom: 20 }}>

        {/* STEP 1 — Date & Time */}
        {step === 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Calendar size={16} color="#76b82a" />
              <span style={{ fontWeight: 600, fontSize: 15, color: "#32373c" }}>Select date & time</span>
            </div>

            {/* Date selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {DATES.map(d => {
                const selected = date === d.label + " " + d.sub;
                return (
                  <button key={d.label} onClick={() => setDate(d.label + " " + d.sub)} style={{
                    flex: 1, padding: "10px 4px", borderRadius: 8, border: "2px solid",
                    borderColor: selected ? "#76b82a" : "#e5e7eb",
                    background: selected ? "#76b82a" : "white",
                    color: selected ? "white" : "#32373c",
                    cursor: "pointer", fontSize: 11, fontWeight: 600,
                    transition: "all 0.15s", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{d.label}</div>
                    <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{d.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Slot selector */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {SLOTS.map(s => {
                const selected = slot === s;
                return (
                  <button key={s} onClick={() => setSlot(s)} style={{
                    padding: "10px 8px", borderRadius: 8, border: "2px solid",
                    borderColor: selected ? "#32373c" : "#e5e7eb",
                    background: selected ? "#32373c" : "white",
                    color: selected ? "white" : "#374151",
                    cursor: "pointer", fontSize: 13, fontWeight: 500,
                    transition: "all 0.15s",
                  }}>
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Duration */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Duration</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[2, 3, 4, 5].map(h => (
                  <button key={h} onClick={() => setHours(h)} style={{
                    flex: 1, padding: "9px 4px", borderRadius: 8, border: "2px solid",
                    borderColor: hours === h ? "#76b82a" : "#e5e7eb",
                    background: hours === h ? "#f0f7e6" : "white",
                    color: hours === h ? "#3d6e10" : "#374151",
                    cursor: "pointer", fontSize: 14, fontWeight: 700, transition: "all 0.15s",
                  }}>
                    {h}h
                  </button>
                ))}
              </div>
            </div>

            {date && slot && (
              <div style={{ marginTop: 14, padding: "10px 12px", background: "#f0f7e6", borderRadius: 8, fontSize: 12, color: "#3d6e10", fontWeight: 500 }}>
                ✓ Selected: {date} · {slot} · {hours} hours · €{labor.toFixed(0)}
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Address */}
        {step === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <MapPin size={16} color="#76b82a" />
              <span style={{ fontWeight: 600, fontSize: 15, color: "#32373c" }}>Your address</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Street address</label>
                <input className="input" placeholder="e.g. Mannerheimintie 10" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>City</label>
                  <input className="input" defaultValue="Helsinki" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Postal code</label>
                  <input className="input" placeholder="00100" />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                  Access notes <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea className="input" rows={3} style={{ resize: "none" }} placeholder="Floor, door code, parking, pets..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === 2 && (
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#32373c", marginBottom: 18 }}>Review your booking</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { label: "Provider", value: provider.name },
                { label: "Service", value: provider.category[0].charAt(0).toUpperCase() + provider.category[0].slice(1) },
                { label: "Date & time", value: `${date || "Mon 24 Feb"} · ${slot || "09:00–11:00"}` },
                { label: "Duration", value: `${hours} hours` },
                { label: "Address", value: `${address}, Helsinki` },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                  <span style={{ color: "#6b7280" }}>{row.label}</span>
                  <span style={{ fontWeight: 500, color: "#32373c", textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#f8f9fa", borderRadius: 10, padding: "16px", marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: "#6b7280" }}>Labor ({hours}h × €{provider.hourlyRate}/hr)</span>
                <span style={{ fontWeight: 600 }}>€{labor.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 12, color: "#76b82a" }}>
                <span style={{ fontWeight: 500 }}>💡 Tax deduction estimate (45%)</span>
                <span style={{ fontWeight: 700 }}>−€{deduction.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Total charged</div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>After tax deduction: ≈ €{effective.toFixed(2)}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#32373c" }}>€{labor.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — Pay */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <CreditCard size={16} color="#76b82a" />
              <span style={{ fontWeight: 600, fontSize: 15, color: "#32373c" }}>Payment</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Card number</label>
                <input className="input" defaultValue="4242 4242 4242 4242" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Expiry</label>
                  <input className="input" defaultValue="12/27" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>CVC</label>
                  <input className="input" defaultValue="•••" />
                </div>
              </div>
            </div>

            <div style={{ background: "#f0f7e6", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, color: "#32373c" }}>
                <span>Total to charge</span>
                <span>€{labor.toFixed(2)}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Effective cost after tax return: ≈ €{effective.toFixed(2)}</div>
            </div>

            <button onClick={handlePay} disabled={paying} className="btn-green" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px" }}>
              {paying ? "Processing..." : `Pay €${labor.toFixed(2)}`}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 10 }}>
              🔒 Secured by Stripe · Free cancellation up to 24h before job
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} className="btn-outline">
            <ChevronLeft size={15} /> Back
          </button>
        ) : <div />}
        {step < 3 && (
          <button onClick={() => canNext && setStep(s => s + 1)} className="btn-primary"
            style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? "pointer" : "not-allowed" }}>
            Continue <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
