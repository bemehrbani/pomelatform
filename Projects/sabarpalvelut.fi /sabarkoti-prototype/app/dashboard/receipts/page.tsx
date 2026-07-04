import { Download, Info } from "lucide-react";

const receipts = [
  { id: "r1", date: "5 Feb 2026", provider: "Liisa Korhonen", providerYTunnus: "2345678-9", labor: 92, deductible: 41.4, total: 92, service: "Cleaning + Laundry" },
  { id: "r2", date: "20 Jan 2026", provider: "Mikko Leinonen", providerYTunnus: "3456789-0", labor: 56, deductible: 25.2, total: 56, service: "Handyman" },
  { id: "r3", date: "12 Dec 2025", provider: "Aino Mäkinen", providerYTunnus: "1234567-8", labor: 75, deductible: 33.75, total: 75, service: "Home Cleaning" },
];

const totalDeductible = receipts.reduce((sum, r) => sum + r.deductible, 0);

export default function Receipts() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "#32373c" }}>Tax Receipts</h1>
      <p className="text-gray-500 text-sm mb-6">Download your kotitalousvähennys receipts for your annual tax return at vero.fi</p>

      {/* Summary */}
      <div className="card p-5 mb-6" style={{ borderLeft: "4px solid #76b82a" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">2026 Total deductible amount</div>
            <div className="text-3xl font-bold" style={{ color: "#76b82a" }}>€{totalDeductible.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Include this in your annual tax return at <strong>vero.fi</strong> under &quot;kotitalousvähennys&quot;</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">{receipts.length} receipts</div>
            <div className="badge-green mt-1">All auto-generated</div>
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="rounded-xl p-4 mb-6 flex gap-3 text-sm" style={{ background: "#f0f7e6" }}>
        <Info size={16} style={{ color: "#76b82a" }} className="flex-shrink-0 mt-0.5" />
        <div className="text-gray-600">
          <strong style={{ color: "#32373c" }}>How to claim:</strong> Log in to vero.fi → Tax return → Deductions → Kotitalousvähennys.
          Enter the total deductible amount and each provider&apos;s Y-tunnus. Your receipts below contain all the required information.
        </div>
      </div>

      {/* Receipts list */}
      <div className="space-y-3">
        {receipts.map(r => (
          <div key={r.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-sm" style={{ color: "#32373c" }}>{r.provider}</div>
                <div className="text-xs text-gray-400">{r.service} · {r.date}</div>
                <div className="text-xs text-gray-400 mt-0.5">Y-tunnus: {r.providerYTunnus}</div>
              </div>
              <button className="btn-outline text-xs px-3 py-1.5">
                <Download size={12} /> Download PDF
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg p-2.5" style={{ background: "#f8f9fa" }}>
                <div className="text-gray-400 mb-1">Labor cost</div>
                <div className="font-bold" style={{ color: "#32373c" }}>€{r.labor.toFixed(2)}</div>
              </div>
              <div className="rounded-lg p-2.5" style={{ background: "#e8f5d6" }}>
                <div className="text-gray-500 mb-1">Deductible (45%)</div>
                <div className="font-bold" style={{ color: "#76b82a" }}>€{r.deductible.toFixed(2)}</div>
              </div>
              <div className="rounded-lg p-2.5" style={{ background: "#f8f9fa" }}>
                <div className="text-gray-400 mb-1">Total paid</div>
                <div className="font-bold" style={{ color: "#32373c" }}>€{r.total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
