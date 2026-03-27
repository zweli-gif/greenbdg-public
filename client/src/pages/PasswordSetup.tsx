/**
 * Password Setup — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * First-time password creation after magic link verification
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";

const DEEP = "#002117";
const ACCENT = "#10B981";
const WHITE = "#FFFFFF";
const BORDER = "rgba(255,255,255,0.1)";
const MUTED_WHITE = "rgba(255,255,255,0.5)";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function PasswordSetup() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [done, setDone] = useState(false);

  const allMet = requirements.every(r => r.test(password));
  const matches = password && confirm && password === confirm;
  const canSubmit = allMet && matches;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setDone(true);
    setTimeout(() => navigate("/dashboard/cfo"), 1400);
  };

  return (
    <div style={{ minHeight: "100vh", background: DEEP, fontFamily: sans, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
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

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, border: `1px solid ${BORDER}`, padding: "36px 32px" }}>
          {!done ? (
            <>
              <h1 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 6, lineHeight: 1.3 }}>Set your password</h1>
              <p style={{ fontSize: 13, color: MUTED_WHITE, lineHeight: 1.7, marginBottom: 28 }}>
                Welcome, <strong style={{ color: WHITE }}>Amahle</strong>. Create a secure password to protect your CFO dashboard.
              </p>

              {/* Password field */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>New password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{ width: "100%", padding: "13px 44px 13px 16px", background: "rgba(255,255,255,0.07)", border: `1.5px solid ${password && allMet ? ACCENT : BORDER}`, borderRadius: 10, color: WHITE, fontSize: 14, outline: "none", fontFamily: sans, boxSizing: "border-box" }}
                  />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: MUTED_WHITE, cursor: "pointer", padding: 0 }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm field */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: mono, fontSize: 11, color: MUTED_WHITE, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Confirm password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showCf ? "text" : "password"}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                    style={{ width: "100%", padding: "13px 44px 13px 16px", background: "rgba(255,255,255,0.07)", border: `1.5px solid ${matches ? ACCENT : confirm ? "#EF4444" : BORDER}`, borderRadius: 10, color: WHITE, fontSize: 14, outline: "none", fontFamily: sans, boxSizing: "border-box" }}
                  />
                  <button onClick={() => setShowCf(!showCf)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: MUTED_WHITE, cursor: "pointer", padding: 0 }}>
                    {showCf ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirm && !matches && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6 }}>Passwords do not match</p>}
              </div>

              {/* Requirements */}
              <div style={{ marginBottom: 24 }}>
                {requirements.map(r => {
                  const met = r.test(password);
                  return (
                    <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: met ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", border: `1.5px solid ${met ? ACCENT : "rgba(255,255,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {met && <CheckCircle2 size={10} color={ACCENT} />}
                      </div>
                      <span style={{ fontSize: 12, color: met ? ACCENT : MUTED_WHITE }}>{r.label}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: canSubmit ? ACCENT : "rgba(255,255,255,0.1)", color: canSubmit ? DEEP : MUTED_WHITE, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: sans, transition: "all 0.2s" }}
              >
                Set password & enter dashboard <ArrowRight size={15} />
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 60, height: 60, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <CheckCircle2 size={28} color={ACCENT} />
              </div>
              <h2 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: WHITE, marginBottom: 8 }}>Password set!</h2>
              <p style={{ fontSize: 13, color: MUTED_WHITE }}>Opening your CFO dashboard…</p>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 24 }}>
          Secure · POPIA compliant · Hosted in South Africa
        </p>
      </div>
    </div>
  );
}
