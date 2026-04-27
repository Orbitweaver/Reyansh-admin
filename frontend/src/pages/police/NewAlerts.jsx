import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { incidents } from "@/data/mockData";
import { Bell, Check, X, MapPin, Clock, Car } from "lucide-react";
import { toast } from "sonner";

export default function PoliceNewAlerts() {
  const [list, setList] = useState(incidents.filter((i) => i.services.police === "pending" || i.services.police === "acknowledged"));

  const accept = (id) => {
    setList(list.filter((x) => x.id !== id));
    toast.success(`Case ${id} accepted — dispatch acknowledged`);
  };
  const reject = (id) => {
    setList(list.filter((x) => x.id !== id));
    toast.message(`Case ${id} rejected — bumped to next station`);
  };

  return (
    <div className="space-y-6" data-testid="police-new-alerts">
      <PageHeader title="New Alerts" subtitle="Awaiting your acknowledgment." />

      {list.length === 0 ? (
        <EmptyState title="No new alerts" description="You're all caught up. New emergencies will appear here." icon={Bell} />
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
                <div className="flex items-center gap-2 text-slate-700">
                  <Car size={14} className="text-slate-400" />
                  <span className="font-mono text-xs">{i.vehicle}</span>
                  <span className="text-slate-400">·</span>
                  <span>{i.driver}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{i.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock size={14} />
                  <span className="text-xs">{new Date(i.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">{i.description}</p>

              <div className="mt-4 flex gap-2">
                <Button
                  className="flex-1 bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90"
                  onClick={() => accept(i.id)}
                  data-testid={`accept-${i.id}`}
                >
                  <Check size={14} className="mr-1.5" /> Accept
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => reject(i.id)} data-testid={`reject-${i.id}`}>
                  <X size={14} className="mr-1.5" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
