"use client";
import { useState } from "react";
import Link from "next/link";
import { customerBookings } from "@/lib/mock-data";
import { Star, Download, RotateCcw, ChevronRight } from "lucide-react";

const statusLabel: Record<string, { label: string; class: string }> = {
  confirmed: { label: "Confirmed", class: "badge-green" },
  pending_provider: { label: "Awaiting confirmation", class: "badge-yellow" },
  completed: { label: "Completed", class: "badge-gray" },
  cancelled: { label: "Cancelled", class: "badge-gray" },
};

export default function CustomerBookings() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const upcoming = customerBookings.filter(b => b.status === "confirmed" || b.status === "pending_provider");
  const past = customerBookings.filter(b => b.status === "completed" || b.status === "cancelled");
  const shown = tab === "upcoming" ? upcoming : past;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#32373c" }}>My Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "#f0f0f0" }}>
        {(["upcoming", "past"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
            style={tab === t ? { background: "white", color: "#32373c", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { color: "#6b7280" }}>
            {t} ({t === "upcoming" ? upcoming.length : past.length})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-4">📅</div>
          <div className="font-semibold text-gray-500 mb-2">No {tab} bookings</div>
          <Link href="/providers"><button className="btn-primary mt-2">Browse professionals</button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {shown.map(b => {
            const s = statusLabel[b.status];
            return (
              <div key={b.id} className="card p-5">
                <div className="flex gap-4">
                  <img src={b.providerAvatar} alt={b.providerName} className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#32373c" }}>{b.providerName}</div>
                        <div className="text-xs text-gray-400">{b.category}</div>
                      </div>
                      <span className={s.class}>{s.label}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">📅 {b.date} · {b.time}</div>
                    <div className="text-sm text-gray-600 mb-3">📍 {b.address}</div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <div>
                        <span className="text-sm font-bold" style={{ color: "#32373c" }}>€{b.totalCharged}</span>
                        {b.hasReceipt && (
                          <span className="text-xs text-gray-400 ml-2">
                            ≈ €{b.effectiveCost.toFixed(0)} effective
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {b.status === "completed" && !b.hasReview && (
                          <button className="btn-green text-xs px-3 py-1.5">
                            <Star size={12} /> Leave review
                          </button>
                        )}
                        {b.hasReceipt && (
                          <Link href="/dashboard/receipts">
                            <button className="btn-outline text-xs px-3 py-1.5">
                              <Download size={12} /> Receipt
                            </button>
                          </Link>
                        )}
                        {b.status === "completed" && (
                          <Link href={`/providers/${b.providerId}`}>
                            <button className="btn-outline text-xs px-3 py-1.5">
                              <RotateCcw size={12} /> Rebook
                            </button>
                          </Link>
                        )}
                        {b.status === "confirmed" && (
                          <button className="text-xs text-red-400 hover:text-red-600 transition-colors px-2">Cancel</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "upcoming" && upcoming.length > 0 && (
        <div className="mt-6 p-4 rounded-xl text-sm" style={{ background: "#e8f5d6" }}>
          <span style={{ color: "#32373c" }} className="font-semibold">💡 Reminder:</span>
          <span className="text-gray-600 ml-1">Free cancellation up to 24 hours before your job starts.</span>
        </div>
      )}
    </div>
  );
}
