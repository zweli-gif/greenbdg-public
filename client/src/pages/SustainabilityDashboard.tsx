/**
 * Sustainability Dashboard — Operational design system
 * Lerato Ndlovu · Growthpoint Properties
 * Source: sustainability-dashboard.html
 */
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const C = {
  sageBg: "#E8EDE4", white: "#FFFFFF", green: "#5A9A6E", amber: "#E8A838",
  coral: "#E07A5F", blue: "#6B9BD1", text: "#2D3A2D", textSec: "#5A6B5A",
  textMuted: "#8A9A8A", border: "#D8E0D5",
};

const kpis = [
  { dot: C.green, label: "Portfolio ESG Score", value: "78/100", change: "+5 pts this quarter", sub: "GRESB aligned" },
  { dot: C.coral, label: "Total Carbon Emissions", value: "15,420", change: "-8% vs last year", sub: "tCO₂e · Scope 1+2+3" },
  { dot: C.blue, label: "Net Zero Target", value: "2030", change: "On track", sub: "6 years remaining" },
  { dot: C.amber, label: "GRESB Rating", value: "4-Star", change: "Up from 3-star", sub: "Global benchmark" },
];

const carbonTrajectory = [
  { year: "2022", actual: 18200, target: 18000 },
  { year: "2023", actual: 17100, target: 16500 },
  { year: "2024", actual: 16200, target: 15000 },
  { year: "2025", actual: 15420, target: 13500 },
  { year: "2026", actual: null, target: 12000 },
  { year: "2027", actual: null, target: 10000 },
  { year: "2028", actual: null, target: 7500 },
  { year: "2029", actual: null, target: 4000 },
  { year: "2030", actual: null, target: 0 },
];

const buildings = [
  { name: "Sandton Towers", city: "Johannesburg, 45,000 m²", epc: "A", energy: 98, carbon: 245, status: "Optimal", sc: C.green },
  { name: "Waterfront Plaza", city: "Cape Town, 32,000 m²", epc: "B", energy: 125, carbon: 312, status: "Good", sc: C.green },
  { name: "Midrand Industrial Park", city: "Midrand, 78,000 m²", epc: "C", energy: 178, carbon: 892, status: "Review", sc: C.amber },
  { name: "Umhlanga Business Centre", city: "Durban, 28,500 m²", epc: "B", energy: 115, carbon: 267, status: "Good", sc: C.green },
  { name: "Menlyn Corporate Park", city: "Pretoria, 52,000 m²", epc: "D", energy: 215, carbon: 1124, status: "Action Required", sc: C.coral },
];

const certs = [
  { name: "GRESB", score: "78/100", rating: "4-Star", status: "Submitted", color: C.green },
  { name: "TCFD", score: "Aligned", rating: "Full disclosure", status: "Published", color: C.blue },
  { name: "Green Star SA", score: "31 buildings", rating: "4-6 Star", status: "Active", color: C.green },
  { name: "NABERS SA", score: "Pilot", rating: "In progress", status: "2025", color: C.amber },
];

const actions = [
  { task: "Schedule HVAC audit — Menlyn Park", due: "Tomorrow", priority: "High", color: C.coral },
  { task: "Review LED retrofit proposal", due: "3 days", priority: "Med", color: C.amber },
  { task: "Update EPC certificates (3 buildings)", due: "1 week", priority: "Med", color: C.amber },
  { task: "Quarterly sustainability report", due: "2 weeks", priority: "High", color: C.coral },
];

const esgPillars = [
  { pillar: "Environmental", score: 78 },
  { pillar: "Social", score: 71 },
  { pillar: "Governance", score: 84 },
];

export default function SustainabilityDashboard() {
  return (
    <DashboardLayout role="Sustainability Manager" user="Lerato Ndlovu" initials="LN">
      <div style={{ padding: "28px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 3 }}>Sustainability & ESG Overview</h1>
            <p style={{ fontSize: 13, color: C.textSec }}>Growthpoint Properties · FY 2025/26 · Last updated: 5 min ago</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Export GRESB Report", "Download TCFD", "Set Alerts"].map(a => (
              <button key={a} style={{ padding: "9px 16px", background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontWeight: 500, color: C.textSec, cursor: "pointer" }}>{a}</button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          {kpis.map(k => (
            <div key={k.label} style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: k.dot }} />
                <span style={{ fontSize: 12, color: C.textSec, fontWeight: 500 }}>{k.label}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 5 }}>{k.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.green, marginBottom: 2 }}>{k.change}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* Carbon trajectory */}
          <div style={{ background: C.white, borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>Carbon Trajectory to Net Zero 2030</h3>
            <p style={{ fontSize: 12, color: C.textSec, marginBottom: 16 }}>tCO₂e · Actual vs science-based target</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={carbonTrajectory}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.coral} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.coral} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4EE" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke={C.coral} fill="url(#actualGrad)" strokeWidth={2} connectNulls={false} />
                <Area type="monotone" dataKey="target" name="Target" stroke={C.green} fill="url(#targetGrad)" strokeWidth={2} strokeDasharray="5 3" />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 16, height: 3, background: C.coral, borderRadius: 2 }} /><span style={{ fontSize: 11, color: C.textMuted }}>Actual</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 16, height: 3, background: C.green, borderRadius: 2 }} /><span style={{ fontSize: 11, color: C.textMuted }}>SBT Target</span></div>
            </div>
          </div>

          {/* ESG Pillars + Certifications */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14 }}>ESG Pillar Scores</h3>
              {esgPillars.map(e => (
                <div key={e.pillar} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: C.textSec }}>{e.pillar}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{e.score}</span>
                  </div>
                  <div style={{ height: 8, background: C.sageBg, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${e.score}%`, background: C.green, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Overall ESG</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.green }}>78 / 100</span>
              </div>
            </div>
            <div style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flex: 1 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>Reporting & Certifications</h3>
              {certs.map(cert => (
                <div key={cert.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, background: `${cert.color}20`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: cert.color }}>{cert.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{cert.name}</div>
                    <div style={{ fontSize: 11, color: C.textSec }}>{cert.rating}</div>
                  </div>
                  <span style={{ padding: "2px 8px", background: `${cert.color}20`, color: cert.color, fontSize: 10, fontWeight: 600, borderRadius: 20 }}>{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
          {/* Building performance table */}
          <div style={{ background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Building Performance</h3>
              <p style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>EPC ratings, energy intensity, carbon emissions</p>
            </div>
            <div style={{ padding: "10px 22px", background: "#FFF8E1", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span>⚠️</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#856404" }}>Critical Alert: Menlyn Corporate Park</div>
                <div style={{ fontSize: 11, color: "#856404" }}>Energy consumption 34% above benchmark. HVAC inefficiency detected. Immediate assessment recommended.</div>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Building", "EPC", "Energy (kWh/m²)", "Carbon (tCO₂e)", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buildings.map(b => (
                  <tr key={b.name} style={{ borderBottom: `1px solid ${C.sageBg}` }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{b.city}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ padding: "2px 8px", background: b.epc === "A" ? "#E8F5E9" : b.epc === "B" ? "#E3F2FD" : b.epc === "C" ? "#FFF8E1" : "#FFEBEE", color: b.epc === "A" ? "#2E7D32" : b.epc === "B" ? "#1565C0" : b.epc === "C" ? "#F57F17" : "#C62828", fontSize: 11, fontWeight: 700, borderRadius: 6 }}>{b.epc}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500 }}>{b.energy}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500 }}>{b.carbon.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ padding: "3px 10px", background: `${b.sc}20`, color: b.sc, fontSize: 11, fontWeight: 600, borderRadius: 20 }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action items */}
          <div style={{ background: C.white, borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 16 }}>Action Items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {actions.map(a => (
                <div key={a.task} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: C.sageBg, borderRadius: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{a.task}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Due: {a.due}</div>
                  </div>
                  <span style={{ padding: "2px 8px", background: `${a.color}20`, color: a.color, fontSize: 10, fontWeight: 600, borderRadius: 20, flexShrink: 0 }}>{a.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
