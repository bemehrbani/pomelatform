"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, ChevronLeft, Upload } from "lucide-react";

const STEPS = ["Basic Info", "Services", "Business ID", "Bank Account", "Photo & Submit"];

export default function ProviderApply() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rate, setRate] = useState("25");
  const [categories, setCategories] = useState<string[]>([]);
  const [ytunnus, setYtunnus] = useState("");

  const allCategories = ["Cleaning", "Handyman", "Laundry & Ironing", "Moving", "Carpet Cleaning"];

  function toggleCat(c: string) {
    setCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 2000);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="card p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#e8f5d6" }}>
            <Check size={40} style={{ color: "#76b82a" }} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#32373c" }}>Application submitted!</h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Thank you! We&apos;ll review your application within 24 hours and send an email to <strong>{email || "your address"}</strong>.
          </p>
          <div className="rounded-xl p-4 text-sm text-left space-y-2 mb-6" style={{ background: "#f8f9fa" }}>
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{name || "Aino Mäkinen"}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Services</span><span className="font-medium">{categories.join(", ") || "Cleaning"}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Hourly rate</span><span className="font-medium">€{rate}/hr</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Y-tunnus</span><span className="font-medium">{ytunnus || "1234567-8"}</span></div>
          </div>
          <button onClick={() => router.push("/provider/dashboard")} className="btn-primary w-full justify-center">
            Go to provider dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#32373c" }}>Join as a professional</h1>
      <p className="text-gray-500 text-sm mb-8">Get bookings from verified customers across Helsinki. Y-tunnus required.</p>

      {/* Progress */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={i < step ? { background: "#76b82a", color: "white" } : i === step ? { background: "#32373c", color: "white" } : { background: "#e5e7eb", color: "#9ca3af" }}>
                {i < step ? <Check size={12} /> : i + 1}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 transition-all" style={{ background: i < step ? "#76b82a" : "#e5e7eb" }} />
            )}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 text-center mb-6">{STEPS[step]}</div>

      <div className="card p-6 mb-6">
        {/* Step 1: Basic info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>Tell us about yourself</h2>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Full name</label>
              <input className="input" placeholder="Aino Mäkinen" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Email address</label>
              <input className="input" type="email" placeholder="aino@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Phone number</label>
              <input className="input" placeholder="+358 40 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Password</label>
              <input className="input" type="password" placeholder="••••••••" />
            </div>
          </div>
        )}

        {/* Step 2: Services */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>What services do you offer?</h2>
            <div className="grid grid-cols-1 gap-2">
              {allCategories.map(c => (
                <button key={c} onClick={() => toggleCat(c)}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all"
                  style={categories.includes(c) ? { borderColor: "#76b82a", background: "#f0f7e6" } : { borderColor: "#e5e7eb" }}>
                  <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                    style={categories.includes(c) ? { background: "#76b82a", borderColor: "#76b82a" } : { borderColor: "#d1d5db" }}>
                    {categories.includes(c) && <Check size={12} color="white" />}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#32373c" }}>{c}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Your hourly rate (€)</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">€</span>
                <input className="input w-24" type="number" min="15" max="80" value={rate} onChange={e => setRate(e.target.value)} />
                <span className="text-sm text-gray-400">per hour (this is your take-home rate)</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Bio (max 400 chars)</label>
              <textarea className="input resize-none" rows={3} maxLength={400} placeholder="Describe your experience and services..." />
            </div>
          </div>
        )}

        {/* Step 3: Y-tunnus */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>Business verification</h2>
            <div className="rounded-xl p-4 text-sm" style={{ background: "#e8f5d6" }}>
              <strong style={{ color: "#32373c" }}>Why do I need a Y-tunnus?</strong>
              <p className="text-gray-600 mt-1">Customers can only claim kotitalousvähennys (household tax deduction) when the provider has a registered Finnish business ID. This is a legal requirement.</p>
              <a href="https://www.ytj.fi" target="_blank" className="text-xs mt-2 block font-semibold" style={{ color: "#76b82a" }}>Don&apos;t have one? Register a toiminimi for free at ytj.fi →</a>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Finnish Business ID (Y-tunnus)</label>
              <input className="input" placeholder="1234567-8" value={ytunnus} onChange={e => setYtunnus(e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">Format: 7 digits, dash, 1 check digit (e.g. 1234567-8)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">ID document</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition-colors">
                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                <div className="text-sm text-gray-500">Upload passport or Finnish ID card</div>
                <div className="text-xs text-gray-400 mt-1">JPG, PNG or PDF · Max 5MB</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Bank account */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>Set up payouts</h2>
            <p className="text-sm text-gray-500">Your earnings are paid weekly via Stripe. Enter your Finnish bank account details.</p>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Account holder name</label>
              <input className="input" placeholder="Aino Mäkinen" defaultValue={name} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">IBAN</label>
              <input className="input" placeholder="FI12 3456 7890 1234 56" />
            </div>
            <div className="rounded-xl p-4 text-sm" style={{ background: "#f8f9fa" }}>
              <div className="flex justify-between mb-1"><span className="text-gray-500">Platform commission</span><span className="font-semibold">20% of labor</span></div>
              <div className="flex justify-between mb-1"><span className="text-gray-500">Your take-home</span><span className="font-semibold">80% of labor + 100% materials</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Payout schedule</span><span className="font-semibold">Every Monday</span></div>
            </div>
          </div>
        )}

        {/* Step 5: Photo & Submit */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: "#32373c" }}>Profile photo</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 transition-colors">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center text-gray-300 text-3xl">👤</div>
              <div className="text-sm text-gray-500">Upload your profile photo</div>
              <div className="text-xs text-gray-400 mt-1">Min 400×400px · Max 5MB</div>
            </div>
            <div className="rounded-xl p-4 text-sm" style={{ background: "#f8f9fa" }}>
              <div className="font-semibold mb-2" style={{ color: "#32373c" }}>Review & confirm</div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>✓ Services: {categories.join(", ") || "Cleaning"}</div>
                <div>✓ Rate: €{rate}/hr</div>
                <div>✓ Y-tunnus: {ytunnus || "1234567-8"}</div>
                <div>✓ Bank account: IBAN provided</div>
              </div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-0.5" defaultChecked />
              <span className="text-xs text-gray-600">I confirm all information is accurate and I hold a valid Finnish Y-tunnus</span>
            </label>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} className="btn-outline">
            <ChevronLeft size={16} /> Back
          </button>
        ) : <div />}
        {step < 4 ? (
          <button onClick={() => setStep(s => s + 1)} className="btn-primary">
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn-green">
            {submitting ? "Submitting..." : "Submit application"} <Check size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
