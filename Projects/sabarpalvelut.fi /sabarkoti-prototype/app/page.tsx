"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, FileText, ChevronRight, Sparkles, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  const [hours, setHours] = useState(3);
  const rate = 25;
  const labor = hours * rate;
  const deduction = labor * 0.45;
  const effective = labor - deduction;

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #32373c 0%, #1a1f24 100%)" }} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-xs font-semibold px-4 py-2 rounded-full mb-6" style={{ color: "#76b82a" }}>
            <Sparkles size={12} /> Helsinki metro area · 120+ cleanings completed
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            Home services you can trust —<br />
            <span style={{ color: "#76b82a" }}>with tax deduction built in</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Book verified professionals for cleaning, handyman, laundry and more.
            Every booking includes an automatic kotitalousvähennys receipt — saving you up to 45% on labor costs.
          </p>
          <div className="bg-white rounded-2xl p-4 max-w-2xl mx-auto shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none" style={{ color: "#32373c" }}>
                <option>🧹 Cleaning</option>
                <option>🔧 Handyman</option>
                <option>👔 Laundry & Ironing</option>
                <option>📦 Moving</option>
                <option>🛋️ Carpet Cleaning</option>
              </select>
              <input className="input flex-1" placeholder="Postal code (e.g. 00100)" />
              <Link href="/providers">
                <button className="btn-primary whitespace-nowrap">
                  <Search size={16} /> Find Pros
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "120+", label: "Cleanings completed" },
              { val: "98%", label: "On-time rate" },
              { val: "95%", label: "Customer satisfaction" },
              { val: "45%", label: "Max tax deduction" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold" style={{ color: "#76b82a" }}>{s.val}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#32373c" }}>How SabarKoti works</h2>
          <p className="text-gray-500 text-center mb-10">Three steps to a cleaner home</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", icon: <Search size={22} />, title: "Find a professional", desc: "Browse verified providers in your area. Filter by service, read reviews, check availability." },
              { step: "2", icon: <Clock size={22} />, title: "Book & pay securely", desc: "Choose your time slot and pay by card. Provider confirms within 2 hours." },
              { step: "3", icon: <FileText size={22} />, title: "Get your tax receipt", desc: "After the job, receive an automatic kotitalousvähennys receipt. Save up to 45% on your taxes." },
            ].map(s => (
              <div key={s.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#e8f5d6", color: "#76b82a" }}>
                  {s.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#76b82a" }}>Step {s.step}</div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#32373c" }}>{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 px-4" style={{ background: "#32373c" }}>
        <div className="max-w-4xl mx-auto">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#76b82a" }}>Kotitalousvähennys Calculator</div>
              <h2 className="text-white text-3xl font-bold mb-4 leading-tight">See how much you&apos;ll actually pay</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Finland&apos;s household tax deduction lets you deduct 45% of labor costs directly from your taxes.
                Every SabarKoti booking includes an automatic receipt for your annual tax return.
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-2xl p-6">
              <label className="block text-sm font-semibold mb-2" style={{ color: "#32373c" }}>Service hours: {hours}h</label>
              <input type="range" min={1} max={8} value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full mb-4" style={{ accentColor: "#76b82a" }} />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor cost ({hours}h × €{rate}/hr)</span>
                  <span className="font-semibold">€{labor.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "#76b82a" }}>
                  <span className="font-medium">Tax deduction (45%)</span>
                  <span className="font-bold">−€{deduction.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-base" style={{ color: "#32373c" }}>
                  <span>You effectively pay</span>
                  <span style={{ color: "#76b82a" }}>€{effective.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/providers">
                <button className="btn-primary w-full justify-center mt-4">Book now and save</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#32373c" }}>Services available</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "🧹", name: "Home Cleaning", desc: "Regular & deep cleaning" },
              { emoji: "🔧", name: "Handyman", desc: "Repairs & assembly" },
              { emoji: "👔", name: "Laundry & Ironing", desc: "Wash, fold & press" },
              { emoji: "📦", name: "Moving Help", desc: "Packing & transport" },
              { emoji: "🛋️", name: "Carpet Cleaning", desc: "Deep wash & refresh" },
              { emoji: "🏠", name: "More coming soon", desc: "Floor waxing, gardening..." },
            ].map(s => (
              <Link href="/providers" key={s.name}>
                <div className="card p-5 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <div className="font-semibold text-sm mb-1 transition-colors group-hover:text-green-600" style={{ color: "#32373c" }}>{s.name}</div>
                  <div className="text-xs text-gray-400">{s.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-16 px-4" style={{ background: "#f0f7e6" }}>
        <div className="max-w-3xl mx-auto text-center">
          <TrendingUp size={36} style={{ color: "#76b82a" }} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#32373c" }}>Are you a home service professional?</h2>
          <p className="text-gray-600 mb-6">Join SabarKoti to reach more customers across Helsinki. You need a Finnish Y-tunnus — we handle payments, tax receipts, and reviews for you.</p>
          <Link href="/provider/apply">
            <button className="btn-primary">Apply to join <ChevronRight size={16} /></button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ background: "#32373c" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white font-bold text-lg">sabarkoti</div>
          <div className="text-gray-400 text-xs">© 2026 SABARKOTI Service Oy · Mäntytie 21, Helsinki · +358 41 722 39 46</div>
          <div className="flex gap-4 text-xs text-gray-400">
            <span className="cursor-pointer hover:text-white">Privacy</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
            <span className="cursor-pointer hover:text-white">Support</span>
            <a href="/docs" target="_blank" style={{ color: "#76b82a", textDecoration: "none", fontWeight: 600 }} className="hover:opacity-80">Product Docs</a>
            <a href="/business" target="_blank" style={{ color: "#76b82a", textDecoration: "none", fontWeight: 600 }} className="hover:opacity-80">Business Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
