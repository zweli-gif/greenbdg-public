/**
 * PLATFORM SIGN-IN — Ongoing homepage for returning users
 * Design: PLUSH system — deep forest green #002117, crisp white, Libre Baskerville
 * Role-tile selector → pre-filled sign-in → role dashboard
 */
import { useState } from "react";
import { useLocation } from "wouter";

const DEEP = "#002117";
const FOREST = "#064E3B";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const BORDER = "rgba(255,255,255,0.12)";
const MUTED_WHITE = "rgba(255,255,255,0.55)";
const SUBTLE = "rgba(255,255,255,0.06)";
const CARD_BG = "rgba(255,255,255,0.07)";
const CARD_HOVER = "rgba(255,255,255,0.12)";

const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

const roles = [
  {
    id: "portfolio",
    icon: "📊",
    label: "Portfolio Manager",
    name: "Richard Patel",
    desc: "47 buildings · SAPOA benchmarks · EPC heat map",
    path: "/dashboard/portfolio",
    alert: null,
  },
  {
    id: "cfo",
    icon: "💹",
    label: "CFO",
    name: "Amahle Dube",
    desc: "Carbon tax R2.4M · CapEx prioritisation · Green premium",
    path: "/dashboard/cfo",
    alert: "2 alerts",
  },
  {
    id: "sustainability",
    icon: "🌿",
    label: "Sustainability Manager",
    name: "Nomsa Khumalo",
    desc: "ESG score 68/100 · Net zero 2030 · GRESB reporting",
    path: "/dashboard/sustainability",
    alert: null,
  },
  {
    id: "fm",
    icon: "🔧",
    label: "Facilities Manager",
    name: "Sipho Khumalo",
    desc: "6 open tickets · 2 critical · PPM schedules",
    path: "/dashboard/fm",
    alert: "6 tickets",
  },
  {
    id: "building",
    icon: "🏢",
    label: "Building Manager",
    name: "Nkosi Dlamini",
    desc: "Sandton Towers · Systems · Tenants · Faults",
    path: "/dashboard/building",
    alert: "1 fault",
  },
  {
    id: "tenant",
    icon: "🏬",
    label: "Tenant Admin",
    name: "African Corp Holdings",
    desc: "Floor 12–14 · Energy usage · Certifications",
    path: "/dashboard/tenant",
    alert: null,
  },
];

export default function PlatformSignIn() {
  const [, navigate] = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("songo@growthpoint.co.za");
  const [password, setPassword] = useState("GreenBDG@2026!");
  const [step, setStep] = useState<"roles" | "signin">("roles");

  const selectedRoleObj = roles.find(r => r.id === selectedRole);

  const handleRoleSelect = (id: string) => {
    setSelectedRole(id);
    setStep("signin");
  };

  const handleSignIn = () => {
    if (selectedRoleObj) navigate(selectedRoleObj.path);
  };

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
        <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE }}>Client platform</div>
      </header>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 68px)", padding: "48px 24px" }}>

        {step === "roles" ? (
          <div style={{ width: "100%", maxWidth: 820 }}>
            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16 }}>Growthpoint Properties</div>
              <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px,4.5vw,48px)", color: WHITE, lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.02em" }}>
                Welcome back.<br />
                <em style={{ fontWeight: 400, color: ACCENT }}>Who are you today?</em>
              </h1>
              <p style={{ fontSize: 15, color: MUTED_WHITE, lineHeight: 1.7 }}>Select your role to go straight to your personalised dashboard.</p>
            </div>

            {/* Role tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{
                    background: CARD_BG, border: `1px solid ${BORDER}`,
                    borderRadius: 20, padding: "24px 22px",
                    textAlign: "left", cursor: "pointer",
                    transition: "all 0.2s", fontFamily: sans,
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = CARD_HOVER;
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = CARD_BG;
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Alert badge */}
                  {role.alert && (
                    <div style={{
                      position: "absolute", top: 14, right: 14,
                      background: GOLD, color: DEEP,
                      fontFamily: mono, fontSize: 10, fontWeight: 700,
                      padding: "2px 9px", borderRadius: 20,
                    }}>
                      {role.alert}
                    </div>
                  )}
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{role.icon}</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 16, color: WHITE, marginBottom: 4, lineHeight: 1.25 }}>{role.label}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: ACCENT, marginBottom: 10 }}>{role.name}</div>
                  <div style={{ fontSize: 12, color: MUTED_WHITE, lineHeight: 1.65 }}>{role.desc}</div>
                  <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, color: ACCENT, fontSize: 12, fontWeight: 600 }}>
                    Sign in <span style={{ fontSize: 14 }}>→</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Announcements strip */}
            <div style={{ marginTop: 32, padding: "18px 24px", background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: 14, display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: GOLD, textTransform: "uppercase", letterSpacing: "0.12em", flexShrink: 0, marginTop: 2 }}>Announcements</div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  "Q1 2025 ESG report due 15 April — Nomsa has started the draft.",
                  "Sandton Towers EPC certificate expires in 47 days.",
                  "Carbon Budget Act compliance deadline: 30 June 2025.",
                ].map((ann, i) => (
                  <span key={i} style={{ fontSize: 12, color: MUTED_WHITE, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: GOLD, flexShrink: 0, display: "inline-block" }} />
                    {ann}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button onClick={() => navigate("/platform")}
                style={{ background: "none", border: "none", color: MUTED_WHITE, fontSize: 13, cursor: "pointer", fontFamily: sans, textDecoration: "underline" }}>
                First time here? Set up your organisation →
              </button>
            </div>
          </div>
        ) : (
          /* Sign-in form */
          <div style={{ width: "100%", maxWidth: 400 }}>
            <button onClick={() => setStep("roles")}
              style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED_WHITE, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: sans, marginBottom: 28 }}>
              ← Back to roles
            </button>

            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "40px 36px" }}>
              {/* Role badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, padding: "14px 16px", background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
                <span style={{ fontSize: 26 }}>{selectedRoleObj?.icon}</span>
                <div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Signing in as</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: WHITE }}>{selectedRoleObj?.label}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: ACCENT }}>{selectedRoleObj?.name}</div>
                </div>
              </div>

              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 26, color: WHITE, marginBottom: 6 }}>Sign in</h2>
              <p style={{ fontSize: 13, color: MUTED_WHITE, marginBottom: 28 }}>Growthpoint Properties · GreenBDG Platform</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}>Email address</label>
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 14, fontFamily: sans, color: WHITE, background: SUBTLE, boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 14, fontFamily: sans, color: WHITE, background: SUBTLE, boxSizing: "border-box", outline: "none" }} />
                </div>
                <button onClick={handleSignIn}
                  style={{ width: "100%", padding: "14px", background: ACCENT, color: DEEP, border: "none", borderRadius: 11, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: sans, marginTop: 4, letterSpacing: "0.01em" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                  Sign in → {selectedRoleObj?.label} dashboard
                </button>
              </div>

              <div style={{ marginTop: 20, padding: "14px 16px", background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: 10 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Demo note</div>
                <div style={{ fontSize: 12, color: MUTED_WHITE, lineHeight: 1.6 }}>Credentials are pre-filled. Click "Sign in" to go directly to the {selectedRoleObj?.label} dashboard.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
