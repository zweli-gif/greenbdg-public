/**
 * FM Dashboard — Sipho Mthembu, Facilities Manager
 * Crisp Plush: white canvas, forest green sidebar, bento stat cards
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AlertTriangle, CheckCircle, Clock, Wrench, Zap, Thermometer, Droplets } from "lucide-react";

const navItems = [
  { icon: "⊞", label: "Overview" },
  { icon: "🎫", label: "Tickets" },
  { icon: "🔧", label: "PPM Schedule" },
  { icon: "📊", label: "Systems" },
  { icon: "📋", label: "Reports" },
];

const tickets = [
  { id: "T-1082", title: "Access reader offline Level 3", priority: "CRITICAL", time: "2h ago", building: "Waterfall Corporate Estate" },
  { id: "T-1081", title: "HVAC fault — chiller unit B", priority: "CRITICAL", time: "4h ago", building: "Sandton Heights" },
  { id: "T-1080", title: "AC unit noise — Floor 8", priority: "MEDIUM", time: "6h ago", building: "Sandton Heights" },
  { id: "T-1079", title: "Broken roller blind — Boardroom B", priority: "LOW", time: "1d ago", building: "Waterfall Corporate Estate" },
  { id: "T-1078", title: "Parking gate sensor fault", priority: "MEDIUM", time: "1d ago", building: "Cape Green Tower" },
  { id: "T-1077", title: "Water leak — basement plant room", priority: "CRITICAL", time: "2d ago", building: "Mombasa Hub" },
];

const ppmItems = [
  { task: "Fire suppression system test", building: "Waterfall Corporate Estate", due: "28 Mar 2026", status: "DUE SOON" },
  { task: "Lift annual inspection", building: "Sandton Heights", due: "15 Apr 2026", status: "SCHEDULED" },
  { task: "Generator load test", building: "Cape Green Tower", due: "1 Apr 2026", status: "DUE SOON" },
  { task: "HVAC filter replacement", building: "All buildings", due: "30 Apr 2026", status: "SCHEDULED" },
];

const priorityStyles: Record<string, string> = {
  CRITICAL: "bg-[#DF795F]/10 text-[#DF795F] border border-[#DF795F]/20",
  MEDIUM: "bg-[#E8A838]/10 text-[#C88A20] border border-[#E8A838]/20",
  LOW: "bg-[#F0F7F4] text-[#064E3B] border border-[#CCE0D6]",
};

export default function FMDashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <DashboardLayout
      userName="Sipho Mthembu"
      userInitials="SM"
      userRole="Facilities Manager"
      navItems={navItems}
      activeNav={activeNav}
      onNavChange={setActiveNav}
      notificationCount={3}
    >
      <div className="p-6 lg:p-8">
        {/* Welcome header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Good morning, Sipho.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Thursday, 27 March 2026 · Facilities Manager · Waterfall Corporate Estate</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Open Tickets", value: "12", sub: "3 critical", icon: <AlertTriangle size={16} className="text-[#DF795F]" />, accent: "border-l-4 border-l-[#DF795F]" },
            { label: "Resolved Today", value: "5", sub: "vs 3 yesterday", icon: <CheckCircle size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "PPM Due", value: "3", sub: "Next 7 days", icon: <Clock size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
            { label: "Buildings Active", value: "8", sub: "All systems nominal", icon: <Wrench size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
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
          {/* Open tickets */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F0EC]">
              <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Open Tickets</h3>
              <span className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>12 total</span>
            </div>
            <div className="divide-y divide-[#F0F7F4]">
              {tickets.map((t) => (
                <div key={t.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F9F9F8] transition-colors cursor-pointer">
                  <div className="text-[10px] font-mono text-[#8BBFA0] w-14 flex-shrink-0">{t.id}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-[#002117] truncate" style={{fontFamily:"'Work Sans',sans-serif"}}>{t.title}</div>
                    <div className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{t.building} · {t.time}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 ${priorityStyles[t.priority]}`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Live systems */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8F0EC]">
                <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Live Systems</h3>
                <p className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>Waterfall Corporate Estate</p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { icon: <Thermometer size={13} />, label: "HVAC", value: "22.4°C / 68%", status: "ONLINE", ok: true },
                  { icon: <Zap size={13} />, label: "Electrical", value: "420A / Normal", status: "ONLINE", ok: true },
                  { icon: <Droplets size={13} />, label: "Water", value: "0.8 kL/m²", status: "ONLINE", ok: true },
                  { icon: <span className="text-[13px]">🔒</span>, label: "Access Control", value: "Level 3 offline", status: "WARNING", ok: false },
                  { icon: <span className="text-[13px]">🔥</span>, label: "Fire Safety", value: "All sensors clear", status: "ONLINE", ok: true },
                  { icon: <span className="text-[13px]">⚡</span>, label: "Generator", value: "Standby ready", status: "STANDBY", ok: true },
                ].map((sys) => (
                  <div key={sys.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6BAF8A]">{sys.icon}</span>
                      <div>
                        <div className="text-[11px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{sys.label}</div>
                        <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{sys.value}</div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sys.ok ? sys.status === "STANDBY" ? "bg-[#E8A838]/10 text-[#C88A20]" : "bg-[#F0F7F4] text-[#064E3B]" : "bg-[#DF795F]/10 text-[#DF795F]"}`}>
                      {sys.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PPM */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8F0EC]">
                <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>PPM Schedule</h3>
              </div>
              <div className="divide-y divide-[#F0F7F4]">
                {ppmItems.map((p) => (
                  <div key={p.task} className="px-4 py-3">
                    <div className="text-[11px] font-medium text-[#002117] mb-0.5" style={{fontFamily:"'Work Sans',sans-serif"}}>{p.task}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{p.due}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${p.status === "DUE SOON" ? "bg-[#E8A838]/10 text-[#C88A20]" : "bg-[#F0F7F4] text-[#064E3B]"}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
