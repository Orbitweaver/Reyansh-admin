import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services } from "@/data/mockData";
import { Plus, Building2, Hospital, Flame, Ambulance } from "lucide-react";
import { toast } from "sonner";

const TYPE_META = {
  police: { icon: Building2, color: "bg-sky-50 text-sky-700" },
  hospital: { icon: Hospital, color: "bg-emerald-50 text-emerald-700" },
  fire: { icon: Flame, color: "bg-rose-50 text-rose-700" },
  ambulance: { icon: Ambulance, color: "bg-orange-50 text-orange-700" },
};

export default function ServicesManagement() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "police", name: "", region: "", contact: "" });

  const submit = (e) => {
    e.preventDefault();
    setOpen(false);
    toast.success(`Onboarded ${form.name} (${form.type.toUpperCase()})`);
  };

  return (
    <div className="space-y-6" data-testid="services-management">
      <PageHeader
        title="Emergency Services Management"
        subtitle="Onboard police stations, hospitals, fire stations and ambulance units."
        actions={
          <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => setOpen(true)} data-testid="onboard-service-btn">
            <Plus size={14} className="mr-1.5" /> Onboard service
          </Button>
        }
      />

      <Tabs defaultValue="police">
        <TabsList>
          <TabsTrigger value="police">Police</TabsTrigger>
          <TabsTrigger value="hospital">Hospitals</TabsTrigger>
          <TabsTrigger value="fire">Fire</TabsTrigger>
          <TabsTrigger value="ambulance">Ambulance</TabsTrigger>
        </TabsList>
        {Object.keys(services).map((key) => {
          const Meta = TYPE_META[key];
          return (
            <TabsContent key={key} value={key} className="mt-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services[key].map((s) => (
                  <div key={s.id} className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.05)]">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${Meta.color}`}>
                        <Meta.icon size={18} strokeWidth={1.75} />
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                    <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">{s.id}</p>
                    <p className="font-display text-lg font-bold text-slate-900">{s.name}</p>
                    <p className="text-sm text-slate-600">{s.region}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-slate-50 p-2">
                        <p className="text-slate-500">Contact</p>
                        <p className="mt-0.5 font-mono font-semibold text-slate-900">{s.contact}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2">
                        <p className="text-slate-500">{s.units ? "Units" : s.crews ? "Crews" : s.trucks ? "Trucks" : "ICU"}</p>
                        <p className="mt-0.5 font-semibold text-slate-900">{s.units ?? s.crews ?? s.trucks ?? `${s.icu} ICU · ${s.general}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Onboard new service</DialogTitle>
            <DialogDescription>Auto-generates a unique service ID upon save.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Service type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="police">Police Station</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="fire">Fire Station</SelectItem>
                  <SelectItem value="ambulance">Ambulance Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Region</Label>
                <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label>Contact</Label>
                <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800" data-testid="confirm-onboard">
                Onboard service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
