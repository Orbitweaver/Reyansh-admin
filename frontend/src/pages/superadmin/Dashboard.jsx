import React from "react";
import {
  Siren,
  Car,
  Cpu,
  Users as UsersIcon,
  Activity,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import PageHeader from "@/components/shared/PageHeader";
import KPITile from "@/components/shared/KPITile";
import SectionCard from "@/components/shared/SectionCard";
import SeverityBadge from "@/components/shared/SeverityBadge";
import StatusBadge from "@/components/shared/StatusBadge";
import MapView from "@/components/shared/MapView";
import { incidents, vehicles, devices, users, alerts, analytics } from "@/data/mockData";

export default function AdminDashboard() {
  const activeIncidents = incidents.filter((i) => i.status !== "completed").length;
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;
  const onlineDevices = devices.filter((d) => d.status === "online").length;

  const mapMarkers = incidents.slice(0, 6).map((i) => ({
    coords: i.coords,
    title: i.id,
    subtitle: `${i.type} · ${i.location}`,
    severity: i.severity,
  }));

  return (
    <div className="space-y-6" data-testid="admin-dashboard">
      <PageHeader
        title="Master Control"
        subtitle="National view of every connected vehicle, IoT device and emergency response."
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPITile
          icon={Siren}
          label="Active Incidents"
          value={activeIncidents}
          accent="rose"
          trend={{ direction: "up", value: "+12%" }}
          testId="kpi-incidents"
        />
        <KPITile
          icon={Car}
          label="Vehicles Connected"
          value={vehicles.length}
          accent="blue"
          trend={{ direction: "up", value: "+3.2%" }}
          testId="kpi-vehicles"
        />
        <KPITile
          icon={Cpu}
          label="IoT Devices Online"
          value={`${onlineDevices}/${devices.length}`}
          accent="emerald"
          trend={{ direction: "down", value: "-1.4%" }}
          testId="kpi-devices"
        />
        <KPITile
          icon={UsersIcon}
          label="Registered Drivers"
          value={users.length}
          accent="indigo"
          trend={{ direction: "up", value: "+0.8%" }}
          testId="kpi-users"
        />
      </div>

      {/* Map + Live alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard
            title="Live Incident Map"
            subtitle="Severity-coloured pulses across active incidents"
            padded={false}
          >
            <div className="p-3">
              <MapView markers={mapMarkers} height={420} testId="dashboard-map" />
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Critical Alerts" subtitle="Last 24h" padded={false}>
          <ul className="divide-y divide-slate-100">
            {alerts.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <AlertTriangle size={15} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">{a.title}</p>
                    <SeverityBadge severity={a.severity} withDot={false} />
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {a.vehicle} · {a.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Response Time Trend" subtitle="Average minutes per service">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.responseTimeTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Area type="monotone" dataKey="police" stroke="#0369A1" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="ambulance" stroke="#C2410C" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="fire" stroke="#BE123C" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Accident Trend (Monthly)" subtitle="Detected incidents per month">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.accidentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar dataKey="count" fill="#0F172A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Recent incidents */}
      <SectionCard title="Recent Incidents" subtitle="Most recent system-wide events" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/60 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-5 py-3">Incident</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Vehicle</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">ETA</th>
              </tr>
            </thead>
            <tbody>
              {incidents.slice(0, 5).map((i) => (
                <tr key={i.id} className="border-t border-slate-100 text-sm hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-900">{i.id}</td>
                  <td className="px-5 py-3 text-slate-700">{i.type}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-700">{i.vehicle}</td>
                  <td className="px-5 py-3"><SeverityBadge severity={i.severity} /></td>
                  <td className="px-5 py-3"><StatusBadge status={i.status} /></td>
                  <td className="px-5 py-3 text-slate-700">{i.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
