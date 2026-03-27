/**
 * Magic Link Sent Confirmation — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * Shown after all magic links have been sent to staff
 */
import { useLocation } from "wouter";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

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
  { name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", initials: "AD", accent: GOLD },
  { name: "Lerato Ndlovu", email: "l.ndlovu@growthpoint.co.za", role: "Sustainability Manager", initials: "LN", accent: ACCENT },
  { name: "James Molefe", email: "j.molefe@growthpoint.co.za", role: "Portfolio Manager", initials: "JM", accent: FOREST },
  { name: "Sipho Khumalo", email: "s.khumalo@growthpoint.co.za", role: "Building Manager", initials: "SK", accent: DEEP },
  { name: "Maria Peters", email: "m.peters@growthpoint.co.za", role: "Facilities Manager", initials: "MP", accent: "#1A8C6A" },
  { name: "David Kgosi", email: "d.kgosi@africanholdings.co.za", role: "Tenant Admin", initials: "DK", accent: "#2DAF85" },
];

export default function MagicLinkSent() {
  const [, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: DEEP, fontFamily: sans, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 520, position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{ width: 34, height: 34, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
              <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
              <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
              <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
              <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: WHITE }}>GreenBDG Africa</span>
        </div>

        {/* Success header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: "2px solid rgba(16,185,129,0.3)" }}>
            <CheckCircle2 size={32} color={ACCENT} />
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: WHITE, marginBottom: 10, lineHeight: 1.3 }}>
            All 6 magic links sent.
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 380, margin: "0 auto" }}>
            Your team will receive their personalised access links within the next few minutes. Each link is valid for 24 hours.
          </p>
        </div>

        {/* Staff list */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: 28 }}>
          {staff.map((s, i) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: i < staff.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: WHITE, flexShrink: 0 }}>
                {s.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 13, color: WHITE }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.email}</div>
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, color: s.accent, padding: "2px 10px", background: `${s.accent}18`, borderRadius: 20 }}>{s.role}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: ACCENT, fontSize: 12, fontWeight: 600 }}>
                <Mail size={13} /> Sent
              </div>
            </div>
          ))}
        </div>

        {/* What happens next */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", marginBottom: 28 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>What happens next</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { step: "1", text: "Each team member receives their personalised email with a secure magic link" },
              { step: "2", text: "They click the link, verify with a 6-digit OTP, and set their password" },
              { step: "3", text: "They land directly in their role-specific dashboard — no navigation needed" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: ACCENT, flexShrink: 0 }}>{s.step}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/platform")}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px", background: ACCENT, color: DEEP, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: sans }}
        >
          Go to platform home <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
