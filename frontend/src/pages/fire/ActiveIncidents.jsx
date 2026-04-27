import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";
import MapView from "@/components/shared/MapView";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { toast } from "sonner";

const STAGES = ["dispatched", "on_route", "controlled", "completed"];
const LABELS = {
  dispatched: "Dispatch team",
  on_route: "On the way",
  controlled: "Fire controlled",
  completed: "Close case",
};

export default function FireActive() {
  const initial = incidents.filter((i) => i.type === "Fire Detected" || ["dispatched", "on_route", "on_scene"].includes(i.services.fire));
  const [items, setItems] = useState(initial.map((i) => ({ ...i, stage: "dispatched" })));
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const selected = items.find((i) => i.id === selectedId);

  const advance = (stage) => {
    if (!selected) return;
    if (stage === "completed") {
      setItems(items.filter((x) => x.id !== selected.id));
      setSelectedId(items.find((x) => x.id !== selected.id)?.id);
      toast.success(`Case ${selected.id} closed`);
      return;
    }
    setItems(items.map((x) => (x.id === selected.id ? { ...x, stage } : x)));
    toast.success(`${selected.id}: ${LABELS[stage]}`);
  };

  return (
    <div className="space-y-6" data-testid="fire-active">
      <PageHeader title="Active Incidents" subtitle="Brigade response in progress." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-3">
          {items.length === 0 && <SectionCard><p className="text-sm text-slate-500">No active incidents.</p></SectionCard>}
          {items.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              data-testid={`fire-incident-${c.id}`}
              className={`w-full rounded-xl border bg-white p-4 text-left transition ${selectedId === c.id ? "border-[hsl(var(--role-primary))] shadow-md" : "border-slate-100 hover:border-slate-200"}`}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">{c.id}</p>
                <SeverityBadge severity={c.severity} />
              </div>
              <p className="mt-1 font-semibold text-slate-900">{c.type}</p>
              <p className="text-xs text-slate-500">{c.location}</p>
              <div className="mt-2"><StatusBadge status={c.stage} /></div>
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
                    testId="fire-map"
                  />
                </div>
              </SectionCard>
              <SectionCard title={`${selected.id} · ${selected.type}`} subtitle={selected.location}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Unit</p>
                    <p className="mt-0.5 font-semibold text-slate-900">FB-7 · 4 firefighters</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Trucks</p>
                    <p className="mt-0.5 font-semibold text-slate-900">2 deployed</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">ETA</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.eta}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Stage</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{LABELS[selected.stage]}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {STAGES.map((s) => {
                    const active = selected.stage === s;
                    const danger = s === "completed";
                    return (
                      <Button
                        key={s}
                        size="sm"
                        variant={danger ? "destructive" : active ? "default" : "outline"}
                        className={!danger && active ? "bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" : ""}
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
            <SectionCard><p className="text-sm text-slate-500">Select an incident.</p></SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
