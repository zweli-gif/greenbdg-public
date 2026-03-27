/**
 * Tenant Portal — African Corp Holdings
 * Focus: Floor energy usage, fault reporting, sustainability commitments
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, Droplets, AlertCircle, CheckCircle, Plus } from "lucide-react";

const navItems = [
  { icon: "⊞", label: "My Space" },
  { icon: "⚡", label: "Energy" },
  { icon: "🔧", label: "Fault Reports" },
  { icon: "🌱", label: "Sustainability" },
  { icon: "📋", label: "Documents" },
];

const weeklyEnergy = [
  { day: "Mon", kwh: 2840 }, { day: "Tue", kwh: 3120 }, { day: "Wed", kwh: 2960 },
  { day: "Thu", kwh: 3240 }, { day: "Fri", kwh: 2680 }, { day: "Sat", kwh: 820 }, { day: "Sun", kwh: 410 },
];

const faults = [
  { id: "F-0042", title: "AC unit not cooling — Floor 15, Zone B", status: "IN PROGRESS", date: "25 Mar 2026" },
  { id: "F-0039", title: "Broken blind — Meeting Room 14C", status: "RESOLVED", date: "20 Mar 2026" },
  { id: "F-0035", title: "Lift door slow to close — Lift 2", status: "RESOLVED", date: "14 Mar 2026" },
];

const statusStyles: Record<string, string> = {
  "IN PROGRESS": "bg-[#E8A838]/10 text-[#C88A20]",
  "RESOLVED": "bg-[#F0F7F4] text-[#064E3B]",
  "OPEN": "bg-[#DF795F]/10 text-[#DF795F]",
};

export default function TenantPortal() {
  const [showFaultForm, setShowFaultForm] = useState(false);

  return (
    <DashboardLayout role="Tenant" user="African Corp Holdings" initials="AC">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Welcome, African Corp Holdings.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Sandton Heights · Floors 14–16 · 3,200 m² · 6-Star Green Star building</p>
        </div>

        {/* Building certifications banner */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: "6-Star Green Star", color: "bg-[#064E3B] text-white" },
            { label: "EDGE Advanced", color: "bg-[#1A8C6A] text-white" },
            { label: "ISO 50001", color: "bg-[#E8A838] text-white" },
            { label: "EPC Rating: B", color: "bg-[#F0F7F4] text-[#064E3B] border border-[#CCE0D6]" },
          ].map((c) => (
            <span key={c.label} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${c.color}`} style={{fontFamily:"'Work Sans',sans-serif"}}>{c.label}</span>
          ))}
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Energy This Month", value: "18.4", sub: "MWh · -8% vs last month", icon: <Zap size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Water This Month", value: "142", sub: "kL · Normal range", icon: <Droplets size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "Open Faults", value: "1", sub: "1 in progress", icon: <AlertCircle size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Sustainability Score", value: "A-", sub: "Floor-level rating", icon: <CheckCircle size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-lg p-5 shadow-sm ${s.accent}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.label}</span>
                {s.icon}
              </div>
              <div className="stat-numeral text-[#002117]">{s.value}</div>
              <div className="text-[11px] text-[#8BBFA0] mt-1" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Weekly Energy Usage — Floors 14–16</h3>
            <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>kWh · Week of 24 March 2026</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyEnergy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F7F4" />
                <XAxis dataKey="day" tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background: "#fff", border: "1px solid #E8F0EC", borderRadius: 6, fontSize: 11, fontFamily: "Work Sans"}} formatter={(v: number) => [`${v} kWh`]} />
                <Bar dataKey="kwh" name="Energy" fill="#064E3B" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fault reports */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F0EC]">
              <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Fault Reports</h3>
              <button
                onClick={() => setShowFaultForm(!showFaultForm)}
                className="flex items-center gap-1 text-[11px] font-medium text-[#064E3B] hover:text-[#002117] transition-colors"
                style={{fontFamily:"'Work Sans',sans-serif"}}
              >
                <Plus size={13} />
                Report
              </button>
            </div>

            {showFaultForm && (
              <div className="px-4 py-3 bg-[#F0F7F4] border-b border-[#CCE0D6]">
                <textarea
                  className="w-full text-[12px] border border-[#CCE0D6] rounded p-2.5 bg-white text-[#002117] focus:outline-none focus:border-[#064E3B] resize-none"
                  rows={2}
                  placeholder="Describe the fault..."
                  style={{fontFamily:"'Work Sans',sans-serif"}}
                />
                <button
                  onClick={() => setShowFaultForm(false)}
                  className="mt-2 px-3 py-1.5 bg-[#064E3B] text-white text-[11px] font-semibold rounded hover:bg-[#003527] transition-colors"
                  style={{fontFamily:"'Work Sans',sans-serif"}}
                >
                  Submit
                </button>
              </div>
            )}

            <div className="divide-y divide-[#F0F7F4]">
              {faults.map((f) => (
                <div key={f.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-[11px] font-medium text-[#002117] leading-snug" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.title}</div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${statusStyles[f.status]}`}>{f.status}</span>
                  </div>
                  <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.id} · {f.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sustainability commitments */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-[14px] font-semibold text-[#002117] mb-4" style={{fontFamily:"'Work Sans',sans-serif"}}>Your Sustainability Commitments</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { title: "Carbon Neutral by 2030", progress: 62, desc: "Scope 1 & 2 emissions reduction plan" },
              { title: "Zero Waste to Landfill", progress: 78, desc: "Recycling & composting programme" },
              { title: "Water Efficiency", progress: 45, desc: "Target: 0.5 kL/m² per year" },
            ].map((c) => (
              <div key={c.title} className="p-4 bg-[#F9F9F8] rounded-lg">
                <div className="text-[12px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.title}</div>
                <div className="text-[11px] text-[#8BBFA0] mb-3" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.desc}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#E8F0EC] rounded-full overflow-hidden">
                    <div className="h-full bg-[#064E3B] rounded-full" style={{width: `${c.progress}%`}} />
                  </div>
                  <span className="text-[11px] font-bold text-[#064E3B]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
