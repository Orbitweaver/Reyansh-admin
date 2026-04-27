import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import { incidents } from "@/data/mockData";

export default function PoliceCompletedCases() {
  const list = incidents.filter((i) => i.services.police === "completed");
  return (
    <div className="space-y-6" data-testid="police-completed">
      <PageHeader title="Completed Cases" subtitle="All resolved cases assigned to your unit." />
      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Case</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Closed at</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id} className="border-t border-slate-100 text-sm">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{i.id}</td>
                  <td className="px-5 py-3.5">{i.type}</td>
                  <td className="px-5 py-3.5 font-mono text-xs">{i.vehicle}</td>
                  <td className="px-5 py-3.5 text-slate-700">{i.location}</td>
                  <td className="px-5 py-3.5"><SeverityBadge severity={i.severity} /></td>
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
