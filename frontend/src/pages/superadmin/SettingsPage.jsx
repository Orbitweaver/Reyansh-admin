import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6" data-testid="settings-page">
      <PageHeader title="Settings" subtitle="System-wide configuration." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Organisation profile">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}>
            <div className="space-y-1.5">
              <Label>Organisation name</Label>
              <Input defaultValue="Reyansh Technologies" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Region</Label>
                <Input defaultValue={user?.region || "National"} />
              </div>
              <div className="space-y-1.5">
                <Label>Operations email</Label>
                <Input defaultValue={user?.email || "ops@iiotsafety.io"} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">Save changes</Button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Notifications">
          <div className="space-y-3">
            {[
              "Push critical incidents to all services",
              "Send daily digest to operations",
              "Auto-dispatch on G-force > 5g",
              "Allow SMS fallback when in-app delivery fails",
            ].map((label, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/40 p-3">
                <p className="text-sm text-slate-700">{label}</p>
                <Switch defaultChecked={i !== 3} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
