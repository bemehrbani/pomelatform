import Link from "next/link";
import { providers } from "@/lib/mock-data";
import { Star, Clock, ChevronRight } from "lucide-react";

export default function ProvidersPage() {
  const categories = ["All", "Cleaning", "Handyman", "Laundry", "Moving"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#32373c" }}>Professionals in Helsinki</h1>
      <p className="text-gray-500 text-sm mb-6">{providers.length} verified professionals available</p>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(c => (
          <button key={c} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${c === "All" ? "text-white border-transparent" : "bg-white border-gray-200 text-gray-600 hover:border-green-500"}`}
            style={c === "All" ? { background: "#32373c" } : {}}>
            {c}
          </button>
        ))}
        <select className="ml-auto border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 outline-none bg-white">
          <option>Sort: Top rated</option>
          <option>Sort: Price (low to high)</option>
          <option>Sort: Price (high to low)</option>
          <option>Sort: Fastest response</option>
        </select>
      </div>

      {/* Provider list */}
      <div className="grid md:grid-cols-2 gap-4">
        {providers.map(p => (
          <Link href={`/providers/${p.id}`} key={p.id}>
            <div className="card p-5 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover" />
                  {p.availableThisWeek && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: "#76b82a" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="font-semibold text-sm" style={{ color: "#32373c" }}>{p.name}</span>
                      {p.isNew && <span className="ml-2 badge-blue">New</span>}
                    </div>
                    <span className="font-bold text-sm" style={{ color: "#76b82a" }}>€{p.hourlyRate}/hr</span>
                  </div>
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {p.category.map(c => (
                      <span key={c} className="badge-gray capitalize text-xs">{c}</span>
                    ))}
                  </div>
                  {p.ratingCount > 0 ? (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <Star size={11} fill="#f59e0b" color="#f59e0b" />
                      <span className="font-semibold">{p.ratingAvg}</span>
                      <span>({p.ratingCount} reviews)</span>
                      <span className="mx-1">·</span>
                      <Clock size={11} />
                      <span>~{p.responseTime}h response</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 mb-2">New to SabarKoti · No reviews yet</div>
                  )}
                  <p className="text-xs text-gray-500 line-clamp-2">{p.bio}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs font-medium ${p.availableThisWeek ? "text-green-600" : "text-gray-400"}`}>
                  {p.availableThisWeek ? "● Available this week" : "○ No availability this week"}
                </span>
                <span className="text-xs font-semibold flex items-center gap-1 group-hover:text-green-600 transition-colors" style={{ color: "#32373c" }}>
                  View profile <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
