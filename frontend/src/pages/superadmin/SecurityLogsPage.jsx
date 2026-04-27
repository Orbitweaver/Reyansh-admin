import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { securityLogs } from "@/data/mockData";
import { Shield } from "lucide-react";

export default function SecurityLogsPage() {
  return (
    <div className="space-y-6" data-testid="security-logs">
      <PageHeader title="Security Logs" subtitle="Audit trail across all admins, services and overrides." />

      <SectionCard padded={false}>
        <ul className="divide-y divide-slate-100">
          {securityLogs.map((l) => (
            <li key={l.id} className="flex items-start gap-4 px-5 py-3.5">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Shield size={15} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{l.action}</p>
                  <p className="text-[11px] text-slate-400">{l.time}</p>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  <span className="font-mono">{l.id}</span> · {l.actor} · IP {l.ip}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
