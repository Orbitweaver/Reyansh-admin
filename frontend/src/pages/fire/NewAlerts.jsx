import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SeverityBadge from "@/components/shared/SeverityBadge";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { Flame, Check, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function FireNewAlerts() {
  const [list, setList] = useState(
    incidents
      .filter((i) => i.type === "Fire Detected" || i.severity === "critical")
      .filter((i) => ["pending", "acknowledged"].includes(i.services.fire) || i.services.fire === "dispatched"),
  );

  const accept = (id) => {
    setList(list.filter((x) => x.id !== id));
    toast.success(`Alert ${id} accepted — brigade dispatched`);
  };

  return (
    <div className="space-y-6" data-testid="fire-new-alerts">
      <PageHeader title="New Alerts" subtitle="Fire-flagged events awaiting your acknowledgment." />

      {list.length === 0 ? (
        <EmptyState title="No fire alerts" description="No active fire reports right now." icon={Flame} />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {list.map((i) => (
            <div key={i.id} className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)]" data-testid={`alert-${i.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">{i.id}</p>
                  <p className="font-display text-lg font-bold text-slate-900">{i.type}</p>
                </div>
                <SeverityBadge severity={i.severity} />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700"><MapPin size={14} className="text-slate-400" /><span>{i.location}</span></div>
                <div className="flex items-center gap-2 text-slate-500"><Clock size={14} /><span className="text-xs">{new Date(i.timestamp).toLocaleTimeString()}</span></div>
              </div>
              <p className="mt-3 rounded-lg bg-rose-50/60 p-3 text-xs text-rose-700">{i.description}</p>
              <Button className="mt-4 w-full bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" onClick={() => accept(i.id)} data-testid={`accept-${i.id}`}>
                <Check size={14} className="mr-1.5" /> Accept & dispatch
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
