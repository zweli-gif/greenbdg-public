/**
 * PLATFORM HOME — First-time setup homepage
 * Shown to new clients after purchase, before any buildings are loaded.
 * Design: Botanical system — Fraunces serif, DM Sans, linen background #F7FAF7
 * Journey: Welcome → Start setup (buildings + team) → View portfolio
 * Ongoing: After setup complete, this route shows the sign-in homepage instead
 */
import { useLocation } from "wouter";
import { CheckCircle2, Building2, Users, BarChart3, ArrowRight, Sparkles } from "lucide-react";

const F = "#064E3B";
const FL = "#065F46";
const FXL = "#52796F";
const SAGE = "#84A98C";
const SAGE_LT = "rgba(132,169,140,0.15)";
const LINEN = "#F7FAF7";
const WHITE = "#ffffff";
const INK = "#1A2E1E";
const MID = "#4A5E50";
const MUTED = "#7A9A82";

const serif = "'Fraunces', serif";
const sans = "'DM Sans', sans-serif";

export default function PlatformHome() {
  const [, navigate] = useLocation();

  const setupSteps = [
    { icon: Building2, title: "Add your buildings", desc: "Upload a CSV or add buildings one by one. Takes 20 minutes for a 50-building portfolio.", action: "Start building setup", path: "/onboarding/buildings", done: false },
    { icon: Users, title: "Invite your team", desc: "Add your CFO, ESG Manager, Portfolio Manager, FM, and Tenant Admins. Each gets a magic link.", action: "Add team members", path: "/onboarding/staff", done: false },
    { icon: BarChart3, title: "View your portfolio", desc: "Once buildings and team are set up, your live dashboards are ready.", action: "View portfolio", path: "/dashboard/portfolio", done: false, locked: true },
  ];

  return (
    <div style={{ minHeight: "100vh", background: LINEN, fontFamily: sans, color: INK }}>

      {/* Header */}
      <header style={{ background: WHITE, borderBottom: `1px solid ${SAGE_LT}`, padding: "0 48px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, background: F, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9" /></svg>
          </div>
          <div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: F, display: "block", lineHeight: 1.2 }}>GreenBDG Africa</span>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace" }}>Platform</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: `${F}20`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: F }}>SD</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Songo Didiza</span>
          <span style={{ padding: "3px 10px", background: `${F}15`, color: F, fontSize: 11, fontWeight: 600, borderRadius: 20, marginLeft: 4 }}>Admin</span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px" }}>

        {/* Welcome banner */}
        <div style={{ background: F, borderRadius: 24, padding: "48px 52px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
          {/* Decorative ghost text */}
          <div style={{ position: "absolute", right: -20, bottom: -40, fontFamily: serif, fontSize: 160, fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>LIVE</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <Sparkles size={13} color="rgba(255,255,255,0.8)" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Welcome to GreenBDG</span>
          </div>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", color: "white", lineHeight: 1.15, marginBottom: 16 }}>
            Let's set up<br />Growthpoint Properties.
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
            You're two steps away from live ESG dashboards, carbon tracking, and FM operations for your entire portfolio. This takes about 30 minutes.
          </p>
          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
              <div style={{ width: "5%", height: "100%", background: "rgba(255,255,255,0.6)", borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>0 of 2 steps complete</span>
          </div>
        </div>

        {/* Setup steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
          {setupSteps.map((step, i) => {
            const Icon = step.icon;
            const isLocked = step.locked;
            return (
              <div key={i} style={{
                background: WHITE, borderRadius: 20, padding: "28px 32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                border: `1px solid ${isLocked ? "rgba(132,169,140,0.1)" : SAGE_LT}`,
                opacity: isLocked ? 0.55 : 1,
                display: "flex", alignItems: "center", gap: 24,
              }}>
                <div style={{ width: 52, height: 52, background: isLocked ? `rgba(132,169,140,0.1)` : `${F}15`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color={isLocked ? MUTED : F} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 17, color: isLocked ? MUTED : INK }}>{step.title}</span>
                    {isLocked && <span style={{ padding: "2px 10px", background: "rgba(132,169,140,0.1)", color: MUTED, fontSize: 11, fontWeight: 600, borderRadius: 20 }}>Unlocks after step 2</span>}
                  </div>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 0 }}>{step.desc}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: MUTED }}>Step {i + 1}</div>
                  <button
                    onClick={() => !isLocked && navigate(step.path)}
                    disabled={isLocked}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 22,
                      background: isLocked ? "rgba(132,169,140,0.1)" : F,
                      color: isLocked ? MUTED : "white",
                      border: "none", fontSize: 13, fontWeight: 600,
                      cursor: isLocked ? "not-allowed" : "pointer",
                      fontFamily: sans, transition: "all 0.2s",
                    }}
                  >
                    {step.action} {!isLocked && <ArrowRight size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* What happens next */}
        <div style={{ background: WHITE, borderRadius: 20, padding: "32px 36px", border: `1px solid ${SAGE_LT}` }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>What happens after setup</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "📊", title: "Portfolio dashboard goes live", desc: "Your CFO, ESG Manager, and Portfolio Manager can log in immediately." },
              { icon: "✉️", title: "Team receives magic links", desc: "Each person gets a personalised email with a secure one-click sign-in link." },
              { icon: "🏢", title: "Building managers get their view", desc: "Sandton Towers, Rosebank Square, and all your buildings get individual dashboards." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: INK, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skip to demo */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}>Already set up? Jump straight to a dashboard.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Portfolio", path: "/dashboard/portfolio" },
              { label: "CFO", path: "/dashboard/cfo" },
              { label: "Sustainability", path: "/dashboard/sustainability" },
              { label: "FM", path: "/dashboard/fm" },
              { label: "Building Manager", path: "/dashboard/building" },
              { label: "Tenant Portal", path: "/dashboard/tenant" },
            ].map(d => (
              <button key={d.label} onClick={() => navigate(d.path)}
                style={{ padding: "8px 18px", background: "white", color: F, border: `1.5px solid ${SAGE_LT}`, borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
