import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { trips } from "@/data/mockData";

export default function TripsPage() {
  return (
    <div className="space-y-6" data-testid="trips-page">
      <PageHeader title="Trips" subtitle="Driving sessions, scoring and harsh-event detection." />
      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Trip</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Distance</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Harsh events</th>
                <th className="px-5 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{t.id}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-700">{t.vehicle}</td>
                  <td className="px-5 py-3.5 text-slate-700">{t.from} → {t.to}</td>
                  <td className="px-5 py-3.5 tabular-nums">{t.distance}</td>
                  <td className="px-5 py-3.5 tabular-nums">{t.duration}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${t.harshEvents > 2 ? "bg-rose-50 text-rose-700" : t.harshEvents > 0 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {t.harshEvents}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-semibold text-slate-900">{t.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
