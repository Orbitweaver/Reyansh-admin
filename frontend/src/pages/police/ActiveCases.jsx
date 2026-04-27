import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";
import MapView from "@/components/shared/MapView";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { toast } from "sonner";

const STAGES = ["dispatched", "on_route", "on_scene", "investigating", "completed"];
const STAGE_LABEL = {
  dispatched: "Dispatched",
  on_route: "On the way",
  on_scene: "Reached",
  investigating: "Investigation started",
  completed: "Closed",
};

export default function PoliceActiveCases() {
  const initial = incidents.filter((i) => ["dispatched", "on_route", "on_scene"].includes(i.services.police));
  const [cases, setCases] = useState(
    initial.map((i) => ({ ...i, stage: i.services.police === "on_scene" ? "on_scene" : i.services.police })),
  );
  const [selectedId, setSelectedId] = useState(initial[0]?.id);
  const selected = cases.find((c) => c.id === selectedId);

  const advance = (stage) => {
    if (!selected) return;
    setCases(cases.map((c) => (c.id === selected.id ? { ...c, stage } : c)));
    toast.success(`Case ${selected.id}: ${STAGE_LABEL[stage]}`);
  };

  const close = () => {
    if (!selected) return;
    setCases(cases.filter((c) => c.id !== selected.id));
    setSelectedId(cases[0]?.id);
    toast.success(`Case ${selected.id} closed`);
  };

  return (
    <div className="space-y-6" data-testid="police-active-cases">
      <PageHeader title="Active Cases" subtitle="Cases your unit is currently handling." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-1">
          {cases.length === 0 && (
            <SectionCard><p className="text-sm text-slate-500">No active cases.</p></SectionCard>
          )}
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              data-testid={`case-${c.id}`}
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
                    testId="police-case-map"
                  />
                </div>
              </SectionCard>

              <SectionCard title={`${selected.id} · ${selected.type}`} subtitle={selected.location}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Vehicle</p>
                    <p className="mt-0.5 font-mono font-semibold text-slate-900">{selected.vehicle}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Driver</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.driver}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">ETA</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{selected.eta}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-slate-500">Stage</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{STAGE_LABEL[selected.stage]}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {STAGES.map((s) => {
                    if (s === "completed") return null;
                    const active = selected.stage === s;
                    return (
                      <Button
                        key={s}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        className={active ? "bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" : ""}
                        onClick={() => advance(s)}
                        data-testid={`stage-${s}`}
                      >
                        {STAGE_LABEL[s]}
                      </Button>
                    );
                  })}
                  <Button size="sm" variant="destructive" onClick={close} data-testid="close-case">
                    Close case
                  </Button>
                </div>
              </SectionCard>
            </>
          ) : (
            <SectionCard><p className="text-sm text-slate-500">Select a case from the list.</p></SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
