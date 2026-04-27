import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { devices } from "@/data/mockData";
import { Battery, Signal } from "lucide-react";

export default function DevicesPage() {
  return (
    <div className="space-y-6" data-testid="devices-page">
      <PageHeader title="IoT Devices" subtitle="SafetyHub fleet — telemetry, firmware and connectivity." />

      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Device ID</th>
                <th className="px-5 py-3">Model</th>
                <th className="px-5 py-3">Firmware</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="px-5 py-3">Battery</th>
                <th className="px-5 py-3">Signal</th>
                <th className="px-5 py-3">Last ping</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{d.id}</td>
                  <td className="px-5 py-3.5 text-slate-700">{d.model}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600">v{d.firmware}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-700">{d.vehicle}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Battery size={14} className={d.battery > 20 ? "text-emerald-600" : "text-rose-600"} />
                      <span className="tabular-nums font-semibold text-slate-900">{d.battery}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((b) => (
                        <span
                          key={b}
                          className={`h-${b} w-1 rounded-sm ${b <= d.signal ? "bg-slate-700" : "bg-slate-200"}`}
                          style={{ height: `${b * 3 + 3}px` }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{d.lastPing}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
