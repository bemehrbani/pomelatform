"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, FileText, LayoutDashboard, Clock, Wallet } from "lucide-react";

const navLink = (active: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  fontSize: 13,
  fontWeight: 500,
  color: active ? "#76b82a" : "#c9cdd2",
  textDecoration: "none",
  transition: "color 0.15s",
  padding: "4px 2px",
});

export default function Nav() {
  const path = usePathname();
  const isProvider = path.startsWith("/provider/") && !path.startsWith("/provider/apply");

  return (
    <>
      {/* Prototype banner */}
      <div style={{ background: "#111", borderBottom: "1px solid #222", textAlign: "center", padding: "7px 16px" }}>
        <span style={{ fontSize: 12, color: "#888" }}>
          🎨 UI Prototype &nbsp;—&nbsp; Switch view:&nbsp;
          <Link href="/" style={{ fontWeight: 700, fontSize: 12, color: isProvider ? "#666" : "#76b82a", textDecoration: "none", marginRight: 4 }}>Customer</Link>
          |
          <Link href="/provider/dashboard" style={{ fontWeight: 700, fontSize: 12, color: isProvider ? "#76b82a" : "#666", textDecoration: "none", marginLeft: 4 }}>Provider</Link>
        </span>
      </div>

      {/* Main nav */}
      <nav style={{ background: "#32373c", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.25)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ background: "#76b82a", width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Home size={15} color="white" />
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px" }}>sabarkoti</span>
          </Link>

          {!isProvider ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/providers" style={navLink(path.startsWith("/providers"))}>
                <Search size={14} /> Browse
              </Link>
              <Link href="/dashboard/bookings" style={navLink(path.startsWith("/dashboard/bookings"))}>
                <Calendar size={14} /> My Bookings
              </Link>
              <Link href="/dashboard/receipts" style={navLink(path.startsWith("/dashboard/receipts"))}>
                <FileText size={14} /> Tax Receipts
              </Link>
              <Link href="/provider/apply" style={{ background: "#76b82a", color: "white", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity 0.15s" }}>
                Join as Pro
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/provider/dashboard" style={navLink(path === "/provider/dashboard")}>
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <Link href="/provider/bookings" style={navLink(path.startsWith("/provider/bookings"))}>
                <Clock size={14} /> Bookings
              </Link>
              <Link href="/provider/availability" style={navLink(path.startsWith("/provider/availability"))}>
                <Calendar size={14} /> Availability
              </Link>
              <Link href="/provider/earnings" style={navLink(path.startsWith("/provider/earnings"))}>
                <Wallet size={14} /> Earnings
              </Link>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#76b82a", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                AM
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
