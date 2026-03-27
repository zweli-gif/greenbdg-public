/**
 * Magic Links Sent — Botanical design system (dark variant)
 * Confirmation screen after all 6 magic links are dispatched
 * Dark forest green background, white text
 */
import { useLocation } from "wouter";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

const recipients = [
  { initials: "AD", name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", accent: "#E8A838" },
  { initials: "LN", name: "Lerato Ndlovu", email: "l.ndlovu@growthpoint.co.za", role: "Sustainability Manager", accent: "#2DAF85" },
  { initials: "JM", name: "James Molefe", email: "j.molefe@growthpoint.co.za", role: "Portfolio Manager", accent: "#0A6B4F" },
  { initials: "SK", name: "Sipho Khumalo", email: "s.khumalo@growthpoint.co.za", role: "Building Manager", accent: "#064E3B" },
  { initials: "MP", name: "Maria Peters", email: "m.peters@growthpoint.co.za", role: "Facilities Manager", accent: "#1A8C6A" },
  { initials: "DK", name: "David Kgosi", email: "d.kgosi@africanholdings.co.za", role: "Tenant Admin", accent: "#2DAF85" },
];

export default function MagicLinkSent() {
  const [, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: "#2C3E33", fontFamily: "'DM Sans', sans-serif", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 520, width: "100%" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>GreenBDG Africa</span>
        </div>

        {/* Icon + heading */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Mail size={32} color="#84A98C" />
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 32, color: "#fff", marginBottom: 10 }}>
            Magic links sent.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: "0 auto" }}>
            6 personalised, single-use magic links have been dispatched. Each team member is routed directly to their role-specific dashboard.
          </p>
        </div>

        {/* Recipients list */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.1em" }}>6 links dispatched</span>
          </div>
          {recipients.map((r, i) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderBottom: i < recipients.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: r.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {r.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{r.email} · {r.role}</div>
              </div>
              <CheckCircle2 size={15} color="#52796F" />
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", padding: "16px 20px", marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
            <strong style={{ color: "#fff" }}>What happens next:</strong> Each team member clicks their link, verifies via OTP, sets a password, and lands directly in their personalised dashboard. Links expire in 24 hours.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => navigate("/onboarding/magic-link-landing")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Preview Sipho's magic link experience
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate("/dashboard/fm")}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", padding: "8px" }}
          >
            Skip to FM Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
