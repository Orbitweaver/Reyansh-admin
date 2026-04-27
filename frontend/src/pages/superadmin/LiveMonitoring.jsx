import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import MapView from "@/components/shared/MapView";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { incidents, vehicles } from "@/data/mockData";
import { Filter } from "lucide-react";

export default function LiveMonitoring() {
  const [layer, setLayer] = useState("incidents"); // incidents | vehicles

  const markers =
    layer === "incidents"
      ? incidents.map((i) => ({ coords: i.coords, title: i.id, subtitle: `${i.type} · ${i.location}`, severity: i.severity }))
      : vehicles.filter((v) => v.coords).map((v) => ({
          coords: v.coords,
          title: v.plate,
          subtitle: `${v.model} · ${v.owner}`,
          severity: v.status === "alert" ? "critical" : v.status === "active" ? "low" : "medium",
        }));

  return (
    <div className="space-y-6" data-testid="live-monitoring">
      <PageHeader
        title="Live Monitoring"
        subtitle="Realtime spatial view of vehicles and active incidents."
        actions={
          <div className="flex gap-2">
            <Button
              variant={layer === "incidents" ? "default" : "outline"}
              onClick={() => setLayer("incidents")}
              data-testid="layer-incidents"
              className={layer === "incidents" ? "bg-slate-900 text-white" : ""}
            >
              Incidents
            </Button>
            <Button
              variant={layer === "vehicles" ? "default" : "outline"}
              onClick={() => setLayer("vehicles")}
              data-testid="layer-vehicles"
              className={layer === "vehicles" ? "bg-slate-900 text-white" : ""}
            >
              Vehicles
            </Button>
            <Button variant="outline" data-testid="filter-btn">
              <Filter size={14} className="mr-1.5" /> Filter
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard padded={false}>
            <div className="p-3">
              <MapView markers={markers} height={560} testId="live-map" />
            </div>
          </SectionCard>
        </div>
        <SectionCard title={layer === "incidents" ? "Active Incidents" : "Connected Vehicles"} padded={false}>
          <ul className="divide-y divide-slate-100">
            {(layer === "incidents" ? incidents : vehicles).slice(0, 8).map((row) => (
              <li key={row.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs font-semibold text-slate-900">{row.id}</p>
                  {layer === "incidents" ? (
                    <SeverityBadge severity={row.severity} />
                  ) : (
                    <StatusBadge status={row.status} />
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-700">
                  {layer === "incidents" ? `${row.type} · ${row.location}` : `${row.plate} · ${row.model}`}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {layer === "incidents" ? `Driver ${row.driver}` : `Owner ${row.owner}`}
                </p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
