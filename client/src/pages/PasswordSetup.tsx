/**
 * Password Setup — Botanical dark design
 * Sipho Khumalo sets his password and lands on the Home Hub role selector
 * Dark forest green background, strength bar, confirm match indicator
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function PasswordSetup() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  const strength = password.length === 0 ? "" : password.length < 8 ? "weak" : password.length < 12 ? "medium" : "strong";
  const strengthColor = strength === "strong" ? "#52796F" : strength === "medium" ? "#E8A838" : "#E07A5F";
  const strengthWidth = strength === "strong" ? "100%" : strength === "medium" ? "66%" : "33%";
  const match = confirm.length > 0 && confirm === password;

  return (
    <div style={{ minHeight: "100vh", background: "#2C3E33", fontFamily: "'DM Sans', sans-serif", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 440, width: "100%" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>GreenBDG Africa</span>
        </div>

        {/* User context */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "14px 18px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#064E3B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>SK</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Sipho Khumalo</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Building Manager · Sandton Towers</div>
          </div>
          <div style={{ marginLeft: "auto", padding: "3px 10px", background: "rgba(82,121,111,0.3)", color: "#84A98C", fontSize: 11, fontWeight: 600, borderRadius: 20 }}>
            Identity verified ✓
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.09)", padding: "32px 28px" }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: "#fff", marginBottom: 6 }}>
            Set your password.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 28 }}>
            Choose a strong password to secure your GreenBDG account.
          </p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              New password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                style={{ width: "100%", padding: "13px 42px 13px 16px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 18, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {strength && (
              <div style={{ marginTop: 10 }}>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: strengthWidth, background: strengthColor, borderRadius: 2, transition: "width 0.3s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: strengthColor, fontWeight: 600, textTransform: "capitalize" }}>{strength}</span>
                  {strength === "weak" && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Add numbers & symbols</span>}
                  {strength === "medium" && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Add special characters</span>}
                  {strength === "strong" && <span style={{ fontSize: 11, color: "#52796F" }}>Great password!</span>}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Confirm password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                style={{ width: "100%", padding: "13px 42px 13px 16px", background: "rgba(255,255,255,0.07)", border: `1.5px solid ${match ? "rgba(82,121,111,0.6)" : "rgba(255,255,255,0.12)"}`, borderRadius: 18, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
              {match && (
                <CheckCircle2 size={16} color="#52796F" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }} />
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/hub")}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Enter GreenBDG
            <ArrowRight size={15} />
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 20 }}>
          By continuing, you agree to GreenBDG's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
