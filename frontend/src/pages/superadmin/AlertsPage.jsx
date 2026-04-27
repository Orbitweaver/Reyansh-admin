import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import { alerts } from "@/data/mockData";
import { Bell, AlertTriangle, Cpu, Activity } from "lucide-react";

const CATEGORY_ICON = {
  incident: AlertTriangle,
  device: Cpu,
  behavior: Activity,
  policy: Bell,
};

export default function AlertsPage() {
  return (
    <div className="space-y-6" data-testid="alerts-page">
      <PageHeader title="Alerts" subtitle="System-wide notifications across all services." />
      <SectionCard padded={false}>
        <ul className="divide-y divide-slate-100">
          {alerts.map((a) => {
            const Icon = CATEGORY_ICON[a.category] || Bell;
            return (
              <li key={a.id} className="flex items-start gap-4 px-5 py-4 transition hover:bg-slate-50/50">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                    <SeverityBadge severity={a.severity} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    <span className="font-mono">{a.id}</span> · {a.vehicle} · {a.time} · <span className="capitalize">{a.category}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </div>
  );
}
