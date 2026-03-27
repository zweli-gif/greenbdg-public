/**
 * Magic Link Landing — Botanical dark design
 * Sipho Khumalo's invite landing page (Building Manager, Sandton Towers)
 * Dark forest green background, expiry timer, OTP verification
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Shield, Clock } from "lucide-react";

export default function MagicLinkLanding() {
  const [, navigate] = useLocation();
  const [otpSent, setOtpSent] = useState(true);
  const [otp, setOtp] = useState(["4", "8", "2", "9", "1", "7"]);

  const handleOtpChange = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#2C3E33", fontFamily: "'DM Sans', sans-serif", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 460, width: "100%" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>GreenBDG Africa</span>
        </div>

        {/* Security badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20 }}>
            <Shield size={13} color="#84A98C" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Secure magic link · Single use</span>
            <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)" }} />
            <Clock size={12} color="#84A98C" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Expires in 23:47:12</span>
          </div>
        </div>

        {/* Welcome card */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.09)", padding: "32px 28px", marginBottom: 20 }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 30, color: "#fff", marginBottom: 8 }}>
            Welcome, Sipho.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            You've been invited to GreenBDG Africa as <strong style={{ color: "#fff" }}>Building Manager</strong> at Sandton Towers.
          </p>

          {/* Details */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, marginBottom: 24 }}>
            {[
              { label: "Full name", value: "Sipho Khumalo" },
              { label: "Email", value: "s.khumalo@growthpoint.co.za" },
              { label: "Role", value: "Building Manager" },
              { label: "Building", value: "Sandton Towers, Sandton" },
              { label: "Company", value: "Growthpoint Properties" },
            ].map((f, i) => (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{f.value}</span>
              </div>
            ))}
          </div>

          {/* OTP step */}
          {!otpSent ? (
            <button
              onClick={() => setOtpSent(true)}
              style={{ width: "100%", padding: "13px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              Verify identity — send OTP to phone
            </button>
          ) : (
            <div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Enter the 6-digit code sent to <strong style={{ color: "#fff" }}>+27 82 *** 4521</strong>
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={v}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    style={{ width: 44, height: 52, textAlign: "center", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "#fff", fontSize: 20, fontWeight: 700, outline: "none" }}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate("/onboarding/password-setup")}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Verify & set password <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/onboarding/password-setup")}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", width: "100%", textAlign: "center", padding: "8px" }}
        >
          Skip OTP for demo →
        </button>
      </div>
    </div>
  );
}
