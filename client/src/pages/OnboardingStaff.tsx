/**
 * Staff Upload & Role Assignment — Botanical design system
 * 6 staff members from source HTML: Thabo, Lerato, James, Sipho, Maria, David
 * Roles: CFO, Sustainability Mgr, Portfolio Mgr, Building Mgr, FM, Tenant Admin
 * Animated magic link send button
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, Users, Send, Mail } from "lucide-react";

const staff = [
  { name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", building: "Portfolio-wide", initials: "AD", accent: "#E8A838", dashPath: "/dashboard/cfo" },
  { name: "Lerato Ndlovu", email: "l.ndlovu@growthpoint.co.za", role: "Sustainability Manager", building: "Portfolio-wide", initials: "LN", accent: "#2DAF85", dashPath: "/dashboard/sustainability" },
  { name: "James Molefe", email: "j.molefe@growthpoint.co.za", role: "Portfolio Manager", building: "Portfolio-wide", initials: "JM", accent: "#0A6B4F", dashPath: "/dashboard/portfolio" },
  { name: "Sipho Khumalo", email: "s.khumalo@growthpoint.co.za", role: "Building Manager", building: "Sandton Towers", initials: "SK", accent: "#064E3B", dashPath: "/dashboard/building" },
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
  const [phase, setPhase] = useState<Phase>("upload");
  const [uploaded, setUploaded] = useState(false);
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

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif", color: "#354F52" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid rgba(132,169,140,0.15)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/onboarding/buildings")} style={{ display: "flex", alignItems: "center", gap: 6, color: "#52796F", background: "none", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <ArrowLeft size={14} /> Building upload
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(132,169,140,0.2)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#52796F", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>GreenBDG Africa</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "rgba(132,169,140,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#52796F" }}>SD</div>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Songo Didiza</span>
        </div>
      </header>

      {/* Progress steps */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(132,169,140,0.15)", padding: "0 32px" }}>
        <div style={{ display: "flex", maxWidth: 900, margin: "0 auto" }}>
          {([
            { id: "upload" as Phase, label: "📤  Upload CSV" },
            { id: "assign" as Phase, label: "🎯  Assign roles" },
            { id: "send" as Phase, label: "✉️  Send magic links" },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => { if (uploaded || t.id === "upload") setPhase(t.id); }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "14px 20px", fontSize: 13, fontWeight: 500,
                color: phase === t.id ? "#354F52" : "#84A98C",
                background: "none",
                borderBottom: phase === t.id ? "2px solid #52796F" : "2px solid transparent",
                cursor: "pointer", transition: "color 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── UPLOAD PHASE ── */}
        {phase === "upload" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: "#354F52", marginBottom: 8 }}>Upload staff list</h1>
            <p style={{ color: "#7A9A82", fontSize: 14, marginBottom: 28 }}>Upload your team CSV with names, emails, roles, and building assignments.</p>

            {!uploaded ? (
              <div>
                <div
                  onClick={() => setUploaded(true)}
                  style={{ border: "2px dashed rgba(132,169,140,0.4)", borderRadius: 20, padding: "56px 32px", textAlign: "center", cursor: "pointer", marginBottom: 20 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#52796F")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(132,169,140,0.4)")}
                >
                  <div style={{ width: 56, height: 56, background: "rgba(82,121,111,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Users size={24} color="#52796F" />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Drop staff CSV here or click to browse</div>
                  <div style={{ color: "#84A98C", fontSize: 13 }}>Required: Name, Email, Role, Building Assignment</div>
                </div>
                <button onClick={() => setUploaded(true)} style={{ padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Simulate upload (6 staff)
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(132,169,140,0.15)", padding: 24, marginBottom: 20, borderLeft: "4px solid #52796F" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <CheckCircle2 size={18} color="#52796F" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>growthpoint_staff.csv uploaded — 6 team members detected</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {staff.map(s => (
                      <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#F7FAF7", borderRadius: 20, border: "1px solid rgba(132,169,140,0.15)" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>{s.initials}</div>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setPhase("assign")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Review role assignments <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── ASSIGN PHASE ── */}
        {phase === "assign" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: "#354F52", marginBottom: 8 }}>Confirm role assignments</h1>
            <p style={{ color: "#7A9A82", fontSize: 14, marginBottom: 28 }}>Each role unlocks a specific dashboard view. Review and confirm before sending magic links.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {staff.map(s => (
                <div key={s.name} style={{ background: "#fff", borderRadius: 20, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {s.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                      <span style={{ padding: "2px 10px", background: `${s.accent}20`, color: s.accent, fontSize: 11, fontWeight: 600, borderRadius: 20 }}>{s.role}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#84A98C", marginBottom: 8 }}>{s.email} · {s.building}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(roleAccess[s.role] || []).map(a => (
                        <span key={a} style={{ padding: "3px 10px", background: "#F7FAF7", border: "1px solid rgba(132,169,140,0.2)", color: "#52796F", fontSize: 11, borderRadius: 20 }}>{a}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <CheckCircle2 size={18} color="#52796F" />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase("send")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Confirm & send magic links <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* ── SEND PHASE ── */}
        {phase === "send" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: "#354F52", marginBottom: 8 }}>Send magic links</h1>
            <p style={{ color: "#7A9A82", fontSize: 14, marginBottom: 28 }}>
              Each team member receives a personalised email with a secure magic link. They click it, verify their identity, set a password, and land directly in their dashboard.
            </p>

            {/* Info card */}
            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(132,169,140,0.15)", padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { icon: "🔐", label: "Secure token", desc: "24-hour expiry, single-use" },
                  { icon: "📱", label: "OTP verification", desc: "SMS or email 6-digit code" },
                  { icon: "🎯", label: "Role-based landing", desc: "Direct to their dashboard" },
                ].map(f => (
                  <div key={f.label} style={{ textAlign: "center", padding: "12px 8px" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: "#84A98C" }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff rows with send status */}
            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 24 }}>
              {staff.map((s, i) => {
                const isSent = sentCount > i;
                return (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderBottom: i < staff.length - 1 ? "1px solid rgba(132,169,140,0.08)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      {s.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#84A98C" }}>{s.email}</div>
                    </div>
                    <span style={{ padding: "2px 10px", background: `${s.accent}20`, color: s.accent, fontSize: 11, fontWeight: 600, borderRadius: 20 }}>{s.role}</span>
                    <div style={{ width: 80, textAlign: "right" }}>
                      {sending ? (
                        isSent ? (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", color: "#52796F", fontSize: 12, fontWeight: 600 }}>
                            <CheckCircle2 size={14} /> Sent
                          </span>
                        ) : (
                          <span style={{ color: "#84A98C", fontSize: 12 }}>Queued…</span>
                        )
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", color: "#84A98C", fontSize: 12 }}>
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
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
              >
                <Send size={16} />
                Send 6 magic links
              </button>
            ) : allSent ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "#E8F5E9", borderRadius: 16, color: "#2E7D32", fontWeight: 600, fontSize: 14 }}>
                <CheckCircle2 size={18} />
                All 6 magic links sent! Redirecting…
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "#F7FAF7", borderRadius: 16, color: "#52796F", fontWeight: 600, fontSize: 14 }}>
                <div style={{ width: 18, height: 18, border: "2px solid #52796F", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Sending… {sentCount}/{staff.length}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
