/**
 * Magic Link Landing — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * Dark forest background, expiry timer, OTP verification
 */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Clock, Shield } from "lucide-react";

const DEEP = "#002117";
const FOREST = "#064E3B";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const BORDER = "rgba(255,255,255,0.1)";
const MUTED_WHITE = "rgba(255,255,255,0.5)";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

export default function MagicLinkLanding() {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<"verify" | "otp" | "done">("verify");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(23 * 60 + 47);
  const [otpError, setOtpError] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(n => Math.max(0, n - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    setOtpError(false);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code === "123456" || code.length === 6) {
      setPhase("done");
      setTimeout(() => navigate("/setup-password"), 1400);
    } else {
      setOtpError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: DEEP, fontFamily: sans, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, borderRadius: 20 }}>
            <Clock size={12} color={GOLD} />
            <span style={{ fontFamily: mono, fontSize: 12, color: GOLD }}>{mins}:{secs}</span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, border: `1px solid ${BORDER}`, padding: "36px 32px" }}>
          {phase === "verify" && (
            <>
              <div style={{ width: 52, height: 52, background: "rgba(16,185,129,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Shield size={24} color={ACCENT} />
              </div>
              <h1 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 8, lineHeight: 1.3 }}>You're in, Amahle.</h1>
              <p style={{ fontSize: 14, color: MUTED_WHITE, lineHeight: 1.7, marginBottom: 6 }}>
                Your secure access link has been verified. You've been granted <strong style={{ color: WHITE }}>CFO access</strong> to the GreenBDG platform.
              </p>
              <p style={{ fontSize: 13, color: MUTED_WHITE, lineHeight: 1.7, marginBottom: 28 }}>
                To protect your account, we'll send a 6-digit verification code to <strong style={{ color: WHITE }}>a.dube@growthpoint.co.za</strong>
              </p>
              <button
                onClick={() => setPhase("otp")}
                style={{ width: "100%", padding: "14px", background: ACCENT, color: DEEP, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: sans, letterSpacing: "0.01em" }}
              >
                Send verification code
              </button>
            </>
          )}

          {phase === "otp" && (
            <>
              <h1 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 8 }}>Enter your code</h1>
              <p style={{ fontSize: 13, color: MUTED_WHITE, lineHeight: 1.7, marginBottom: 28 }}>
                We sent a 6-digit code to <strong style={{ color: WHITE }}>a.dube@growthpoint.co.za</strong>. Enter any 6 digits to continue.
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={el => { refs.current[i] = el; }}
                    value={v}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                    maxLength={1}
                    style={{
                      flex: 1, height: 52, textAlign: "center",
                      background: "rgba(255,255,255,0.07)",
                      border: `1.5px solid ${otpError ? "#EF4444" : v ? ACCENT : BORDER}`,
                      borderRadius: 10, color: WHITE, fontSize: 20, fontWeight: 700,
                      outline: "none", fontFamily: mono,
                    }}
                  />
                ))}
              </div>
              {otpError && <p style={{ fontSize: 12, color: "#EF4444", marginBottom: 16 }}>Incorrect code. Try again or use any 6 digits for the demo.</p>}
              <button
                onClick={handleVerify}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: ACCENT, color: DEEP, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: sans }}
              >
                Verify & continue
              </button>
            </>
          )}

          {phase === "done" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 60, height: 60, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <CheckCircle2 size={28} color={ACCENT} />
              </div>
              <h2 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: WHITE, marginBottom: 8 }}>Verified!</h2>
              <p style={{ fontSize: 13, color: MUTED_WHITE }}>Setting up your dashboard…</p>
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
