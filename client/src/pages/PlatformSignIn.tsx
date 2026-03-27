/**
 * PLATFORM SIGN-IN — Ongoing homepage for returning users
 * Clean, minimal sign-in page with role-selector tiles.
 * Design: Botanical system — Fraunces serif, DM Sans
 * Colors: Forest green #064E3B, linen #F7FAF7, white cards
 */
import { useState } from "react";
import { useLocation } from "wouter";

const F = "#064E3B";
const FL = "#065F46";
const SAGE_LT = "rgba(132,169,140,0.15)";
const LINEN = "#F7FAF7";
const WHITE = "#ffffff";
const INK = "#1A2E1E";
const MID = "#4A5E50";
const MUTED = "#7A9A82";
const CREAM3 = "#E4DDD0";

const serif = "'Fraunces', serif";
const sans = "'DM Sans', sans-serif";

const roles = [
  { id: "portfolio", label: "Portfolio Manager", icon: "📊", desc: "Portfolio overview, building performance, SAPOA benchmarks", path: "/dashboard/portfolio", color: "#064E3B" },
  { id: "cfo", label: "CFO", icon: "💹", desc: "Carbon tax liability, CapEx prioritisation, green premium", path: "/dashboard/cfo", color: "#1B4332" },
  { id: "sustainability", label: "Sustainability Manager", icon: "🌿", desc: "ESG scores, net zero trajectory, GRESB reporting", path: "/dashboard/sustainability", color: "#2D6A4F" },
  { id: "fm", label: "Facilities Manager", icon: "🔧", desc: "Work orders, equipment status, PPM schedules", path: "/dashboard/fm", color: "#40916C" },
  { id: "building", label: "Building Manager", icon: "🏢", desc: "Sandton Towers — systems, tenants, faults", path: "/dashboard/building", color: "#52796F" },
  { id: "tenant", label: "Tenant Admin", icon: "🏬", desc: "African Corp Holdings — energy, certifications, faults", path: "/dashboard/tenant", color: "#74C69D" },
];

export default function PlatformSignIn() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("songo@greenbdg.co.za");
  const [password, setPassword] = useState("GreenBDG@2026!");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<"roles" | "signin">("roles");

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep("signin");
  };

  const handleSignIn = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) navigate(role.path);
  };

  const selectedRoleObj = roles.find(r => r.id === selectedRole);

  return (
    <div style={{ minHeight: "100vh", background: LINEN, fontFamily: sans, color: INK, display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: WHITE, borderBottom: `1px solid ${SAGE_LT}`, padding: "0 48px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 34, height: 34, background: F, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9" /></svg>
          </div>
          <div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: F, display: "block", lineHeight: 1.2 }}>GreenBDG Africa</span>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace" }}>Platform</span>
          </div>
        </div>
        <a href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>← Back to website</a>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        {step === "roles" ? (
          <div style={{ width: "100%", maxWidth: 740 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 14 }}>Growthpoint Properties</div>
              <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", color: F, lineHeight: 1.15, marginBottom: 14 }}>Welcome back.<br />Who are you signing in as?</h1>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>Select your role to go to your personalised dashboard.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{
                    background: WHITE, borderRadius: 18, padding: "24px 20px",
                    border: `1.5px solid ${SAGE_LT}`, cursor: "pointer",
                    textAlign: "left", transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    fontFamily: sans,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = F; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(6,78,59,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = SAGE_LT; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{role.icon}</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: INK, marginBottom: 6, lineHeight: 1.3 }}>{role.label}</div>
                  <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{role.desc}</div>
                  <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: F, fontSize: 12, fontWeight: 600 }}>
                    Sign in <span>→</span>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontSize: 12, color: MUTED }}>
                New to GreenBDG? &nbsp;
                <button onClick={() => navigate("/setup")} style={{ color: F, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, fontFamily: sans, textDecoration: "underline" }}>Set up your organisation →</button>
              </p>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 420 }}>
            <button onClick={() => setStep("roles")} style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: sans, marginBottom: 32 }}>
              ← Back to roles
            </button>
            <div style={{ background: WHITE, borderRadius: 24, padding: "40px 36px", boxShadow: "0 8px 32px rgba(6,78,59,0.08)", border: `1px solid ${SAGE_LT}` }}>
              {/* Role badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, padding: "14px 16px", background: `${F}10`, borderRadius: 14 }}>
                <span style={{ fontSize: 24 }}>{selectedRoleObj?.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Signing in as</div>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: F }}>{selectedRoleObj?.label}</div>
                </div>
              </div>

              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 24, color: INK, marginBottom: 6 }}>Sign in</h2>
              <p style={{ fontSize: 13, color: MUTED, marginBottom: 28 }}>Growthpoint Properties · GreenBDG Platform</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: INK, marginBottom: 7 }}>Email address</label>
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${CREAM3}`, fontSize: 14, fontFamily: sans, color: INK, background: LINEN, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: INK, marginBottom: 7 }}>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${CREAM3}`, fontSize: 14, fontFamily: sans, color: INK, background: LINEN, boxSizing: "border-box" }} />
                </div>
                <button onClick={handleSignIn}
                  style={{ width: "100%", padding: "14px", background: F, color: "white", border: "none", borderRadius: 11, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans, marginTop: 4 }}
                  onMouseEnter={e => { e.currentTarget.style.background = FL; }}
                  onMouseLeave={e => { e.currentTarget.style.background = F; }}>
                  Sign in to {selectedRoleObj?.label} dashboard →
                </button>
              </div>

              <div style={{ marginTop: 20, padding: "14px 16px", background: LINEN, borderRadius: 10, border: `1px solid ${SAGE_LT}` }}>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>DEMO NOTE</div>
                <div style={{ fontSize: 12, color: MID, lineHeight: 1.6 }}>All credentials are pre-filled. Click "Sign in" to go directly to the {selectedRoleObj?.label} dashboard.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
