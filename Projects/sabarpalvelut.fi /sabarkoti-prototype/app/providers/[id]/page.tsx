import Link from "next/link";
import { providers, reviews } from "@/lib/mock-data";
import { Star, Clock, ShieldCheck, ChevronLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return providers.map(p => ({ id: p.id }));
}

export default async function ProviderProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find(p => p.id === id);
  if (!provider) notFound();

  const providerReviews = reviews.filter(r => r.providerId === id);
  const weekDays = ["Mon 24 Feb", "Tue 25 Feb", "Wed 26 Feb", "Thu 27 Feb", "Fri 28 Feb", "Sat 1 Mar"];
  const slots = ["09:00", "11:00", "13:00", "15:00"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/providers" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ChevronLeft size={16} /> Back to results
      </Link>

      <div className="md:flex gap-8">
        {/* Left column */}
        <div className="md:w-2/3">
          {/* Header */}
          <div className="card p-6 mb-4">
            <div className="flex gap-5">
              <img src={provider.avatar} alt={provider.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold mb-1" style={{ color: "#32373c" }}>{provider.name}</h1>
                    <div className="flex gap-2 mb-2">
                      {provider.category.map(c => (
                        <span key={c} className="badge-green capitalize">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: "#76b82a" }}>€{provider.hourlyRate}</div>
                    <div className="text-xs text-gray-400">per hour</div>
                  </div>
                </div>
                {provider.ratingCount > 0 ? (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={14} fill={i <= Math.round(provider.ratingAvg) ? "#f59e0b" : "#e5e7eb"} color={i <= Math.round(provider.ratingAvg) ? "#f59e0b" : "#e5e7eb"} />
                      ))}
                    </div>
                    <span className="font-semibold">{provider.ratingAvg}</span>
                    <span className="text-gray-400">({provider.ratingCount} reviews)</span>
                    <span className="text-gray-300">·</span>
                    <Clock size={13} className="text-gray-400" />
                    <span className="text-gray-400">~{provider.responseTime}h response</span>
                  </div>
                ) : (
                  <div className="badge-blue">New to SabarKoti</div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">{provider.bio}</p>
            </div>

            <div className="mt-4 flex gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><ShieldCheck size={13} style={{ color: "#76b82a" }} /> Y-tunnus verified</div>
              <div className="flex items-center gap-1"><ShieldCheck size={13} style={{ color: "#76b82a" }} /> ID verified</div>
              <div className="flex items-center gap-1"><ShieldCheck size={13} style={{ color: "#76b82a" }} /> Stripe payouts enabled</div>
            </div>
          </div>

          {/* Availability */}
          <div className="card p-6 mb-4">
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "#32373c" }}>
              <Calendar size={16} /> Availability — next 7 days
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left text-gray-400 font-medium pb-2">Time</th>
                    {weekDays.map(d => (
                      <th key={d} className="text-center text-gray-400 font-medium pb-2 px-1">{d.split(" ").slice(0,2).join(" ")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot, si) => (
                    <tr key={slot} className="border-t border-gray-50">
                      <td className="py-2 pr-3 text-gray-500">{slot}</td>
                      {weekDays.map((d, di) => {
                        const avail = (si + di) % 3 !== 0;
                        return (
                          <td key={d} className="py-2 px-1 text-center">
                            <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${avail ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-300"}`}>
                              {avail ? "✓" : "–"}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews */}
          <div className="card p-6">
            <h2 className="font-semibold text-base mb-4" style={{ color: "#32373c" }}>Reviews ({providerReviews.length})</h2>
            {providerReviews.length === 0 ? (
              <p className="text-gray-400 text-sm">No reviews yet — be the first to book!</p>
            ) : (
              <div className="space-y-4">
                {providerReviews.map((r, i) => (
                  <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#76b82a" }}>
                        {r.reviewer[0]}
                      </div>
                      <span className="text-sm font-medium">{r.reviewer}</span>
                      <div className="flex gap-0.5 ml-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= r.rating ? "#f59e0b" : "#e5e7eb"} color={i <= r.rating ? "#f59e0b" : "#e5e7eb"} />)}
                      </div>
                      <span className="text-xs text-gray-400 ml-auto">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed ml-9">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column — sticky booking card */}
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="card p-5 sticky top-24">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold" style={{ color: "#76b82a" }}>€{provider.hourlyRate}<span className="text-base font-normal text-gray-400">/hr</span></div>
              <div className="text-xs text-gray-400 mt-1">Effective ~€{(provider.hourlyRate * 0.55).toFixed(0)}/hr after tax deduction</div>
            </div>

            <div className="text-xs text-gray-500 mb-3 p-3 rounded-lg" style={{ background: "#f0f7e6" }}>
              <span style={{ color: "#76b82a" }} className="font-semibold">💡 Tax tip:</span> 45% of your labor cost is deductible via kotitalousvähennys. Receipt generated automatically.
            </div>

            <Link href={`/providers/${id}/book`}>
              <button className="btn-primary w-full justify-center mb-2">Book now</button>
            </Link>

            {!provider.availableThisWeek && (
              <p className="text-xs text-center text-gray-400 mt-2">⚠️ Limited availability this week</p>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1">
              <div className="flex justify-between"><span>Platform fee</span><span>Included in rate</span></div>
              <div className="flex justify-between"><span>Free cancellation</span><span>Up to 24h before</span></div>
              <div className="flex justify-between"><span>Tax receipt</span><span>Auto-generated ✓</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
