/**
 * Tenant Fault Reporting — 3-step fault submission flow
 * Source: tenant-fault-reporting.html
 * Design: Operational system (Inter, sage bg, white cards)
 */
import { useState } from "react";
import { useLocation } from "wouter";

const C = {
  sageBg: "#E8EDE4", white: "#FFFFFF", green: "#5A9A6E", amber: "#E8A838",
  coral: "#E07A5F", text: "#2D3A2D", textSec: "#5A6B5A", textMuted: "#8A9A8A",
  border: "#D8E0D5", dark: "#002117",
};

const categories = [
  { id: "hvac", icon: "🌡️", label: "HVAC / Air Con" },
  { id: "electrical", icon: "⚡", label: "Electrical" },
  { id: "plumbing", icon: "🚿", label: "Plumbing" },
  { id: "lifts", icon: "🏢", label: "Lifts / Escalators" },
  { id: "security", icon: "🔒", label: "Security / Access" },
  { id: "cleaning", icon: "🧹", label: "Cleaning" },
  { id: "parking", icon: "🚗", label: "Parking" },
  { id: "other", icon: "🔧", label: "Other" },
];

const priorities = [
  { id: "critical", label: "Critical", desc: "Safety risk or major disruption", color: C.coral },
  { id: "high", label: "High", desc: "Significant impact on operations", color: C.amber },
  { id: "medium", label: "Medium", desc: "Moderate inconvenience", color: "#6B9BD1" },
  { id: "low", label: "Low", desc: "Minor issue, no urgency", color: C.textMuted },
];

export default function TenantFaultReporting() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/dashboard/tenant"), 3000);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: C.sageBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: C.white, borderRadius: 20, padding: "60px 48px", textAlign: "center", maxWidth: 480, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          <div style={{ width: 72, height: 72, background: `${C.green}20`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16l5 5 11-11" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 12 }}>Fault Reported</h2>
          <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, marginBottom: 8 }}>
            Your fault report <strong>F-0043</strong> has been submitted successfully. The facilities team has been notified and will respond within 4 hours.
          </p>
          <p style={{ fontSize: 12, color: C.textMuted }}>Redirecting to your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.sageBg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      {/* Header */}
      <header style={{ background: C.white, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 100, height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: C.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 700 }}>G</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>GreenBDG</div>
            <div style={{ fontSize: 11, color: C.textSec, letterSpacing: "0.15em", textTransform: "uppercase" }}>Tenant Portal</div>
          </div>
        </div>
        <button onClick={() => navigate("/dashboard/tenant")} style={{ padding: "9px 20px", background: "transparent", color: C.textSec, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          ← Back to Portal
        </button>
      </header>

      <div style={{ padding: "40px 32px", maxWidth: 680, margin: "0 auto" }}>
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>Report a Fault</h1>
          <p style={{ fontSize: 14, color: C.textSec }}>African Corp Holdings · Sandton Heights · Floors 14–16</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: s < 3 ? 1 : "none" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: step >= s ? C.green : C.border, color: step >= s ? "white" : C.textMuted,
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? C.green : C.border, margin: "0 8px" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, fontSize: 12, color: C.textMuted }}>
          <span style={{ color: step >= 1 ? C.green : C.textMuted, fontWeight: step === 1 ? 600 : 400 }}>Category</span>
          <span style={{ color: step >= 2 ? C.green : C.textMuted, fontWeight: step === 2 ? 600 : 400 }}>Details</span>
          <span style={{ color: step >= 3 ? C.green : C.textMuted, fontWeight: step === 3 ? 600 : 400 }}>Review</span>
        </div>

        {/* Step 1 — Category */}
        {step === 1 && (
          <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>What type of fault is it?</h2>
            <p style={{ fontSize: 13, color: C.textSec, marginBottom: 24 }}>Select the category that best describes the issue.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: "16px 8px", borderRadius: 12, border: `2px solid ${selectedCategory === cat.id ? C.green : C.border}`,
                    background: selectedCategory === cat.id ? `${C.green}10` : C.white,
                    cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                  }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{cat.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: selectedCategory === cat.id ? C.green : C.text }}>{cat.label}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => selectedCategory && setStep(2)}
                style={{ padding: "12px 28px", background: selectedCategory ? C.green : C.border, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: selectedCategory ? "pointer" : "not-allowed" }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Describe the issue</h2>
            <p style={{ fontSize: 13, color: C.textSec, marginBottom: 24 }}>Provide details to help the facilities team respond quickly.</p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 8 }}>Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Floor 15, Meeting Room B, near the east window"
                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", color: C.text, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 8 }}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Describe the fault in detail — what you see, hear, or smell, and when it started..."
                rows={4}
                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: "'Inter', sans-serif", color: C.text, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: "block", marginBottom: 12 }}>Priority</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {priorities.map(p => (
                  <button key={p.id} onClick={() => setSelectedPriority(p.id)}
                    style={{
                      padding: "12px 16px", borderRadius: 10, border: `2px solid ${selectedPriority === p.id ? p.color : C.border}`,
                      background: selectedPriority === p.id ? `${p.color}10` : C.white,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                    }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{p.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} style={{ padding: "12px 24px", background: "transparent", color: C.textSec, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>← Back</button>
              <button onClick={() => (description || location) && setStep(3)}
                style={{ padding: "12px 28px", background: (description || location) ? C.green : C.border, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: (description || location) ? "pointer" : "not-allowed" }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Review your report</h2>
            <p style={{ fontSize: 13, color: C.textSec, marginBottom: 24 }}>Confirm the details before submitting to the facilities team.</p>

            <div style={{ background: C.sageBg, borderRadius: 12, padding: 20, marginBottom: 24 }}>
              {[
                { label: "Category", value: categories.find(c => c.id === selectedCategory)?.label || "—" },
                { label: "Location", value: location || "Not specified" },
                { label: "Description", value: description || "Not provided" },
                { label: "Priority", value: priorities.find(p => p.id === selectedPriority)?.label || "Medium" },
                { label: "Submitted by", value: "African Corp Holdings · Floors 14–16" },
                { label: "Building", value: "Sandton Heights" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", gap: 16, paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, width: 100, flexShrink: 0 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: C.text }}>{row.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}30`, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
              <p style={{ fontSize: 12, color: "#8A6A00", margin: 0 }}>
                <strong>Response time:</strong> Critical faults within 2 hours · High within 4 hours · Medium within 24 hours · Low within 5 business days
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(2)} style={{ padding: "12px 24px", background: "transparent", color: C.textSec, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>← Back</button>
              <button onClick={handleSubmit}
                style={{ padding: "12px 28px", background: C.green, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Submit Report ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
