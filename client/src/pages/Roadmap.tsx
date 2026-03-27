/**
 * Roadmap — GreenBDG Africa Product Roadmap
 * Source: roadmap.html
 * Shows Phase 1 (Live), Phase 2, 3, 4 with quarterly milestones
 */
import { useLocation } from "wouter";

const C = {
  sageBg: "#E8EDE4", white: "#FFFFFF", green: "#5A9A6E", amber: "#E8A838",
  coral: "#E07A5F", blue: "#6B9BD1", text: "#2D3A2D", textSec: "#5A6B5A",
  textMuted: "#8A9A8A", border: "#D8E0D5", dark: "#002117",
};

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation & Compliance",
    period: "Q1–Q2 2025",
    status: "Live",
    statusColor: C.green,
    color: C.green,
    items: [
      "Building & staff onboarding via CSV upload",
      "Magic link authentication & role-based access",
      "EPC compliance tracking & expiry alerts",
      "Carbon tax liability calculator (SARS Act)",
      "CFO, Portfolio, Building Manager dashboards",
      "Tenant portal with 3-tap fault reporting",
    ],
  },
  {
    phase: "Phase 2",
    title: "Live Intelligence",
    period: "Q3–Q4 2025",
    status: "In Development",
    statusColor: C.amber,
    color: C.amber,
    items: [
      "BMS & IoT sensor integrations (BACnet, Modbus)",
      "Real-time energy & water monitoring",
      "Automated anomaly detection & alerts",
      "HVAC performance optimisation engine",
      "Predictive maintenance scheduling",
      "Mobile app for building managers & tenants",
    ],
  },
  {
    phase: "Phase 3",
    title: "ESG Reporting & Benchmarking",
    period: "Q1–Q2 2026",
    status: "Planned",
    statusColor: C.blue,
    color: C.blue,
    items: [
      "Automated GRESB data submission",
      "TCFD climate disclosure report generation",
      "SAPOA benchmarking integration",
      "Green Star & EDGE certification pipeline",
      "B-BBEE contractor tracking (Social ESG)",
      "Scope 3 emissions calculation engine",
    ],
  },
  {
    phase: "Phase 4",
    title: "AI & Advanced Analytics",
    period: "Q3–Q4 2026",
    status: "Roadmap",
    statusColor: C.textMuted,
    color: C.textMuted,
    items: [
      "AI-powered carbon reduction recommendations",
      "CapEx scenario modelling & ROI calculator",
      "Portfolio-level net zero pathway planning",
      "Automated utility bill reconciliation",
      "Tenant ESG scoring & green lease support",
      "API marketplace for third-party integrations",
    ],
  },
];

const metrics = [
  { value: "47", label: "Buildings onboarded", sub: "Across 4 provinces" },
  { value: "6", label: "User roles supported", sub: "CFO to Tenant" },
  { value: "94%", label: "EPC compliance rate", sub: "Portfolio average" },
  { value: "R2.4M", label: "Carbon tax tracked", sub: "FY 2025/26" },
];

export default function Roadmap() {
  const [, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: C.sageBg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      {/* Header */}
      <header style={{ background: C.white, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 100, height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 42, height: 42, background: C.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 700 }}>G</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>GreenBDG</div>
            <div style={{ fontSize: 11, color: C.textSec, letterSpacing: "0.15em", textTransform: "uppercase" }}>Africa</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 6 }}>
          {[
            { label: "CFO", path: "/dashboard/cfo" },
            { label: "Sustainability", path: "/dashboard/sustainability" },
            { label: "Portfolio", path: "/dashboard/portfolio" },
            { label: "Building", path: "/dashboard/building" },
            { label: "Facilities", path: "/dashboard/fm" },
            { label: "Tenant", path: "/dashboard/tenant" },
          ].map(n => (
            <button key={n.label} onClick={() => navigate(n.path)}
              style={{ padding: "8px 20px", borderRadius: 24, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", background: "transparent", color: C.textSec }}
              onMouseEnter={e => (e.currentTarget.style.background = C.sageBg)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >{n.label}</button>
          ))}
        </nav>
        <button onClick={() => navigate("/")} style={{ padding: "9px 20px", background: C.green, color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back to Home</button>
      </header>

      <div style={{ padding: "40px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.green, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Product Roadmap</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: C.text, marginBottom: 12 }}>GreenBDG Africa — 2025/26</h1>
          <p style={{ fontSize: 15, color: C.textSec, maxWidth: 600, lineHeight: 1.6 }}>
            Building the most comprehensive ESG intelligence platform for African real estate — from compliance foundation to AI-powered net zero planning.
          </p>
        </div>

        {/* Live metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: C.white, borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: C.text, marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Phase cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {phases.map(p => (
            <div key={p.phase} style={{ background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: p.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.phase}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 3 }}>{p.title}</h3>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{p.period}</div>
                </div>
                <span style={{ padding: "4px 12px", background: `${p.statusColor}20`, color: p.statusColor, fontSize: 11, fontWeight: 700, borderRadius: 20 }}>{p.status}</span>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.status === "Live" ? `${C.green}20` : C.sageBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {p.status === "Live" ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color }} />
                        )}
                      </div>
                      <span style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 40, background: C.dark, borderRadius: 20, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>Ready to get started?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 480 }}>
              Your GreenBDG implementation lead handles the full setup. Upload your building list and staff CSV, and your team is live in under 20 minutes.
            </p>
          </div>
          <button onClick={() => navigate("/signin")} style={{ padding: "14px 28px", background: C.green, color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Start your setup →
          </button>
        </div>
      </div>
    </div>
  );
}
