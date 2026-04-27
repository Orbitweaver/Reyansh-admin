import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import StatusBadge from "@/components/shared/StatusBadge";
import SeverityBadge from "@/components/shared/SeverityBadge";
import MapView from "@/components/shared/MapView";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { toast } from "sonner";
import { HeartPulse } from "lucide-react";

const STAGES = ["start", "pickup", "hospital"];
const LABELS = { start: "Start trip", pickup: "Pick patient", hospital: "Reach hospital" };

export default function AmbulanceActive() {
  const initial = incidents.filter((i) => ["on_route", "on_scene", "dispatched"].includes(i.services.ambulance));
  const [trips, setTrips] = useState(initial.map((t) => ({ ...t, stage: "start" })));
  const [selectedId, setSelectedId] = useState(trips[0]?.id);
  const selected = trips.find((t) => t.id === selectedId);

  const advance = (stage) => {
    if (!selected) return;
    setTrips(trips.map((t) => (t.id === selected.id ? { ...t, stage } : t)));
    toast.success(`${selected.id}: ${LABELS[stage]} marked`);
    if (stage === "hospital") {
      setTrips(trips.filter((t) => t.id !== selected.id));
      setSelectedId(trips[0]?.id);
    }
  };

  return (
    <div className="space-y-6" data-testid="ambulance-active">
      <PageHeader title="Active Trips" subtitle="Live patient transports your crew is handling." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-3">
          {trips.length === 0 && <SectionCard><p className="text-sm text-slate-500">No active trips.</p></SectionCard>}
          {trips.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              data-testid={`trip-${t.id}`}
              className={`w-full rounded-xl border bg-white p-4 text-left transition ${selectedId === t.id ? "border-[hsl(var(--role-primary))] shadow-md" : "border-slate-100 hover:border-slate-200"}`}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">{t.id}</p>
                <SeverityBadge severity={t.severity} />
              </div>
              <p className="mt-1 font-semibold text-slate-900">{t.type}</p>
              <p className="text-xs text-slate-500">{t.location}</p>
              <div className="mt-2"><StatusBadge status={t.stage === "start" ? "dispatched" : t.stage === "pickup" ? "on_scene" : "completed"} /></div>
            </button>
          ))}
        </div>

        <div className="space-y-4 xl:col-span-2">
          {selected ? (
            <>
              <SectionCard padded={false}>
                <div className="p-3">
                  <MapView
                    markers={[{ coords: selected.coords, title: selected.id, subtitle: selected.location, severity: selected.severity }]}
                    center={selected.coords}
                    zoom={14}
                    height={340}
                    testId="ambulance-map"
                  />
                </div>
              </SectionCard>

              <SectionCard title="Patient & route" subtitle={selected.location}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Patient</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.driver}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Paramedic</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.paramedic}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Vitals</p>
                    <p className="mt-0.5 flex items-center gap-1 font-semibold text-slate-900"><HeartPulse size={13} className="text-rose-500" /> BP 110/72 · HR 98</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">ETA</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.eta}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {STAGES.map((s) => {
                    const active = selected.stage === s;
                    return (
                      <Button
                        key={s}
                        size="sm"
                        variant={active ? "default" : "outline"}
                        className={active ? "bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" : ""}
                        onClick={() => advance(s)}
                        data-testid={`stage-${s}`}
                      >
                        {LABELS[s]}
                      </Button>
                    );
                  })}
                </div>
              </SectionCard>
            </>
          ) : (
            <SectionCard><p className="text-sm text-slate-500">Select a trip from the list.</p></SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
