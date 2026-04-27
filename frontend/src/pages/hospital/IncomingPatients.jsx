import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import KPITile from "@/components/shared/KPITile";
import { Button } from "@/components/ui/button";
import { patients, beds } from "@/data/mockData";
import { Check, X, Repeat, BedDouble, HeartPulse, Clock } from "lucide-react";
import { toast } from "sonner";

export default function HospitalIncoming() {
  const [list, setList] = useState(patients.filter((p) => p.status === "incoming"));

  const accept = (id) => { setList(list.filter((x) => x.id !== id)); toast.success(`Patient ${id} accepted — bed assigned`); };
  const reject = (id) => { setList(list.filter((x) => x.id !== id)); toast.message(`Patient ${id} rejected`); };
  const redirect = (id) => { setList(list.filter((x) => x.id !== id)); toast.message(`Patient ${id} redirected to nearest hospital`); };

  return (
    <div className="space-y-6" data-testid="hospital-incoming">
      <PageHeader title="Incoming Patients" subtitle="Inbound patient queue with severity and ETA." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPITile icon={HeartPulse} label="Inbound" value={list.length} accent="rose" />
        <KPITile icon={BedDouble} label="ICU available" value={beds.icu.available} accent="role" />
        <KPITile icon={BedDouble} label="General available" value={beds.general.available} accent="emerald" />
        <KPITile icon={Clock} label="Avg waiting" value="14 m" accent="amber" />
      </div>

      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Incident</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Vitals</th>
                <th className="px-5 py-3">Needs</th>
                <th className="px-5 py-3">ETA</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-500">No incoming patients</td></tr>
              ) : list.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50" data-testid={`patient-${p.id}`}>
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">{p.id}</p>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs">{p.incident}</td>
                  <td className="px-5 py-3.5"><SeverityBadge severity={p.severity} /></td>
                  <td className="px-5 py-3.5 text-xs text-slate-700">{p.vitals}</td>
                  <td className="px-5 py-3.5 text-slate-700">{p.needs}</td>
                  <td className="px-5 py-3.5 font-semibold tabular-nums">{p.eta}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" className="bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" onClick={() => accept(p.id)} data-testid={`accept-${p.id}`}>
                        <Check size={13} className="mr-1" /> Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => redirect(p.id)} data-testid={`redirect-${p.id}`}>
                        <Repeat size={13} className="mr-1" /> Redirect
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => reject(p.id)} data-testid={`reject-${p.id}`}>
                        <X size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
