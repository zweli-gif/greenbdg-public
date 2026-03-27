/**
 * CFO Dashboard — Operational design system
 * Amahle Dube · Growthpoint Properties · FY 2025/26
 * Source: cfo-dashboard.html
 * KPIs: Carbon Tax R2.4M, Portfolio R4.2B, NOI R312M, EPC 94%
 */
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const C = {
  sageBg: "#F0F5F2",
  white: "#FFFFFF",
  green: "#10B981",
  amber: "#E8A838",
  coral: "#EF4444",
  text: "#002117",
  textSec: "#4B5563",
  textMuted: "#9CA3AF",
  border: "rgba(0,33,23,0.1)",
  serif: "'Libre Baskerville', Georgia, serif",
  sans: "'Work Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

const kpis = [
  { dot: C.coral, label: "Carbon Tax Liability", value: "R2.4M", change: "+12% vs last year", sub: "15,420 tCO₂e", up: true },
  { dot: C.green, label: "Portfolio Value", value: "R4.2B", change: "+3.2% YTD", sub: "Net Book Value", up: false },
  { dot: C.green, label: "Net Operating Income", value: "R312M", change: "+8.5% YoY", sub: "Annual run rate", up: false },
  { dot: C.amber, label: "EPC Compliance", value: "94%", change: "3 expiring <90 days", sub: "49/52 buildings", up: true },
];

const carbonData = [
  { name: "135 Rivonia", value: 2850, pct: 100, color: C.coral },
  { name: "The Marc", value: 2120, pct: 74, color: C.coral },
  { name: "Alice Lane", value: 1890, pct: 66, color: C.amber },
  { name: "Sandton Sun", value: 1650, pct: 58, color: C.amber },
  { name: "Waterfall", value: 1420, pct: 50, color: C.amber },
  { name: "Gateway Ind.", value: 1280, pct: 45, color: C.amber },
  { name: "Cape Quarter", value: 980, pct: 34, color: C.green },
  { name: "Lakefield", value: 850, pct: 30, color: C.green },
  { name: "Menlyn Maine", value: 720, pct: 25, color: C.green },
  { name: "Other 42", value: 2660, pct: 93, color: C.coral },
];

const depData = [
  { year: "'22", v: 5.2 },
  { year: "'23", v: 5.0 },
  { year: "'24", v: 4.8 },
  { year: "'25", v: 4.5 },
  { year: "'26", v: 4.2 },
];

const insights = [
  { color: C.coral, text: "3 buildings exceed carbon intensity target by >20% — consider energy audits" },
  { color: C.amber, text: "EPC renewals due in Q2: Budget R450K for 12 buildings" },
  { color: C.green, text: "Energy costs trending down: -8% vs forecast due to efficiency programs" },
  { color: C.amber, text: "2 assets flagged for impairment review — Lakefield & Cape Quarter" },
];

export default function CFODashboard() {
  return (
    <DashboardLayout role="CFO" user="Amahle Dube" initials="AD" accentColor="#E8A838">
      <div style={{ padding: "32px 40px", maxWidth: 1400, margin: "0 auto", fontFamily: C.sans }}>
        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 3, fontFamily: C.serif }}>Financial ESG Overview</h1>
            <p style={{ fontSize: 13, color: C.textSec }}>Growthpoint Properties · FY 2025/26 · Last updated: 2 min ago</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Export Report", "Schedule Review", "Set Alerts"].map(a => (
              <button key={a} style={{ padding: "9px 16px", background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontWeight: 500, color: C.textSec, cursor: "pointer" }}>{a}</button>
            ))}
          </div>
        </div>

        {/* KPI grid */}
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
              <div style={{ fontSize: 12, fontWeight: 600, color: k.up ? C.coral : C.green, marginBottom: 2 }}>{k.change}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.85fr 0.85fr", gap: 16 }}>

          {/* Carbon Tax Breakdown */}
          <div style={{ background: C.white, borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: C.serif }}>Carbon Tax Breakdown</h3>
              <p style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Top 10 emitters by building (tCO₂e)</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
              {carbonData.map(b => (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 88, fontSize: 11, color: C.textSec, flexShrink: 0 }}>{b.name}</span>
                  <div style={{ flex: 1, height: 20, background: C.sageBg, borderRadius: 5, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${b.pct}%`, background: b.color, borderRadius: 5 }} />
                  </div>
                  <span style={{ width: 38, fontSize: 11, fontWeight: 600, textAlign: "right", color: C.text }}>{b.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.sageBg, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Tax Calculation</div>
              {[{ l: "Total Emissions", v: "15,420 tCO₂e" }, { l: "Tax Rate (SARS)", v: "R156 / tCO₂e" }].map(r => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textSec, marginBottom: 5 }}>
                  <span>{r.l}</span><span>{r.v}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
                <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estimated Tax</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.coral }}>R2,405,520</div>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Depreciation */}
            <div style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flex: 1 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14, fontFamily: C.serif }}>Asset Depreciation</h3>
              {[
                { l: "Gross Asset Value", v: "R5.8B", c: C.text },
                { l: "Accumulated Depreciation", v: "-R1.6B", c: C.coral },
                { l: "Net Book Value", v: "R4.2B", c: C.text },
              ].map(d => (
                <div key={d.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.sageBg}` }}>
                  <span style={{ fontSize: 12, color: C.textSec }}>{d.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: d.c }}>{d.v}</span>
                </div>
              ))}
              <div style={{ height: 60, marginTop: 12 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={depData} barSize={16}>
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: C.textMuted }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 6]} />
                    <Bar dataKey="v" fill={C.green} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Income Statement */}
            <div style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", flex: 1 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14, fontFamily: C.serif }}>Income Statement (YTD)</h3>
              {[
                { l: "Gross Rental Income", v: "R298M", c: C.green },
                { l: "Operating Expenses", v: "-R104M", c: C.coral },
                { l: "Net Operating Income", v: "R194M", c: C.text },
              ].map(i => (
                <div key={i.l} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: `1px solid ${C.sageBg}` }}>
                  <span style={{ fontSize: 12, color: C.textSec }}>{i.l}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: i.c }}>{i.v}</span>
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, color: C.textSec, marginBottom: 5 }}>Expense Ratio</div>
                <div style={{ height: 10, background: C.sageBg, borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "34.9%", background: C.green, borderRadius: 5 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>34.9%</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>Target: &lt;35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16, fontFamily: C.serif }}>AI Insights</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
              {insights.map((ins, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ins.color, marginTop: 4, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: C.textSec, lineHeight: 1.55 }}>{ins.text}</p>
                </div>
              ))}
            </div>
            <div style={{ background: C.sageBg, borderRadius: 10, padding: "11px 14px", cursor: "text" }}>
              <p style={{ fontSize: 13, color: C.textMuted }}>Ask about your portfolio…</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
