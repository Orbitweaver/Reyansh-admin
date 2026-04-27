import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/mockData";
import { Plus } from "lucide-react";

export default function VehiclesPage() {
  return (
    <div className="space-y-6" data-testid="vehicles-page">
      <PageHeader
        title="Vehicles"
        subtitle="All vehicles connected via IoT SafetyHub devices."
        actions={
          <Button className="bg-slate-900 text-white hover:bg-slate-800" data-testid="add-vehicle-btn">
            <Plus size={14} className="mr-1.5" /> Onboard vehicle
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((v) => (
          <div
            key={v.id}
            data-testid={`vehicle-${v.id}`}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)] transition hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">{v.id}</p>
                <p className="font-display text-lg font-bold text-slate-900">{v.plate}</p>
                <p className="text-sm text-slate-600">{v.model}</p>
              </div>
              <StatusBadge status={v.status} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">Owner</p>
                <p className="mt-0.5 font-semibold text-slate-900">{v.owner}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">Device</p>
                <p className="mt-0.5 font-mono font-semibold text-slate-900">{v.device}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Health</span>
                  <span className="font-semibold tabular-nums text-slate-900">{v.health}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full ${v.health >= 80 ? "bg-emerald-500" : v.health >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                    style={{ width: `${v.health}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">Last trip · {v.lastTrip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
