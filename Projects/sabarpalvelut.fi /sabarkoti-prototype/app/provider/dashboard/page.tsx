import Link from "next/link";
import { providerBookings, earningsData } from "@/lib/mock-data";
import { Star, Clock, Wallet, Calendar, ChevronRight, Check, X } from "lucide-react";

export default function ProviderDashboard() {
  const pending = providerBookings.filter(b => b.status === "pending");
  const upcoming = providerBookings.filter(b => b.status === "confirmed");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: "#76b82a" }}>AM</div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#32373c" }}>Good morning, Aino 👋</h1>
          <div className="flex items-center gap-2 text-sm">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="font-semibold">4.9</span>
            <span className="text-gray-400">(62 reviews)</span>
            <span className="text-gray-300">·</span>
            <span style={{ color: "#76b82a" }} className="font-medium text-xs">● Active & listed</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#76b82a" }}>€{earningsData.thisWeekNet}</div>
          <div className="text-xs text-gray-400 mt-1">This week (net)</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#32373c" }}>{pending.length}</div>
          <div className="text-xs text-gray-400 mt-1">Pending requests</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#32373c" }}>{upcoming.length}</div>
          <div className="text-xs text-gray-400 mt-1">Upcoming jobs</div>
        </div>
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>⏰ Pending requests</h2>
            <span className="badge-yellow">Respond within {pending[0].hoursLeft}h {pending[0].minutesLeft}m</span>
          </div>
          {pending.map(b => (
            <div key={b.id} className="rounded-xl p-4" style={{ background: "#fff8e1" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#32373c" }}>{b.category} · {b.duration}h</div>
                  <div className="text-xs text-gray-500">{b.date} · {b.time}</div>
                  <div className="text-xs text-gray-500">📍 {b.area} (address revealed after accept)</div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: "#76b82a" }}>€{b.netEarning}</div>
                  <div className="text-xs text-gray-400">you earn</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-green flex-1 justify-center text-sm py-2">
                  <Check size={14} /> Accept
                </button>
                <button className="btn-outline flex-1 justify-center text-sm py-2">
                  <X size={14} /> Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming jobs */}
      {upcoming.length > 0 && (
        <div className="card p-5 mb-4">
          <h2 className="font-semibold mb-3" style={{ color: "#32373c" }}>📅 Upcoming jobs</h2>
          {upcoming.map(b => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="font-medium text-sm" style={{ color: "#32373c" }}>{b.category} · {b.duration}h</div>
                <div className="text-xs text-gray-400">{b.date} · {b.time}</div>
                <div className="text-xs text-gray-400">Customer: {b.customerName}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm" style={{ color: "#76b82a" }}>€{b.netEarning}</div>
                <span className="badge-green">Confirmed</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Manage availability", icon: <Calendar size={16} />, href: "/provider/availability" },
          { label: "View all bookings", icon: <Clock size={16} />, href: "/provider/bookings" },
          { label: "Earnings & payouts", icon: <Wallet size={16} />, href: "/provider/earnings" },
          { label: "Edit profile", icon: <Star size={16} />, href: "#" },
        ].map(l => (
          <Link key={l.label} href={l.href}>
            <div className="card p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#32373c" }}>
                <span style={{ color: "#76b82a" }}>{l.icon}</span> {l.label}
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
