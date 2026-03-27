/**
 * CFO Dashboard — Amahle Dube
 * Focus: Carbon tax liability, green premiums, CapEx modelling
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingDown, TrendingUp, DollarSign, Leaf } from "lucide-react";

const navItems = [
  { icon: "⊞", label: "Overview" },
  { icon: "💰", label: "Carbon Tax" },
  { icon: "📈", label: "Green Premium" },
  { icon: "🏗️", label: "CapEx Model" },
  { icon: "📊", label: "Reports" },
];

const carbonTaxData = [
  { year: "2024", liability: 3.2, savings: 0.8 },
  { year: "2025", liability: 3.8, savings: 1.2 },
  { year: "2026", liability: 4.2, savings: 1.7 },
  { year: "2027", liability: 3.1, savings: 2.4 },
  { year: "2028", liability: 2.4, savings: 3.1 },
];

const capexItems = [
  { project: "Solar PV — Waterfall", capex: "R 2.1M", co2: "-340 tCO2e", priority: "High ROI", color: "bg-[#064E3B]" },
  { project: "LED Retrofit — Mombasa", capex: "R 480k", co2: "-180 tCO2e", priority: "Quick win", color: "bg-[#1A8C6A]" },
  { project: "HVAC Upgrade — Sandton", capex: "R 1.3M", co2: "-220 tCO2e", priority: "Medium", color: "bg-[#2DAF85]" },
  { project: "EPC Renewal x5", capex: "R 95k", co2: "Compliance", priority: "Urgent", color: "bg-[#DF795F]" },
];

export default function CFODashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <DashboardLayout
      userName="Amahle Dube"
      userInitials="AD"
      userRole="CFO · Growthpoint Properties"
      navItems={navItems}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      notificationCount={2}
    >
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Good morning, Amahle.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Thursday, 27 March 2026 · CFO · Portfolio Financial Overview</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Carbon Tax Liability", value: "R 4.2M", sub: "2026 projection · SARS Act", icon: <DollarSign size={16} className="text-[#DF795F]" />, accent: "border-l-4 border-l-[#DF795F]" },
            { label: "Projected Tax Saving", value: "R 1.7M", sub: "With CapEx plan", icon: <TrendingDown size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "Green Premium", value: "+8.4%", sub: "vs non-green assets", icon: <TrendingUp size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Portfolio ESG", value: "B+", sub: "Up from B last quarter", icon: <Leaf size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
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
          {/* Carbon tax chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Carbon Tax Liability vs Projected Savings</h3>
            </div>
            <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>R millions · SARS Carbon Tax Act @ R190/tCO2e</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={carbonTaxData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F7F4" />
                <XAxis dataKey="year" tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} tickFormatter={(v) => `R${v}M`} />
                <Tooltip
                  contentStyle={{background: "#fff", border: "1px solid #E8F0EC", borderRadius: 6, fontSize: 11, fontFamily: "Work Sans"}}
                  formatter={(v: number) => [`R${v}M`]}
                />
                <Bar dataKey="liability" name="Tax Liability" fill="#DF795F" radius={[3,3,0,0]} />
                <Bar dataKey="savings" name="Projected Savings" fill="#2DAF85" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#DF795F]" /><span className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Tax Liability</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#2DAF85]" /><span className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Projected Savings</span></div>
            </div>
          </div>

          {/* CapEx model */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8F0EC]">
              <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Carbon Reduction CapEx</h3>
              <p className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Investment model</p>
            </div>
            <div className="divide-y divide-[#F0F7F4]">
              {capexItems.map((c) => (
                <div key={c.project} className="px-4 py-3.5">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-[12px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.project}</div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white ${c.color}`}>{c.priority}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.capex}</span>
                    <span className="text-[11px] text-[#2DAF85]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.co2}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-[#F0F7F4] border-t border-[#CCE0D6]">
              <p className="text-[10px] text-[#064E3B] font-medium" style={{fontFamily:"'Work Sans',sans-serif"}}>Total CapEx: R 3.975M · Projected tax saving: R 1.7M/yr</p>
            </div>
          </div>
        </div>

        {/* Green premium section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Green Premium Analysis</h3>
          <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>Rental premium of green-certified vs non-certified assets in portfolio</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "A-rated buildings", premium: "+12.3%", count: "13 assets" },
              { label: "B-rated buildings", premium: "+6.1%", count: "22 assets" },
              { label: "C-rated buildings", premium: "-2.4%", count: "8 assets" },
              { label: "Uncertified", premium: "-8.7%", count: "5 assets" },
            ].map((g) => (
              <div key={g.label} className="p-4 bg-[#F9F9F8] rounded-lg">
                <div className="text-[11px] text-[#6BAF8A] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>{g.label}</div>
                <div className={`text-xl font-bold ${g.premium.startsWith("+") ? "text-[#064E3B]" : "text-[#DF795F]"}`} style={{fontFamily:"'Work Sans',sans-serif"}}>{g.premium}</div>
                <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{g.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
