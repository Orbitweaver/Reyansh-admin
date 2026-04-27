import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { patients } from "@/data/mockData";
import { UserCheck, Stethoscope } from "lucide-react";
import { toast } from "sonner";

const DOCTORS = ["Dr. Mehta", "Dr. Verma", "Dr. Patel", "Dr. Iyer", "Dr. Khan"];

export default function HospitalActiveCases() {
  const [open, setOpen] = useState(null);
  const [doctor, setDoctor] = useState(DOCTORS[0]);
  const [bed, setBed] = useState("");

  const list = patients.filter((p) => p.severity !== "low" && p.status === "incoming").concat(
    [
      { id: "PAT-3297", name: "Vikram Joshi", incident: "INC-2030", severity: "medium", vitals: "BP 120/80 · HR 86", needs: "Observation", eta: "Admitted", status: "active", doctor: "Dr. Mehta" },
      { id: "PAT-3296", name: "Aisha Khan", incident: "INC-2029", severity: "high", vitals: "BP 100/65 · HR 110", needs: "Surgery", eta: "Admitted", status: "active", doctor: "Dr. Verma" },
    ],
  );

  const startTreatment = () => {
    setOpen(null);
    toast.success(`${open.name} assigned to ${doctor} · Bed ${bed || "auto"}`);
  };

  return (
    <div className="space-y-6" data-testid="hospital-active">
      <PageHeader title="Active Cases" subtitle="Patients currently under treatment." />
      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Vitals</th>
                <th className="px-5 py-3">Needs</th>
                <th className="px-5 py-3">Doctor</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50" data-testid={`active-${p.id}`}>
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">{p.id} · {p.incident}</p>
                  </td>
                  <td className="px-5 py-3.5"><SeverityBadge severity={p.severity} /></td>
                  <td className="px-5 py-3.5 text-xs text-slate-700">{p.vitals}</td>
                  <td className="px-5 py-3.5 text-slate-700">{p.needs}</td>
                  <td className="px-5 py-3.5 text-slate-700">{p.doctor || "—"}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setOpen(p)} data-testid={`assign-${p.id}`}>
                        <UserCheck size={13} className="mr-1" /> Assign
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90"
                        onClick={() => toast.success(`Started treatment for ${p.name}`)}
                        data-testid={`treat-${p.id}`}
                      >
                        <Stethoscope size={13} className="mr-1" /> Treat
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-md">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">Assign care · {open.name}</DialogTitle>
                <DialogDescription>Pick doctor and bed to start treatment.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Doctor</Label>
                  <Select value={doctor} onValueChange={setDoctor}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DOCTORS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Bed (optional)</Label>
                  <Input value={bed} onChange={(e) => setBed(e.target.value)} placeholder="e.g. ICU-04" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(null)}>Cancel</Button>
                <Button className="bg-[hsl(var(--role-primary))] text-white hover:bg-[hsl(var(--role-primary))]/90" onClick={startTreatment}>
                  Start treatment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
