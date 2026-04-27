import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";
import KPITile from "@/components/shared/KPITile";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Clock, CheckCircle2, Siren, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const data = [
  { day: "Mon", cases: 7 },
  { day: "Tue", cases: 11 },
  { day: "Wed", cases: 9 },
  { day: "Thu", cases: 14 },
  { day: "Fri", cases: 12 },
  { day: "Sat", cases: 16 },
  { day: "Sun", cases: 10 },
];

export default function PoliceReports() {
  return (
    <div className="space-y-6" data-testid="police-reports">
      <PageHeader
        title="Reports"
        subtitle="Operational performance for your unit."
        actions={
          <Button variant="outline" data-testid="export-btn"><Download size={14} className="mr-1.5" /> Export PDF</Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPITile icon={Siren} label="Cases this week" value="79" accent="role" />
        <KPITile icon={CheckCircle2} label="Closed" value="62" accent="emerald" />
        <KPITile icon={Clock} label="Avg response" value="7.8 m" accent="blue" />
        <KPITile icon={FileText} label="Reports filed" value="58" accent="indigo" />
      </div>

      <SectionCard title="Cases per day">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="#e2e8f0" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="cases" fill="#0369A1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
