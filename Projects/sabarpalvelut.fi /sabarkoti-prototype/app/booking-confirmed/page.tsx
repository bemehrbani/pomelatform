import Link from "next/link";
import { Check, Calendar, Home } from "lucide-react";

export default function BookingConfirmed() {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "48px 20px" }}>
      <div className="card" style={{ padding: "40px 36px", textAlign: "center" }}>
        {/* Checkmark */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#e8f5d6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Check size={36} color="#76b82a" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#32373c", marginBottom: 8 }}>Booking confirmed!</h1>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>
          Your booking request has been sent to <strong style={{ color: "#32373c" }}>Aino Mäkinen</strong>. She will confirm within 2 hours — you&apos;ll get an email once confirmed.
        </p>

        {/* Summary */}
        <div style={{ background: "#f8f9fa", borderRadius: 10, padding: "16px 18px", marginBottom: 16, textAlign: "left" }}>
          {[
            { label: "Service", value: "Home Cleaning · 3h" },
            { label: "Date & time", value: "Mon 24 Feb · 09:00–12:00" },
            { label: "Address", value: "Mannerheimintie 10, Helsinki" },
            { label: "Amount charged", value: "€75.00", bold: true },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 3 ? "1px solid #eee" : "none", fontSize: 13 }}>
              <span style={{ color: "#9ca3af" }}>{r.label}</span>
              <span style={{ fontWeight: r.bold ? 700 : 500, color: "#32373c" }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, fontSize: 12 }}>
            <span style={{ color: "#76b82a", fontWeight: 600 }}>💡 Tax deduction (after filing)</span>
            <span style={{ color: "#76b82a", fontWeight: 700 }}>−€33.75</span>
          </div>
        </div>

        {/* Tax receipt notice */}
        <div style={{ background: "#e8f5d6", borderRadius: 10, padding: "14px 16px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#32373c", marginBottom: 4 }}>📄 Tax receipt coming</div>
          <p style={{ fontSize: 12, color: "#5b6c48", lineHeight: 1.5, margin: 0 }}>
            After the job is complete, we&apos;ll automatically email you a kotitalousvähennys-compatible receipt for your annual tax return at vero.fi.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/dashboard/bookings" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
              <Calendar size={15} /> View my bookings
            </button>
          </Link>
          <Link href="/providers" style={{ textDecoration: "none" }}>
            <button className="btn-outline" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
              <Home size={15} /> Book another service
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
