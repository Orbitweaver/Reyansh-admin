import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { incidents } from "@/data/mockData";
import { toast } from "sonner";
import { Eye, Send } from "lucide-react";

export default function IncidentsPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-6" data-testid="incidents-page">
      <PageHeader title="Incidents" subtitle="Cross-service incidents — dispatch and override controls." />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {["all", "active", "completed"].map((tab) => {
          const list = incidents.filter((i) =>
            tab === "all" ? true : tab === "completed" ? i.status === "completed" : i.status !== "completed",
          );
          return (
            <TabsContent key={tab} value={tab} className="mt-5">
              <SectionCard padded={false}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                      <tr>
                        <th className="px-5 py-3">Incident</th>
                        <th className="px-5 py-3">Type</th>
                        <th className="px-5 py-3">Vehicle</th>
                        <th className="px-5 py-3">Location</th>
                        <th className="px-5 py-3">Severity</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((i) => (
                        <tr key={i.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                          <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{i.id}</td>
                          <td className="px-5 py-3.5 text-slate-700">{i.type}</td>
                          <td className="px-5 py-3.5 font-mono text-xs">{i.vehicle}</td>
                          <td className="px-5 py-3.5 max-w-[260px] truncate text-slate-700">{i.location}</td>
                          <td className="px-5 py-3.5"><SeverityBadge severity={i.severity} /></td>
                          <td className="px-5 py-3.5"><StatusBadge status={i.status} /></td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => setOpen(i)} data-testid={`view-${i.id}`}>
                                <Eye size={13} className="mr-1" /> View
                              </Button>
                              <Button
                                size="sm"
                                className="bg-slate-900 text-white hover:bg-slate-800"
                                onClick={() => toast.success(`Dispatched all services for ${i.id}`)}
                                data-testid={`dispatch-${i.id}`}
                              >
                                <Send size={13} className="mr-1" /> Dispatch
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">{open.id} · {open.type}</DialogTitle>
                <DialogDescription>{open.location}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <SeverityBadge severity={open.severity} />
                  <StatusBadge status={open.status} />
                </div>
                <p className="text-slate-700">{open.description}</p>
                <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Service responses</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(open.services).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between rounded-md bg-white px-2 py-1.5">
                        <span className="capitalize text-slate-600">{k}</span>
                        <StatusBadge status={v} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => toast.message(`Override applied to ${open.id}`)}>
                    Override
                  </Button>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => toast.success(`Reassigned ${open.id}`)}>
                    Reassign
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
