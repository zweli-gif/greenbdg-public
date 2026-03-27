/**
 * Building Dashboard — Nkosi Dlamini, Building Manager
 * Focus: Live systems, tenant management, compliance
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Zap, Droplets, Thermometer, CheckCircle, AlertTriangle } from "lucide-react";

const navItems = [
  { icon: "⊞", label: "Overview" },
  { icon: "🏢", label: "Systems" },
  { icon: "👥", label: "Tenants" },
  { icon: "📋", label: "Compliance" },
  { icon: "🎫", label: "Tickets" },
];

const energyData = [
  { time: "06:00", kw: 180 }, { time: "08:00", kw: 340 }, { time: "10:00", kw: 420 },
  { time: "12:00", kw: 460 }, { time: "14:00", kw: 445 }, { time: "16:00", kw: 390 },
  { time: "18:00", kw: 280 }, { time: "20:00", kw: 190 },
];

const tenants = [
  { name: "African Corp Holdings", floors: "14–16", area: "3,200 m²", status: "Active", energy: "Good" },
  { name: "Deloitte SA", floors: "10–13", area: "4,100 m²", status: "Active", energy: "Good" },
  { name: "Standard Bank", floors: "7–9", area: "3,600 m²", status: "Active", energy: "Warning" },
  { name: "Shoprite Group", floors: "4–6", area: "2,800 m²", status: "Active", energy: "Good" },
  { name: "Vodacom", floors: "1–3", area: "2,400 m²", status: "Active", energy: "Good" },
];

const compliance = [
  { item: "EPC Certificate", status: "VALID", expiry: "Dec 2026", ok: true },
  { item: "Fire Safety Certificate", status: "VALID", expiry: "Jun 2026", ok: true },
  { item: "Lift Inspection", status: "DUE SOON", expiry: "Apr 2026", ok: false },
  { item: "GBCSA Green Star", status: "VALID", expiry: "2028", ok: true },
  { item: "Electrical COC", status: "VALID", expiry: "Nov 2026", ok: true },
];

export default function BuildingDashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <DashboardLayout
      userName="Nkosi Dlamini"
      userInitials="ND"
      userRole="Building Manager · Sandton Heights"
      navItems={navItems}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      notificationCount={2}
    >
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Good morning, Nkosi.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Thursday, 27 March 2026 · Building Manager · Sandton Heights, 22,400 m²</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Live Occupancy", value: "87%", sub: "1,840 of 2,100 desks", icon: <Users size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
            { label: "Energy Today", value: "3.8", sub: "MWh · -6% vs yesterday", icon: <Zap size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Water Today", value: "18.4", sub: "kL · Normal range", icon: <Droplets size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "Avg Temperature", value: "22.1°", sub: "°C · All zones", icon: <Thermometer size={16} className="text-[#1A8C6A]" />, accent: "border-l-4 border-l-[#1A8C6A]" },
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
            <h3 className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Today's Energy Demand</h3>
            <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>kW · Sandton Heights · 27 March 2026</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F7F4" />
                <XAxis dataKey="time" tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background: "#fff", border: "1px solid #E8F0EC", borderRadius: 6, fontSize: 11, fontFamily: "Work Sans"}} formatter={(v: number) => [`${v} kW`]} />
                <Line type="monotone" dataKey="kw" stroke="#064E3B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8F0EC]">
              <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Compliance Status</h3>
            </div>
            <div className="divide-y divide-[#F0F7F4]">
              {compliance.map((c) => (
                <div key={c.item} className="flex items-center gap-3 px-4 py-3.5">
                  {c.ok ? <CheckCircle size={14} className="text-[#2DAF85] flex-shrink-0" /> : <AlertTriangle size={14} className="text-[#E8A838] flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{c.item}</div>
                    <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Expires {c.expiry}</div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${c.ok ? "bg-[#F0F7F4] text-[#064E3B]" : "bg-[#E8A838]/10 text-[#C88A20]"}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tenants */}
        <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F0EC]">
            <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Tenant Overview</h3>
            <span className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>5 tenants · 100% occupancy</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]" style={{fontFamily:"'Work Sans',sans-serif"}}>
              <thead>
                <tr className="border-b border-[#E8F0EC]">
                  {["Tenant", "Floors", "Area", "Status", "Energy Use"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-[#6BAF8A] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.name} className="border-b border-[#F0F7F4] data-row cursor-pointer">
                    <td className="px-5 py-3.5 font-medium text-[#002117]">{t.name}</td>
                    <td className="px-5 py-3.5 text-[#5A8A6A]">{t.floors}</td>
                    <td className="px-5 py-3.5 text-[#5A8A6A]">{t.area}</td>
                    <td className="px-5 py-3.5">
                      <span className="bg-[#F0F7F4] text-[#064E3B] text-[10px] font-semibold px-2 py-0.5 rounded">{t.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${t.energy === "Good" ? "bg-[#F0F7F4] text-[#064E3B]" : "bg-[#E8A838]/10 text-[#C88A20]"}`}>{t.energy}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
