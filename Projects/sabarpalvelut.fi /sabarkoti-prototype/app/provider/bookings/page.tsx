"use client";
import { useState } from "react";
import { providerBookings } from "@/lib/mock-data";
import { Check, X, MapPin } from "lucide-react";

const statusLabel: Record<string, { label: string; cls: string }> = {
  pending: { label: "Awaiting response", cls: "badge-yellow" },
  confirmed: { label: "Confirmed", cls: "badge-green" },
  completed: { label: "Completed", cls: "badge-gray" },
};

export default function ProviderBookings() {
  const [tab, setTab] = useState<"pending" | "upcoming" | "past">("pending");
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [declined, setDeclined] = useState<Record<string, boolean>>({});

  const tabs = {
    pending: providerBookings.filter(b => b.status === "pending"),
    upcoming: providerBookings.filter(b => b.status === "confirmed"),
    past: providerBookings.filter(b => b.status === "completed"),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#32373c" }}>Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "#f0f0f0" }}>
        {(["pending", "upcoming", "past"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
            style={tab === t ? { background: "white", color: "#32373c", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { color: "#6b7280" }}>
            {t} ({tabs[t].length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tabs[tab].map(b => {
          const isAccepted = accepted[b.id];
          const isDeclined = declined[b.id];
          const s = statusLabel[b.status];

          return (
            <div key={b.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#32373c" }}>
                    {b.customerInitials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#32373c" }}>
                      {isAccepted ? b.customerName : "Customer"} · {b.category}
                    </div>
                    <div className="text-xs text-gray-400">{b.date} · {b.time} · {b.duration}h</div>
                  </div>
                </div>
                {isAccepted ? <span className="badge-green">Accepted</span> :
                 isDeclined ? <span className="badge-gray">Declined</span> :
                 <span className={s.cls}>{s.label}</span>}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <MapPin size={11} />
                {isAccepted ? "Mannerheimintie 10, Helsinki (full address revealed)" : b.area + " (address revealed after accepting)"}
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div>
                  <span className="text-sm font-bold" style={{ color: "#76b82a" }}>€{b.netEarning}</span>
                  <span className="text-xs text-gray-400 ml-1">you earn (gross €{b.grossEarning})</span>
                </div>

                {b.status === "pending" && !isAccepted && !isDeclined && (
                  <div className="flex gap-2">
                    {b.hoursLeft && <span className="text-xs text-orange-500 font-medium mr-1">⏱ {b.hoursLeft}h {b.minutesLeft}m left</span>}
                    <button onClick={() => setAccepted(prev => ({...prev, [b.id]: true}))} className="btn-green text-xs px-3 py-1.5">
                      <Check size={12} /> Accept
                    </button>
                    <button onClick={() => setDeclined(prev => ({...prev, [b.id]: true}))} className="btn-outline text-xs px-3 py-1.5">
                      <X size={12} /> Decline
                    </button>
                  </div>
                )}

                {b.status === "confirmed" && (
                  <button className="btn-green text-xs px-3 py-1.5">
                    <Check size={12} /> Mark complete
                  </button>
                )}

                {b.status === "completed" && (
                  <span className="badge-gray">Paid out</span>
                )}
              </div>
            </div>
          );
        })}

        {tabs[tab].length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-gray-400 text-sm">No {tab} bookings</div>
          </div>
        )}
      </div>
    </div>
  );
}
