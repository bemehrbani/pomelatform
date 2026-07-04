import { earningsData } from "@/lib/mock-data";
import { TrendingUp, Calendar, Wallet } from "lucide-react";

export default function Earnings() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#32373c" }}>Earnings & Payouts</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">This week</div>
          <div className="text-2xl font-bold" style={{ color: "#76b82a" }}>€{earningsData.thisWeekNet}</div>
          <div className="text-xs text-gray-400 mt-1">Gross €{earningsData.thisWeekGross}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Last week</div>
          <div className="text-2xl font-bold" style={{ color: "#32373c" }}>€{earningsData.lastWeekNet}</div>
          <div className="text-xs text-gray-400 mt-1">Gross €{earningsData.lastWeekGross}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">All time</div>
          <div className="text-2xl font-bold" style={{ color: "#32373c" }}>€{earningsData.totalNetAllTime}</div>
          <div className="text-xs text-gray-400 mt-1">Gross €{earningsData.totalAllTime}</div>
        </div>
      </div>

      {/* Next payout */}
      <div className="card p-5 mb-6" style={{ borderLeft: "4px solid #76b82a" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Next payout</div>
            <div className="text-2xl font-bold" style={{ color: "#76b82a" }}>€{earningsData.nextPayoutAmount}</div>
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Calendar size={11} /> {earningsData.nextPayout}
            </div>
          </div>
          <div className="text-right">
            <div className="badge-green">Scheduled</div>
            <div className="text-xs text-gray-400 mt-1">{earningsData.payoutSchedule}</div>
          </div>
        </div>
      </div>

      {/* Commission breakdown */}
      <div className="card p-5 mb-6">
        <h2 className="font-semibold mb-3" style={{ color: "#32373c" }}>How your earnings are calculated</h2>
        <div className="space-y-2 text-sm">
          {[
            { label: "Gross booking value", example: "€75.00", note: "What customer pays" },
            { label: "Platform commission (20%)", example: "−€15.00", note: "SabarKoti fee", color: "#ef4444" },
            { label: "Your net earnings", example: "€60.00", note: "Paid to your bank account", color: "#76b82a" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <div className="font-medium" style={{ color: r.color || "#32373c" }}>{r.label}</div>
                <div className="text-xs text-gray-400">{r.note}</div>
              </div>
              <span className="font-bold" style={{ color: r.color || "#32373c" }}>{r.example}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout history */}
      <div className="card p-5">
        <h2 className="font-semibold mb-3" style={{ color: "#32373c" }}>Payout history</h2>
        <div className="space-y-3">
          {earningsData.recentPayouts.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#e8f5d6" }}>
                  <Wallet size={14} style={{ color: "#76b82a" }} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: "#32373c" }}>{p.date}</div>
                  <div className="text-xs text-gray-400">Bank transfer · Finnish IBAN</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm" style={{ color: "#32373c" }}>€{p.amount}</div>
                <span className="badge-green">Paid</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
