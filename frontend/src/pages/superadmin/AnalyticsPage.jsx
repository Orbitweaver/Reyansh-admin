import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import KPITile from "@/components/shared/KPITile";
import { analytics } from "@/data/mockData";
import { Clock, Activity, AlertTriangle, Gauge } from "lucide-react";

const PIE_COLORS = ["#E11D48", "#EA580C", "#D97706", "#059669"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6" data-testid="analytics-page">
      <PageHeader title="Analytics" subtitle="Driving trends, accidents and response performance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPITile icon={Clock} label="Avg Response" value="8.4 m" accent="blue" trend={{ direction: "down", value: "-6%" }} />
        <KPITile icon={Activity} label="Trips today" value="1,284" accent="indigo" trend={{ direction: "up", value: "+9%" }} />
        <KPITile icon={AlertTriangle} label="Critical events" value="14" accent="rose" trend={{ direction: "down", value: "-3%" }} />
        <KPITile icon={Gauge} label="Avg score" value="78" accent="emerald" trend={{ direction: "up", value: "+1.2%" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Response Time by Service" subtitle="Minutes (last 7 days)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.responseTimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line dataKey="police" stroke="#0369A1" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="ambulance" stroke="#C2410C" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="fire" stroke="#BE123C" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Severity Distribution" subtitle="All incidents this month">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.severitySplit} dataKey="value" nameKey="name" outerRadius={92} innerRadius={58}>
                  {analytics.severitySplit.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Driving Score Distribution" subtitle="Across all drivers">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.drivingScore}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="score" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Bar dataKey="drivers" fill="#0F172A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Accident Trend (6 months)" subtitle="Detected incidents per month">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.accidentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Line dataKey="count" stroke="#0F172A" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
