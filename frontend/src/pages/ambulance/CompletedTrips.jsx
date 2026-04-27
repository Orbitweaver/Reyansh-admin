import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import { incidents } from "@/data/mockData";

export default function AmbulanceCompleted() {
  const list = incidents.filter((i) => i.services.ambulance === "completed");
  return (
    <div className="space-y-6" data-testid="ambulance-completed">
      <PageHeader title="Completed Trips" subtitle="Closed patient transports." />
      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Trip</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Pickup</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Paramedic</th>
                <th className="px-5 py-3">Closed at</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id} className="border-t border-slate-100 text-sm">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{i.id}</td>
                  <td className="px-5 py-3.5">{i.driver}</td>
                  <td className="px-5 py-3.5 text-slate-700">{i.location}</td>
                  <td className="px-5 py-3.5"><SeverityBadge severity={i.severity} /></td>
                  <td className="px-5 py-3.5">{i.paramedic}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{new Date(i.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
