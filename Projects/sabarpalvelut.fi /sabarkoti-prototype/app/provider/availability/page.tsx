"use client";
import { useState } from "react";
import { availabilityData, timeSlots } from "@/lib/mock-data";
import { Info } from "lucide-react";

type SlotState = "available" | "booked" | "unavailable";

const slotStyle: Record<SlotState, { bg: string; text: string; label: string }> = {
  available:   { bg: "#e8f5d6", text: "#3d6e10", label: "Free" },
  booked:      { bg: "#dbeafe", text: "#1d4ed8", label: "Booked" },
  unavailable: { bg: "#f3f4f6", text: "#9ca3af", label: "Blocked" },
};

export default function Availability() {
  const days = Object.keys(availabilityData);
  const [slots, setSlots] = useState<Record<string, SlotState[]>>({ ...availabilityData });

  function toggle(day: string, idx: number) {
    setSlots(prev => {
      const current = [...prev[day]];
      if (current[idx] === "booked") return prev; // can't toggle booked
      current[idx] = current[idx] === "available" ? "unavailable" : "available";
      return { ...prev, [day]: current };
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: "#32373c" }}>Availability Calendar</h1>
      <p className="text-gray-500 text-sm mb-6">Click a slot to toggle it available or blocked. Customers can only book available slots.</p>

      {/* Legend */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {Object.entries(slotStyle).map(([state, style]) => (
          <div key={state} className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded" style={{ background: style.bg }} />
            <span style={{ color: "#32373c" }} className="font-medium">{style.label}</span>
            <span className="text-gray-400 capitalize">({state === "unavailable" ? "blocked by you" : state})</span>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#32373c" }}>
                <th className="text-left text-white text-xs font-medium px-4 py-3 w-28">Time slot</th>
                {days.map(d => (
                  <th key={d} className="text-center text-white text-xs font-medium px-2 py-3">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, si) => (
                <tr key={slot} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-xs text-gray-500 font-medium whitespace-nowrap">{slot}</td>
                  {days.map((day) => {
                    const state = slots[day]?.[si] ?? "unavailable";
                    const style = slotStyle[state];
                    return (
                      <td key={day} className="px-2 py-2 text-center">
                        <button
                          onClick={() => toggle(day, si)}
                          disabled={state === "booked"}
                          className="w-full py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                          style={{ background: style.bg, color: style.text, cursor: state === "booked" ? "default" : "pointer" }}>
                          {state === "booked" ? "🔒" : state === "available" ? "✓" : "–"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
        <Info size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#76b82a" }} />
        Changes are saved automatically. Customers see your available slots in real-time.
        Booked slots (🔒) are locked and cannot be changed.
      </div>

      <button className="btn-outline mt-4 text-sm">Copy this week → next week</button>
    </div>
  );
}
