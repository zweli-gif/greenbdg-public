/**
 * Sustainability Dashboard — Nomsa Khumalo
 * Focus: ESG scores, carbon trajectory, GRESB/TCFD reporting
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { Leaf, TrendingDown, Award, FileText } from "lucide-react";

const navItems = [
  { icon: "⊞", label: "Overview" },
  { icon: "🌱", label: "Carbon Tracker" },
  { icon: "🏆", label: "ESG Scores" },
  { icon: "📋", label: "GRESB Report" },
  { icon: "📊", label: "TCFD Report" },
];

const carbonTrajectory = [
  { year: "2022", actual: 28400, target: 28000 },
  { year: "2023", actual: 26800, target: 25200 },
  { year: "2024", actual: 24200, target: 22400 },
  { year: "2025", actual: 21600, target: 19600 },
  { year: "2026", actual: 19800, target: 16800 },
  { year: "2027", actual: null, target: 14000 },
  { year: "2028", actual: null, target: 11200 },
  { year: "2029", actual: null, target: 8400 },
  { year: "2030", actual: null, target: 5600 },
];

const esgScores = [
  { pillar: "Environmental", score: 72, max: 100, color: "#064E3B" },
  { pillar: "Social", score: 65, max: 100, color: "#1A8C6A" },
  { pillar: "Governance", score: 81, max: 100, color: "#2DAF85" },
];

const certifications = [
  { name: "GBCSA Green Star", rating: "5 Star", count: "14 buildings", color: "bg-[#064E3B] text-white" },
  { name: "EDGE Certified", rating: "Advanced", count: "8 buildings", color: "bg-[#1A8C6A] text-white" },
  { name: "BREEAM", rating: "Excellent", count: "3 buildings", color: "bg-[#2DAF85] text-white" },
  { name: "ISO 50001", rating: "Certified", count: "22 buildings", color: "bg-[#E8A838] text-white" },
];

export default function SustainabilityDashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <DashboardLayout
      userName="Nomsa Khumalo"
      userInitials="NK"
      userRole="Sustainability Manager"
      navItems={navItems}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      notificationCount={1}
    >
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Good morning, Nomsa.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Thursday, 27 March 2026 · Sustainability Manager · Portfolio ESG Overview</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Portfolio ESG Score", value: "B+", sub: "72/100 · Up 6pts YoY", icon: <Award size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Carbon Intensity", value: "38.2", sub: "kgCO2e/m² · -12% YoY", icon: <TrendingDown size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "Net Zero Target", value: "2030", sub: "On track · SA NDC aligned", icon: <Leaf size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
            { label: "GRESB Score", value: "74", sub: "Top quartile · 2025", icon: <FileText size={16} className="text-[#1A8C6A]" />, accent: "border-l-4 border-l-[#1A8C6A]" },
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
          {/* Carbon trajectory chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Carbon Trajectory to Net Zero 2030</h3>
            <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>tCO2e · Scope 1 & 2 emissions · SA NDC pathway</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={carbonTrajectory}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#064E3B" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#064E3B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DAF85" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2DAF85" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F7F4" />
                <XAxis dataKey="year" tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{background: "#fff", border: "1px solid #E8F0EC", borderRadius: 6, fontSize: 11, fontFamily: "Work Sans"}}
                  formatter={(v: number) => [`${v?.toLocaleString()} tCO2e`]}
                />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="#064E3B" strokeWidth={2} fill="url(#actualGrad)" connectNulls={false} />
                <Area type="monotone" dataKey="target" name="Net Zero Target" stroke="#2DAF85" strokeWidth={2} strokeDasharray="5 3" fill="url(#targetGrad)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-[#064E3B]" /><span className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Actual</span></div>
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-[#2DAF85] border-dashed" style={{borderTop: "2px dashed #2DAF85"}} /><span className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Net Zero Pathway</span></div>
            </div>
          </div>

          {/* ESG pillars */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="text-[14px] font-semibold text-[#002117] mb-4" style={{fontFamily:"'Work Sans',sans-serif"}}>ESG Pillar Scores</h3>
              <div className="space-y-4">
                {esgScores.map((e) => (
                  <div key={e.pillar}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[12px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{e.pillar}</span>
                      <span className="text-[13px] font-bold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{e.score}</span>
                    </div>
                    <div className="h-2 bg-[#F0F7F4] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{width: `${e.score}%`, background: e.color}} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#E8F0EC]">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Overall ESG</span>
                  <span className="text-[16px] font-bold text-[#064E3B]" style={{fontFamily:"'Work Sans',sans-serif"}}>72 / 100</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="text-[14px] font-semibold text-[#002117] mb-3" style={{fontFamily:"'Work Sans',sans-serif"}}>Certifications</h3>
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.name}</div>
                      <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.count}</div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${c.color}`}>{c.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reporting section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { title: "GRESB 2025 Report", status: "Submitted", date: "Oct 2025", score: "74/100", color: "bg-[#064E3B]" },
            { title: "TCFD Climate Disclosure", status: "In Progress", date: "Due Jun 2026", score: "68% complete", color: "bg-[#E8A838]" },
          ].map((r) => (
            <div key={r.title} className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.title}</div>
                <div className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.date} · Score: {r.score}</div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded text-white ${r.color}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
