import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { beds } from "@/data/mockData";
import { Bed, BedDouble, ShieldPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SECTIONS = [
  { key: "icu", label: "ICU Beds", icon: ShieldPlus, color: "rose" },
  { key: "general", label: "General Beds", icon: BedDouble, color: "blue" },
  { key: "emergency", label: "Emergency", icon: Bed, color: "amber" },
];

export default function HospitalBeds() {
  return (
    <div className="space-y-6" data-testid="hospital-beds">
      <PageHeader title="Bed Management" subtitle="Real-time occupancy across wards." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {SECTIONS.map((s) => {
          const data = beds[s.key];
          const pct = Math.round((data.occupied / data.total) * 100);
          return (
            <div key={s.key} className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)]" data-testid={`bed-${s.key}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${s.color}-50 text-${s.color}-700`}>
                    <s.icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-slate-900">{s.label}</p>
                    <p className="text-xs text-slate-500">{data.total} beds</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold tabular-nums text-slate-900">{data.available}</p>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400">Available</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Occupancy</span>
                  <span className="font-semibold text-slate-900">{pct}%</span>
                </div>
                <Progress value={pct} className="mt-1.5 h-2" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <p className="text-slate-500">Occupied</p>
                  <p className="mt-0.5 font-semibold text-slate-900">{data.occupied}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2.5">
                  <p className="text-emerald-700">Free</p>
                  <p className="mt-0.5 font-semibold text-emerald-900">{data.available}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SectionCard title="Ward Layout" subtitle="ICU floor map">
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
          {Array.from({ length: 24 }).map((_, i) => {
            const occupied = i < 16;
            return (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-lg border text-xs font-semibold ${
                  occupied ? "border-rose-100 bg-rose-50 text-rose-700" : "border-emerald-100 bg-emerald-50 text-emerald-700"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-4 text-xs">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-rose-100"></span>Occupied</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-emerald-100"></span>Available</span>
        </div>
      </SectionCard>
    </div>
  );
}
