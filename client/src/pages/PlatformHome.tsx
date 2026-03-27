/**
 * PLATFORM HOME — First-time setup homepage (POST-PURCHASE)
 * Design: PLUSH system — deep forest green #002117, crisp white, Libre Baskerville serif
 * Shown to new clients after purchase, before buildings are loaded.
 * Journey: Welcome → Buildings → Team → View Portfolio
 */
import { useLocation } from "wouter";
import { Building2, Users, BarChart3, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const DEEP = "#002117";
const FOREST = "#064E3B";
const MID_GREEN = "#065F46";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const BORDER = "rgba(255,255,255,0.12)";
const MUTED_WHITE = "rgba(255,255,255,0.55)";
const SUBTLE = "rgba(255,255,255,0.08)";

const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

export default function PlatformHome() {
  const [, navigate] = useLocation();

  const steps = [
    {
      icon: Building2,
      num: "01",
      title: "Load your buildings",
      desc: "Upload a CSV or add buildings manually. 12 buildings, all required fields — takes about 20 minutes.",
      action: "Start building setup",
      path: "/onboarding/buildings",
      locked: false,
      stat: "12 buildings ready to load",
    },
    {
      icon: Users,
      num: "02",
      title: "Invite your team",
      desc: "Add your CFO, ESG Manager, Portfolio Manager, FM, and Building Managers. Each receives a secure magic link.",
      action: "Add team members",
      path: "/onboarding/staff",
      locked: false,
      stat: "6 roles to assign",
    },
    {
      icon: BarChart3,
      num: "03",
      title: "View your portfolio",
      desc: "Once buildings and team are set up, your live dashboards are ready. Portfolio, CFO, ESG — all live from day one.",
      action: "View portfolio dashboard",
      path: "/dashboard/portfolio",
      locked: true,
      stat: "Unlocks after step 2",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: DEEP, fontFamily: sans, color: WHITE }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(0,33,23,0.95)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, background: ACCENT, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }}>
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill={DEEP} opacity="0.95" />
            </svg>
          </div>
          <div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: WHITE, display: "block", lineHeight: 1.2 }}>GreenBDG Africa</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.14em" }}>Platform</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: WHITE }}>SD</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: WHITE, lineHeight: 1.2 }}>Songo Didiza</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: MUTED_WHITE }}>Admin · Growthpoint Properties</div>
          </div>
        </div>
      </header>

      {/* ── HERO WELCOME ── */}
      <section style={{
        padding: "80px 56px 60px",
        background: `linear-gradient(160deg, ${DEEP} 0%, ${FOREST} 100%)`,
        borderBottom: `1px solid ${BORDER}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Ghost watermark */}
        <div style={{
          position: "absolute", right: -30, top: -20,
          fontFamily: serif, fontSize: 220, fontWeight: 900,
          color: "rgba(255,255,255,0.025)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
        }}>LIVE</div>

        <div style={{ maxWidth: 720, position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`, borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <Sparkles size={13} color={ACCENT} />
            <span style={{ fontFamily: mono, fontSize: 11, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.12em" }}>Account activated</span>
          </div>
          <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(36px,5vw,58px)", color: WHITE, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Welcome to GreenBDG,<br />
            <em style={{ fontWeight: 400, color: ACCENT }}>Growthpoint Properties.</em>
          </h1>
          <p style={{ fontSize: 16, color: MUTED_WHITE, lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
            You're two steps away from live ESG dashboards, carbon tracking, and FM operations across your entire portfolio. Let's get you set up.
          </p>

          {/* Progress indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 3, background: SUBTLE, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: "5%", height: "100%", background: ACCENT, borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, whiteSpace: "nowrap" }}>0 / 2 steps complete</span>
          </div>
        </div>
      </section>

      {/* ── SETUP STEPS ── */}
      <section style={{ padding: "60px 56px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 28 }}>Setup checklist</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} style={{
                background: step.locked ? SUBTLE : "rgba(255,255,255,0.06)",
                border: `1px solid ${step.locked ? BORDER : "rgba(255,255,255,0.15)"}`,
                borderRadius: 20, padding: "28px 32px",
                display: "flex", alignItems: "center", gap: 28,
                opacity: step.locked ? 0.5 : 1,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (!step.locked) { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; } }}
                onMouseLeave={e => { if (!step.locked) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; } }}
              >
                {/* Step number + icon */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE }}>{step.num}</div>
                  <div style={{ width: 52, height: 52, background: step.locked ? SUBTLE : `${ACCENT}20`, border: `1px solid ${step.locked ? BORDER : `${ACCENT}40`}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} color={step.locked ? MUTED_WHITE : ACCENT} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: WHITE, lineHeight: 1.2 }}>{step.title}</span>
                    {step.locked && (
                      <span style={{ padding: "2px 10px", background: SUBTLE, border: `1px solid ${BORDER}`, color: MUTED_WHITE, fontSize: 11, fontWeight: 500, borderRadius: 20, fontFamily: mono }}>
                        Unlocks after step 2
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: MUTED_WHITE, lineHeight: 1.7, marginBottom: 0 }}>{step.desc}</p>
                  <div style={{ marginTop: 8, fontFamily: mono, fontSize: 11, color: step.locked ? MUTED_WHITE : ACCENT }}>{step.stat}</div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => !step.locked && navigate(step.path)}
                  disabled={step.locked}
                  style={{
                    flexShrink: 0,
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 24px", borderRadius: 24,
                    background: step.locked ? SUBTLE : ACCENT,
                    color: step.locked ? MUTED_WHITE : DEEP,
                    border: `1px solid ${step.locked ? BORDER : ACCENT}`,
                    fontSize: 13, fontWeight: 700,
                    cursor: step.locked ? "not-allowed" : "pointer",
                    fontFamily: sans, transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.action} {!step.locked && <ArrowRight size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <section style={{ padding: "0 56px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "36px 40px" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 28 }}>After setup — what goes live</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { icon: "📊", title: "Portfolio dashboard goes live", desc: "Your CFO, ESG Manager, and Portfolio Manager can sign in immediately via their magic links." },
              { icon: "✉️", title: "Magic links sent to your team", desc: "Each person receives a personalised email with a secure one-click sign-in. No passwords to set up manually." },
              { icon: "🏢", title: "Building dashboards activated", desc: "Sandton Towers, Rosebank Square, and all your buildings get individual FM and building manager dashboards." },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: WHITE, marginBottom: 8, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MUTED_WHITE, lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO JUMP ── */}
      <section style={{ padding: "0 56px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 40 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20 }}>Demo — jump to any dashboard</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Portfolio Dashboard", path: "/dashboard/portfolio" },
              { label: "CFO Dashboard", path: "/dashboard/cfo" },
              { label: "Sustainability", path: "/dashboard/sustainability" },
              { label: "Facilities Manager", path: "/dashboard/fm" },
              { label: "Building Manager", path: "/dashboard/building" },
              { label: "Tenant Portal", path: "/dashboard/tenant" },
            ].map(d => (
              <button key={d.label} onClick={() => navigate(d.path)}
                style={{
                  padding: "9px 20px", background: SUBTLE, color: WHITE,
                  border: `1px solid ${BORDER}`, borderRadius: 22,
                  fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: sans,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = SUBTLE; e.currentTarget.style.borderColor = BORDER; }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
