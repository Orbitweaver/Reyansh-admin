import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { users } from "@/data/mockData";
import { Plus, Search } from "lucide-react";

export default function UsersPage() {
  const [q, setQ] = useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.id.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6" data-testid="users-page">
      <PageHeader
        title="Users"
        subtitle="Drivers, fleet owners and platform users."
        actions={
          <Button className="bg-slate-900 text-white hover:bg-slate-800" data-testid="add-user-btn">
            <Plus size={14} className="mr-1.5" /> Add user
          </Button>
        }
      />

      <SectionCard padded={false}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or ID"
              className="pl-9"
              data-testid="users-search"
            />
          </div>
          <span className="text-xs text-slate-500">{filtered.length} drivers</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">User ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Blood</th>
                <th className="px-5 py-3">Emergency</th>
                <th className="px-5 py-3 text-right">Driving Score</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-900">{u.id}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{u.name}</td>
                  <td className="px-5 py-3.5 text-slate-700">{u.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">{u.bloodGroup}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">{u.emergency}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full ${u.drivingScore >= 80 ? "bg-emerald-500" : u.drivingScore >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${u.drivingScore}%` }}
                        />
                      </div>
                      <span className="tabular-nums font-semibold text-slate-900">{u.drivingScore}</span>
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
