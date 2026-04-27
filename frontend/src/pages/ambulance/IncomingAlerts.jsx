import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SeverityBadge from "@/components/shared/SeverityBadge";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { Bell, Check, X, MapPin, Activity, Clock } from "lucide-react";
import { toast } from "sonner";

export default function AmbulanceIncoming() {
  const [list, setList] = useState(incidents.filter((i) => ["pending", "acknowledged", "dispatched"].includes(i.services.ambulance)));

  const accept = (id) => { setList(list.filter((x) => x.id !== id)); toast.success(`Trip ${id} accepted — en route`); };
  const reject = (id) => { setList(list.filter((x) => x.id !== id)); toast.message(`Trip ${id} declined — passing to next unit`); };

  return (
    <div className="space-y-6" data-testid="ambulance-incoming">
      <PageHeader title="Incoming Alerts" subtitle="Patient transport requests awaiting acceptance." />

      {list.length === 0 ? (
        <EmptyState title="No incoming alerts" description="Stay ready — new dispatches will surface here." icon={Bell} />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {list.map((i) => {
            const distance = (Math.random() * 8 + 2).toFixed(1);
            return (
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
                  <div className="flex items-center gap-2 text-slate-700"><Activity size={14} className="text-slate-400" /><span className="font-semibold">{distance} km</span> away</div>
                  <div className="flex items-center gap-2 text-slate-500"><Clock size={14} /><span className="text-xs">{new Date(i.timestamp).toLocaleTimeString()}</span></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" onClick={() => accept(i.id)} data-testid={`accept-${i.id}`}>
                    <Check size={14} className="mr-1.5" /> Accept
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => reject(i.id)} data-testid={`reject-${i.id}`}>
                    <X size={14} className="mr-1.5" /> Reject
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
