/**
 * Staff Upload & Role Assignment — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * 6 staff members: Amahle, Lerato, James, Sipho, Maria, David
 * Content kept exactly as source HTML
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Send, Mail } from "lucide-react";

const DEEP = "#002117";
const FOREST = "#064E3B";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const BORDER = "rgba(0,33,23,0.1)";
const MUTED = "#6B7280";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

const staff = [
  { name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", building: "Portfolio-wide", initials: "AD", accent: GOLD, dashPath: "/dashboard/cfo" },
  { name: "Lerato Ndlovu", email: "l.ndlovu@growthpoint.co.za", role: "Sustainability Manager", building: "Portfolio-wide", initials: "LN", accent: ACCENT, dashPath: "/dashboard/sustainability" },
  { name: "James Molefe", email: "j.molefe@growthpoint.co.za", role: "Portfolio Manager", building: "Portfolio-wide", initials: "JM", accent: FOREST, dashPath: "/dashboard/portfolio" },
  { name: "Sipho Khumalo", email: "s.khumalo@growthpoint.co.za", role: "Building Manager", building: "Sandton Towers", initials: "SK", accent: DEEP, dashPath: "/dashboard/building" },
  { name: "Maria Peters", email: "m.peters@growthpoint.co.za", role: "Facilities Manager", building: "Sandton Towers", initials: "MP", accent: "#1A8C6A", dashPath: "/dashboard/fm" },
  { name: "David Kgosi", email: "d.kgosi@africanholdings.co.za", role: "Tenant Admin", building: "African Corp Holdings", initials: "DK", accent: "#2DAF85", dashPath: "/dashboard/tenant" },
];

const roleAccess: Record<string, string[]> = {
  "CFO": ["Carbon tax liability", "CapEx modelling", "Green premiums", "Financial reporting"],
  "Sustainability Manager": ["ESG scores", "Carbon trajectory", "GRESB reporting", "Certifications"],
  "Portfolio Manager": ["Building benchmarks", "EPC compliance", "SAPOA comparison", "Performance alerts"],
  "Building Manager": ["Live systems", "Tenant management", "Fault tickets", "Compliance docs"],
  "Facilities Manager": ["Work orders", "PPM schedules", "Equipment status", "Contractor management"],
  "Tenant Admin": ["Energy usage", "Fault reporting", "Building certifications", "Lease documents"],
};

type Phase = "upload" | "assign" | "send";

export default function OnboardingStaff() {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<Phase>("assign");
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [allSent, setAllSent] = useState(false);

  const handleSendLinks = () => {
    setSending(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setSentCount(count);
      if (count >= staff.length) {
        clearInterval(interval);
        setAllSent(true);
        setTimeout(() => navigate("/onboarding/magic-link-sent"), 1200);
      }
    }, 400);
  };

  const phases = [
    { id: "upload" as Phase, label: "Upload CSV" },
    { id: "assign" as Phase, label: "Assign roles" },
    { id: "send" as Phase, label: "Send magic links" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: OFF_WHITE, fontFamily: sans, color: DEEP }}>
      {/* ── HEADER ── */}
      <header style={{
        background: DEEP, borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 40,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button onClick={() => navigate("/onboarding/buildings")} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.55)", background: "none", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
            <ArrowLeft size={14} /> Building upload
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
                <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
                <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
                <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: WHITE }}>GreenBDG Africa</span>
          </div>
        </div>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["Buildings", "Staff", "Go live"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 1 ? ACCENT : i === 0 ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: i === 1 ? DEEP : i === 0 ? ACCENT : "rgba(255,255,255,0.4)" }}>
                  {i === 0 ? "✓" : i + 1}
                </div>
                <span style={{ fontFamily: mono, fontSize: 11, color: i === 1 ? WHITE : i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: ACCENT, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: DEEP }}>SD</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)", fontFamily: sans }}>Songo Didiza</span>
        </div>
      </header>

      {/* ── PHASE TABS ── */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 40px" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {phases.map(p => (
            <button key={p.id} onClick={() => setPhase(p.id)} style={{
              padding: "16px 20px", background: "none",
              border: "none", borderBottom: phase === p.id ? `2.5px solid ${DEEP}` : "2.5px solid transparent",
              fontSize: 13, fontWeight: phase === p.id ? 600 : 400,
              color: phase === p.id ? DEEP : MUTED, cursor: "pointer", fontFamily: sans,
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 40px" }}>

        {/* ── UPLOAD PHASE ── */}
        {phase === "upload" && (
          <div>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 8 }}>Upload your team</h1>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32 }}>Upload a CSV with staff names, emails, and roles. GreenBDG will create accounts and send magic links.</p>
            <div style={{ background: WHITE, borderRadius: 16, border: `2px dashed ${BORDER}`, padding: "56px 40px", textAlign: "center", marginBottom: 24 }}>
              <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: DEEP, marginBottom: 8 }}>Drop your staff CSV here</h3>
              <p style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>or click to browse</p>
              <button onClick={() => setPhase("assign")} style={{ padding: "12px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Choose file
              </button>
            </div>
            <button onClick={() => setPhase("assign")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
              Simulate upload (6 staff) <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── ASSIGN PHASE ── */}
        {phase === "assign" && (
          <div>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 6 }}>Assign roles & access</h1>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32 }}>6 team members imported. Each role gives access to specific dashboards and data.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {staff.map(s => (
                <div key={s.name} style={{ background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "20px 24px", display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: WHITE, flexShrink: 0 }}>
                    {s.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: DEEP, marginBottom: 2 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{s.email} · {s.building}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ padding: "4px 12px", background: `${s.accent}18`, color: s.accent, fontSize: 12, fontWeight: 600, borderRadius: 20, fontFamily: mono }}>{s.role}</span>
                    <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {(roleAccess[s.role] || []).map(a => (
                        <span key={a} style={{ padding: "2px 8px", background: "rgba(0,33,23,0.06)", color: MUTED, fontSize: 10, borderRadius: 10, fontFamily: mono }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <button onClick={() => setPhase("send")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Continue to magic links <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── SEND PHASE ── */}
        {phase === "send" && (
          <div>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 6 }}>Send magic links</h1>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 28 }}>
              Each team member receives a personalised email with a secure magic link. They click it, verify their identity, set a password, and land directly in their dashboard.
            </p>
            {/* Info card */}
            <div style={{ background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { icon: "🔐", label: "Secure token", desc: "24-hour expiry, single-use" },
                  { icon: "📱", label: "OTP verification", desc: "SMS or email 6-digit code" },
                  { icon: "🎯", label: "Role-based landing", desc: "Direct to their dashboard" },
                ].map(f => (
                  <div key={f.label} style={{ textAlign: "center", padding: "12px 8px" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                    <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 13, color: DEEP, marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Staff rows */}
            <div style={{ background: WHITE, borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}`, marginBottom: 24 }}>
              {staff.map((s, i) => {
                const isSent = sentCount > i;
                return (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderBottom: i < staff.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: WHITE }}>
                      {s.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 13, color: DEEP }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: MUTED }}>{s.email}</div>
                    </div>
                    <span style={{ padding: "3px 10px", background: `${s.accent}18`, color: s.accent, fontSize: 11, fontWeight: 600, borderRadius: 20, fontFamily: mono }}>{s.role}</span>
                    <div style={{ width: 80, textAlign: "right" }}>
                      {sending ? (
                        isSent ? (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", color: ACCENT, fontSize: 12, fontWeight: 600 }}>
                            <CheckCircle2 size={14} /> Sent
                          </span>
                        ) : (
                          <span style={{ color: MUTED, fontSize: 12 }}>Queued…</span>
                        )
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", color: MUTED, fontSize: 12 }}>
                          <Mail size={13} /> Ready
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {!sending ? (
              <button
                onClick={handleSendLinks}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: sans }}
              >
                <Send size={16} />
                Send 6 magic links
              </button>
            ) : allSent ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "rgba(16,185,129,0.1)", borderRadius: 12, color: "#059669", fontWeight: 600, fontSize: 14, border: "1px solid rgba(16,185,129,0.2)" }}>
                <CheckCircle2 size={18} />
                All 6 magic links sent! Redirecting…
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: OFF_WHITE, borderRadius: 12, color: FOREST, fontWeight: 600, fontSize: 14, border: `1px solid ${BORDER}` }}>
                <div style={{ width: 18, height: 18, border: `2px solid ${ACCENT}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Sending… {sentCount}/{staff.length}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
