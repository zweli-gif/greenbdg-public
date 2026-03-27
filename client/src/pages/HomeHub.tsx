/**
 * GreenBDG Africa — Post-Purchase Home Hub — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * Every user lands here after setting their password
 * Shows: company welcome, 6 role tiles, announcements panel
 */
import { useLocation } from "wouter";
import { ArrowRight, Bell, TrendingUp, Building2, Leaf, BarChart3, Wrench, Home } from "lucide-react";

const DEEP = "#002117";
const FOREST = "#064E3B";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const CLAY = "#DF795F";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const BORDER = "rgba(0,33,23,0.1)";
const MUTED = "#6B7280";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

const roles = [
  {
    id: "cfo",
    title: "Chief Financial Officer",
    subtitle: "Executive · Finance",
    desc: "Carbon tax liability, green premiums, CapEx scenario modelling and income statement impact across your portfolio.",
    path: "/dashboard/cfo",
    accent: GOLD,
    bg: "#FFF8E8",
    icon: <TrendingUp size={20} />,
    access: "CFO · Executive team",
  },
  {
    id: "sustainability",
    title: "Sustainability Manager",
    subtitle: "ESG · Reporting",
    desc: "Portfolio ESG scores, carbon trajectory to net zero 2030, and automated GRESB / TCFD reporting.",
    path: "/dashboard/sustainability",
    accent: "#2DAF85",
    bg: "#E8F8F2",
    icon: <Leaf size={20} />,
    access: "ESG Manager · Sustainability team",
  },
  {
    id: "portfolio",
    title: "Portfolio Manager",
    subtitle: "Asset Management",
    desc: "Building performance vs SAPOA benchmarks, EPC compliance heat map, and portfolio-wide risk flags.",
    path: "/dashboard/portfolio",
    accent: "#0A6B4F",
    bg: "#E8F4EE",
    icon: <BarChart3 size={20} />,
    access: "Portfolio Manager · Asset team",
  },
  {
    id: "building",
    title: "Building Manager",
    subtitle: "Operations",
    desc: "Live systems monitoring, tenant management, fault tickets, and compliance tracking for your building.",
    path: "/dashboard/building",
    accent: FOREST,
    bg: "#E8F0EC",
    icon: <Building2 size={20} />,
    access: "Building Manager · Site team",
  },
  {
    id: "fm",
    title: "Facilities Manager",
    subtitle: "Maintenance",
    desc: "Critical work orders, PPM schedules, contractor management, and equipment status across your buildings.",
    path: "/dashboard/fm",
    accent: "#1A8C6A",
    bg: "#EAF6F2",
    icon: <Wrench size={20} />,
    access: "Facilities Manager · FM team",
  },
  {
    id: "tenant",
    title: "Tenant Admin",
    subtitle: "Tenant Portal",
    desc: "Floor-level energy usage, 3-tap fault reporting, building certifications and lease documentation.",
    path: "/dashboard/tenant",
    accent: "#2DAF85",
    bg: "#E8F8F2",
    icon: <Home size={20} />,
    access: "Tenant Admin · Occupier",
  },
];

const announcements = [
  { date: "27 Mar 2026", tag: "Platform", title: "Carbon Tax rate updated to R236/tCO₂e", body: "SARS has confirmed the 2026 carbon tax rate. All liability calculations have been updated automatically." },
  { date: "20 Mar 2026", tag: "Compliance", title: "SANS 1544 EPC renewal deadline: 3 buildings", body: "Sandton Towers, Rosebank Square, and Menlyn Park have EPC certificates expiring within 60 days." },
  { date: "15 Mar 2026", tag: "Feature", title: "GRESB 2026 submission window now open", body: "The platform has pre-populated 70% of your GRESB submission from operational data. Review and submit by 30 June." },
];

export default function HomeHub() {
  const [, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: OFF_WHITE, fontFamily: sans, color: DEEP }}>
      {/* ── TOP BAR ── */}
      <header style={{ background: DEEP, borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
              <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
              <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
              <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
              <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: WHITE }}>GreenBDG Africa</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginLeft: 8 }}>· Growthpoint Properties</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <Bell size={18} color="rgba(255,255,255,0.55)" />
            <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: CLAY, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: WHITE, fontSize: 9, fontWeight: 700 }}>3</span>
            </div>
          </div>
          <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: DEEP }}>GP</div>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

          {/* ── MAIN: role tiles ── */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Welcome back</div>
              <h1 style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: DEEP, marginBottom: 8, lineHeight: 1.2 }}>Growthpoint Properties</h1>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>Select your role to access your personalised dashboard.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => navigate(r.path)}
                  style={{ background: WHITE, border: `1px solid ${BORDER}`, padding: 24, textAlign: "left", borderRadius: 12, cursor: "pointer", transition: "all 0.25s", fontFamily: sans }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = FOREST; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,33,23,0.1)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ width: 42, height: 42, background: r.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: r.accent }}>
                      {r.icon}
                    </div>
                    <ArrowRight size={15} color={BORDER} />
                  </div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: DEEP, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: r.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{r.subtitle}</div>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 14 }}>{r.desc}</p>
                  <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(0,33,23,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.access}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div>
            {/* Announcements */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Bell size={15} color={FOREST} />
                <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: DEEP }}>Announcements</span>
                <div style={{ marginLeft: "auto", width: 20, height: 20, background: CLAY, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>3</span>
                </div>
              </div>
              <div>
                {announcements.map((a, i) => (
                  <div key={i} style={{ paddingBottom: 18, marginBottom: i < announcements.length - 1 ? 18 : 0, borderBottom: i < announcements.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontFamily: mono, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        background: a.tag === "Compliance" ? "#FFF4E0" : a.tag === "Feature" ? "#E8F8F2" : "rgba(0,33,23,0.06)",
                        color: a.tag === "Compliance" ? "#B07A10" : a.tag === "Feature" ? "#2DAF85" : FOREST,
                      }}>{a.tag}</span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: MUTED }}>{a.date}</span>
                    </div>
                    <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 13, color: DEEP, marginBottom: 4 }}>{a.title}</div>
                    <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65 }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ background: DEEP, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Portfolio at a glance</div>
              {[
                { label: "Buildings active", value: "47" },
                { label: "Team members", value: "6" },
                { label: "EPC alerts", value: "3", alert: true },
                { label: "Open fault tickets", value: "12" },
              ].map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: sans }}>{s.label}</span>
                  <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, color: s.alert ? CLAY : WHITE }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
