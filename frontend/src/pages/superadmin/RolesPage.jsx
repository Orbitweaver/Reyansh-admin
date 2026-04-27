import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { roles } from "@/data/mockData";
import { Plus, Check } from "lucide-react";

const ALL_PERMS = ["view", "edit", "assign", "override", "create"];

export default function RolesPage() {
  return (
    <div className="space-y-6" data-testid="roles-page">
      <PageHeader
        title="Roles & Permissions"
        subtitle="Define who can view, edit, assign and override across services."
        actions={
          <Button className="bg-slate-900 text-white hover:bg-slate-800" data-testid="add-role-btn">
            <Plus size={14} className="mr-1.5" /> New role
          </Button>
        }
      />

      <SectionCard padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Scope</th>
                <th className="px-5 py-3">Users</th>
                {ALL_PERMS.map((p) => (
                  <th key={p} className="px-5 py-3 capitalize">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">
                    <p className="font-display font-semibold text-slate-900">{r.name}</p>
                    <p className="font-mono text-[10px] text-slate-400">{r.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">{r.scope}</td>
                  <td className="px-5 py-3.5 tabular-nums">{r.users}</td>
                  {ALL_PERMS.map((p) => (
                    <td key={p} className="px-5 py-3.5">
                      {r.permissions.includes(p) ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                          <Check size={13} />
                        </span>
                      ) : (
                        <span className="inline-block h-6 w-6 rounded-full bg-slate-100" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Quick toggles" subtitle="Override per-permission policies system-wide">
        <div className="space-y-3">
          {[
            { label: "Allow super admin override of any active case", on: true },
            { label: "Hospitals can redirect incoming patients", on: true },
            { label: "Fire stations can request police backup", on: false },
            { label: "Police can close ambulance trips", on: false },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/40 p-3">
              <p className="text-sm text-slate-700">{t.label}</p>
              <Switch defaultChecked={t.on} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
