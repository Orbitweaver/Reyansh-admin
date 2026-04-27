import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import KPITile from "@/components/shared/KPITile";
import { Flame, Truck, Clock, FileText } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", fires: 2 },
  { day: "Tue", fires: 4 },
  { day: "Wed", fires: 3 },
  { day: "Thu", fires: 5 },
  { day: "Fri", fires: 6 },
  { day: "Sat", fires: 7 },
  { day: "Sun", fires: 4 },
];

export default function FireReports() {
  return (
    <div className="space-y-6" data-testid="fire-reports">
      <PageHeader title="Reports" subtitle="Brigade performance and dispatch summary." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPITile icon={Flame} label="Fires this week" value="31" accent="role" />
        <KPITile icon={Truck} label="Trucks deployed" value="48" accent="rose" />
        <KPITile icon={Clock} label="Avg arrival" value="11.2 m" accent="amber" />
        <KPITile icon={FileText} label="Reports filed" value="29" accent="indigo" />
      </div>

      <SectionCard title="Fire incidents by day">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BE123C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#BE123C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="fires" stroke="#BE123C" strokeWidth={2} fill="url(#fireGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
