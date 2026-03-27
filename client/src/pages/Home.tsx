/**
 * PUBLIC HOMEPAGE — GreenBDG Africa
 * Design: PLUSH — deep forest green #002117, crisp white, aerial photography heroes
 * Typography: Libre Baskerville (display) + Work Sans (body) + DM Mono (labels)
 * Wording: Brian's original copy exactly
 * Platform connection: ONLY via "Request demo" button → /demo
 * NO nav links to the platform. NO "See the platform". NO "Client login".
 */
import { useState } from "react";
import { useLocation } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-landing_5e31e2a7.jpg";
const PORTFOLIO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-portfolio_7d046ce4.jpg";
const SUSTAIN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-sustainability_8900d205.jpg";
const DASH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/dashboard-bg_781e4042.jpg";

// Plush colour tokens
const FOREST = "#002117";
const FOREST2 = "#064E3B";
const FOREST3 = "#065F46";
const EMERALD = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const CLAY = "#B85042";
const MUTED = "rgba(255,255,255,0.55)";
const DARK_MUTED = "#4A5568";

const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

export default function Home() {
  const [, navigate] = useLocation();

  // Portfolio Intelligence Check widget
  const [buildings, setBuildings] = useState(21);
  const [gla, setGla] = useState(3500);
  const [energy, setEnergy] = useState<"eskom" | "solar" | "mixed">("eskom");

  const totalGla = buildings * gla;
  const annualKwh = totalGla * (energy === "eskom" ? 180 : energy === "solar" ? 95 : 140);
  const carbonTons = annualKwh * 0.00092;
  const carbonTax = Math.round(carbonTons * 236);
  const esgScore = Math.max(18, Math.min(72, 70 - buildings * 0.8 - (energy === "eskom" ? 12 : 0)));
  const certRisk = Math.round(buildings * (energy === "eskom" ? 0.38 : 0.22));

  // Free tools tab
  const [activeTab, setActiveTab] = useState<"home" | "benchmark" | "simulator">("home");

  // Benchmark widget
  const [bmGla, setBmGla] = useState(12500);
  const [bmType, setBmType] = useState<"office-a" | "office-b" | "retail" | "industrial">("office-a");
  const [bmKwh, setBmKwh] = useState(1800000);
  const [bmResult, setBmResult] = useState<null | { intensity: number; benchmark: number; rating: string; color: string }>(null);
  const benchmarks: Record<string, number> = { "office-a": 142, "office-b": 175, retail: 210, industrial: 95 };
  const typeLabels: Record<string, string> = { "office-a": "Office A-Grade", "office-b": "Office B-Grade", retail: "Retail Centre", industrial: "Industrial" };

  const runBenchmark = () => {
    const intensity = Math.round(bmKwh / bmGla);
    const benchmark = benchmarks[bmType];
    const ratio = intensity / benchmark;
    let rating = "Excellent"; let color = "#10B981";
    if (ratio > 1.5) { rating = "Poor"; color = "#EF4444"; }
    else if (ratio > 1.2) { rating = "Below Average"; color = "#F59E0B"; }
    else if (ratio > 1.0) { rating = "Average"; color = "#F59E0B"; }
    else if (ratio > 0.85) { rating = "Good"; color = "#3B82F6"; }
    setBmResult({ intensity, benchmark, rating, color });
  };

  // Building simulator
  const [simBuildings, setSimBuildings] = useState([
    { name: "Sandton Towers", type: "office-a", gla: 18500, year: 2008 },
    { name: "Rosebank Square", type: "retail", gla: 32000, year: 2012 },
    { name: "Menlyn Park Office", type: "office-b", gla: 11200, year: 2001 },
  ]);
  const [simResult, setSimResult] = useState<null | { totalGla: number; avgIntensity: number; carbonLiability: number; epcRisk: number; gresbScore: number }>(null);

  const runSimulator = () => {
    const totalGlaCalc = simBuildings.reduce((s, b) => s + b.gla, 0);
    const avgIntensity = Math.round(simBuildings.reduce((s, b) => {
      const base = benchmarks[b.type as keyof typeof benchmarks] || 142;
      const age = 2025 - b.year;
      return s + base * (1 + age * 0.008);
    }, 0) / simBuildings.length);
    const carbonLiability = Math.round(totalGlaCalc * avgIntensity * 0.00092 * 236 / 1000);
    const epcRisk = simBuildings.filter(b => (2025 - b.year) > 15).length;
    const gresbScore = Math.max(28, Math.min(68, 65 - simBuildings.length * 1.2 - epcRisk * 3));
    setSimResult({ totalGla: totalGlaCalc, avgIntensity, carbonLiability, epcRisk, gresbScore: Math.round(gresbScore) });
  };

  const navItems = ["About us", "The platform", "Solutions", "Free tools", "Resources"];

  return (
    <div style={{ fontFamily: sans, background: WHITE, color: FOREST, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(0,33,23,0.97)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 66,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: EMERALD, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 19 19" fill="none">
                <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
                <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
                <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
                <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 700, color: WHITE, display: "block", lineHeight: 1.15 }}>GreenBDG Africa</span>
              <span style={{ fontFamily: mono, fontSize: "0.48rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.14em", display: "block" }}>Green Building Design Group</span>
            </div>
          </a>
          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "stretch", height: 66, gap: 0 }}>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => item === "Free tools" ? setActiveTab("benchmark") : null}
                style={{
                  display: "flex", alignItems: "center", padding: "0 14px",
                  fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.65)",
                  background: "none", border: "none",
                  borderBottom: "2.5px solid transparent",
                  cursor: "pointer", transition: "color 0.2s",
                  fontFamily: sans,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = WHITE; e.currentTarget.style.borderBottomColor = EMERALD; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Primary CTA only — NO client login, NO platform link */}
          <button
            onClick={() => navigate("/demo")}
            style={{ background: EMERALD, color: WHITE, border: "none", padding: "9px 22px", borderRadius: 7, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, letterSpacing: "0.01em" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#059669"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = EMERALD; e.currentTarget.style.transform = "none"; }}
          >
            See the platform →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: "92vh",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}>
        {/* Left — copy */}
        <div style={{
          background: FOREST,
          padding: "100px 64px 80px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative", zIndex: 2,
        }}>
          {/* Ghost text */}
          <div style={{
            position: "absolute", top: 40, left: 56,
            fontFamily: serif, fontSize: "clamp(80px,10vw,140px)", fontWeight: 900,
            color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>LEGACY</div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: mono, fontSize: "0.62rem", color: EMERALD, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 28 }}>
              — SA's green building intelligence platform
            </div>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 900, color: WHITE, lineHeight: 1.08, margin: 0 }}>
              Every building is either
            </h1>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 900, fontStyle: "italic", color: CLAY, lineHeight: 1.08, margin: "4px 0" }}>
              a liability
            </h1>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 900, color: WHITE, lineHeight: 1.08, margin: 0 }}>
              or a legacy.
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginTop: 28, maxWidth: 480 }}>
              <strong style={{ color: WHITE }}>GreenBDG helps you choose.</strong><br/>
              FM operations · ESG reporting · Carbon compliance · Green Star certification — one platform, built for SA's regulatory reality.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveTab("benchmark")}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: EMERALD, color: WHITE, border: "none", padding: "14px 28px", borderRadius: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}
                onMouseEnter={e => e.currentTarget.style.background = "#059669"}
                onMouseLeave={e => e.currentTarget.style.background = EMERALD}
              >
                Try free portfolio check
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={() => navigate("/demo")}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.25)", padding: "14px 28px", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = WHITE; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              >
                Request a demo
              </button>
            </div>
            <p style={{ fontFamily: mono, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
              Free check = 4 min, no sign-up &nbsp;·&nbsp; Demo = 30-min guided walkthrough with a GreenBDG consultant
            </p>
          </div>
        </div>

        {/* Right — Portfolio Intelligence Check card over aerial photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={HERO_IMG} alt="Aerial view of African city" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,33,23,0.65) 0%, rgba(0,33,23,0.2) 100%)" }} />
          {/* Intelligence card */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: "min(420px, 90%)",
            background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)",
            borderRadius: 20, padding: "28px 28px 24px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: "0.58rem", color: FOREST3, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>Portfolio Intelligence Check</div>
                <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 700, color: FOREST, lineHeight: 1.3 }}>3 inputs → your full risk picture</div>
              </div>
              <span style={{ background: "#ECFDF5", color: FOREST3, fontFamily: mono, fontSize: "0.58rem", padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap", fontWeight: 600 }}>Free · No sign-up</span>
            </div>

            {/* Slider: Buildings */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: sans, fontSize: "0.75rem", color: DARK_MUTED }}>Buildings in portfolio</span>
                <span style={{ fontFamily: mono, fontSize: "0.75rem", color: FOREST, fontWeight: 600 }}>{buildings} buildings</span>
              </div>
              <input type="range" min={1} max={100} value={buildings} onChange={e => setBuildings(+e.target.value)}
                style={{ width: "100%", accentColor: FOREST2, cursor: "pointer" }} />
            </div>

            {/* Slider: GLA */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: sans, fontSize: "0.75rem", color: DARK_MUTED }}>Average GLA per building (m²)</span>
                <span style={{ fontFamily: mono, fontSize: "0.75rem", color: FOREST, fontWeight: 600 }}>{gla.toLocaleString()} m²</span>
              </div>
              <input type="range" min={500} max={50000} step={500} value={gla} onChange={e => setGla(+e.target.value)}
                style={{ width: "100%", accentColor: FOREST2, cursor: "pointer" }} />
            </div>

            {/* Energy source */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: sans, fontSize: "0.75rem", color: DARK_MUTED, display: "block", marginBottom: 8 }}>Primary energy source</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {(["eskom", "solar", "mixed"] as const).map(e => (
                  <button key={e} onClick={() => setEnergy(e)}
                    style={{ padding: "8px 4px", borderRadius: 8, fontSize: "0.72rem", fontWeight: 600, fontFamily: sans, cursor: "pointer", border: "1.5px solid", transition: "all 0.15s",
                      background: energy === e ? FOREST : "white",
                      color: energy === e ? WHITE : DARK_MUTED,
                      borderColor: energy === e ? FOREST : "#E2E8F0",
                    }}>
                    {e === "eskom" ? "Eskom grid" : e === "solar" ? "Solar mix" : "Mixed"}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { label: "Carbon tax / yr", value: `R${(carbonTax / 1000000).toFixed(1)}M`, sub: `SARS · R236/tCO₂e`, color: CLAY },
                { label: "ESG readiness", value: `${esgScore}/100`, sub: "Below SA peer avg", color: FOREST2 },
                { label: "Certification risk", value: `${certRisk} bldgs`, sub: "No current EPC", color: "#F59E0B" },
              ].map(r => (
                <div key={r.label} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 10px" }}>
                  <div style={{ fontFamily: mono, fontSize: "0.55rem", color: DARK_MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 700, color: r.color, lineHeight: 1 }}>{r.value}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.55rem", color: DARK_MUTED, marginTop: 3 }}>{r.sub}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/demo")}
              style={{ width: "100%", padding: "13px", background: FOREST, color: WHITE, border: "none", borderRadius: 10, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}
              onMouseEnter={e => e.currentTarget.style.background = FOREST2}
              onMouseLeave={e => e.currentTarget.style.background = FOREST}
            >
              Get my full portfolio report →
            </button>
            <p style={{ fontFamily: mono, fontSize: "0.57rem", color: DARK_MUTED, textAlign: "center", marginTop: 8 }}>
              Full report in 4 minutes · PDF delivered to your inbox
            </p>
          </div>
        </div>
      </section>

      {/* ── REGULATORY TICKER ── */}
      <div style={{ background: FOREST2, padding: "12px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, animation: "ticker 30s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 48, alignItems: "center" }}>
              {[
                "Carbon Budget Act — R236/tCO₂e from 2024",
                "SARS Carbon Tax Phase 2 — 2026 deadline",
                "Green Star V2 — SA's new certification standard",
                "SANS 10400-XA — mandatory energy compliance",
                "GRESB 2025 — submissions open Q1",
                "EPC certificates — mandatory for commercial buildings",
                "B-BBEE ESG alignment — new scoring criteria 2025",
              ].map((item, j) => (
                <span key={j} style={{ fontFamily: mono, fontSize: "0.65rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>
                  <span style={{ color: GOLD, marginRight: 8 }}>◆</span>{item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
      </div>

      {/* ── FREE TOOLS TAB BAR ── */}
      {activeTab !== "home" && (
        <div style={{ background: WHITE, borderBottom: "1px solid #E2E8F0", padding: "0 56px", display: "flex", gap: 0 }}>
          {(["benchmark", "simulator"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "14px 20px", fontSize: "0.8rem", fontWeight: 600, fontFamily: sans, background: "none", border: "none", cursor: "pointer",
                color: activeTab === tab ? FOREST : DARK_MUTED,
                borderBottom: `2.5px solid ${activeTab === tab ? FOREST2 : "transparent"}`,
              }}>
              {tab === "benchmark" ? "ESG Benchmark Tool" : "Building Simulator"}
            </button>
          ))}
          <button onClick={() => setActiveTab("home")} style={{ marginLeft: "auto", padding: "14px 16px", fontSize: "0.75rem", color: DARK_MUTED, background: "none", border: "none", cursor: "pointer", fontFamily: sans }}>
            ← Back to homepage
          </button>
        </div>
      )}

      {/* ── BENCHMARK TOOL ── */}
      {activeTab === "benchmark" && (
        <section style={{ background: OFF_WHITE, padding: "80px 56px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontFamily: mono, fontSize: "0.62rem", color: FOREST3, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 12 }}>Free tool · No sign-up</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: FOREST, lineHeight: 1.1, marginBottom: 12 }}>ESG Benchmark Tool</h2>
            <p style={{ fontSize: "0.9rem", color: DARK_MUTED, lineHeight: 1.8, marginBottom: 40 }}>Enter your building's energy consumption and see how it stacks up against SAPOA benchmarks for your building type.</p>
            <div style={{ background: WHITE, borderRadius: 16, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 600, color: FOREST, display: "block", marginBottom: 8 }}>Building type</label>
                  <select value={bmType} onChange={e => setBmType(e.target.value as typeof bmType)}
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.85rem", fontFamily: sans, color: FOREST, background: WHITE, cursor: "pointer" }}>
                    <option value="office-a">Office A-Grade</option>
                    <option value="office-b">Office B-Grade</option>
                    <option value="retail">Retail Centre</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 600, color: FOREST, display: "block", marginBottom: 8 }}>GLA (m²)</label>
                  <input type="number" value={bmGla} onChange={e => setBmGla(+e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.85rem", fontFamily: sans, color: FOREST, boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 600, color: FOREST, display: "block", marginBottom: 8 }}>Annual electricity consumption (kWh)</label>
                <input type="number" value={bmKwh} onChange={e => setBmKwh(+e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.85rem", fontFamily: sans, color: FOREST, boxSizing: "border-box" }} />
              </div>
              <button onClick={runBenchmark}
                style={{ background: FOREST, color: WHITE, border: "none", padding: "14px", borderRadius: 10, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}
                onMouseEnter={e => e.currentTarget.style.background = FOREST2}
                onMouseLeave={e => e.currentTarget.style.background = FOREST}>
                Benchmark now →
              </button>
              {bmResult && (
                <div style={{ background: "#F0FDF4", borderRadius: 12, padding: 24, border: `1px solid #BBF7D0` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: mono, fontSize: "0.58rem", color: DARK_MUTED, textTransform: "uppercase", marginBottom: 4 }}>Your intensity</div>
                      <div style={{ fontFamily: serif, fontSize: "1.8rem", fontWeight: 900, color: bmResult.color }}>{bmResult.intensity}</div>
                      <div style={{ fontFamily: mono, fontSize: "0.6rem", color: DARK_MUTED }}>kWh/m²/yr</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: mono, fontSize: "0.58rem", color: DARK_MUTED, textTransform: "uppercase", marginBottom: 4 }}>SAPOA benchmark</div>
                      <div style={{ fontFamily: serif, fontSize: "1.8rem", fontWeight: 900, color: FOREST }}>{bmResult.benchmark}</div>
                      <div style={{ fontFamily: mono, fontSize: "0.6rem", color: DARK_MUTED }}>kWh/m²/yr</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: mono, fontSize: "0.58rem", color: DARK_MUTED, textTransform: "uppercase", marginBottom: 4 }}>Rating</div>
                      <div style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 900, color: bmResult.color }}>{bmResult.rating}</div>
                      <div style={{ fontFamily: mono, fontSize: "0.6rem", color: DARK_MUTED }}>{typeLabels[bmType]}</div>
                    </div>
                  </div>
                  <button onClick={() => navigate("/demo")}
                    style={{ width: "100%", padding: "12px", background: FOREST, color: WHITE, border: "none", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                    Get your full ESG report — request a demo →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── BUILDING SIMULATOR ── */}
      {activeTab === "simulator" && (
        <section style={{ background: OFF_WHITE, padding: "80px 56px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontFamily: mono, fontSize: "0.62rem", color: FOREST3, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 12 }}>Free tool · No sign-up</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 900, color: FOREST, lineHeight: 1.1, marginBottom: 12 }}>Building Simulator</h2>
            <p style={{ fontSize: "0.9rem", color: DARK_MUTED, lineHeight: 1.8, marginBottom: 40 }}>Enter your buildings below and we'll generate a full portfolio risk picture — energy intensity, carbon liability, EPC risk, and GRESB readiness.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {simBuildings.map((b, i) => (
                <div key={i} style={{ background: WHITE, borderRadius: 12, padding: "16px 20px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <input value={b.name} onChange={e => { const s = [...simBuildings]; s[i].name = e.target.value; setSimBuildings(s); }}
                    style={{ padding: "8px 12px", border: "1.5px solid #E2E8F0", borderRadius: 7, fontSize: "0.82rem", fontFamily: sans, color: FOREST }} />
                  <select value={b.type} onChange={e => { const s = [...simBuildings]; s[i].type = e.target.value; setSimBuildings(s); }}
                    style={{ padding: "8px 10px", border: "1.5px solid #E2E8F0", borderRadius: 7, fontSize: "0.78rem", fontFamily: sans, color: FOREST, background: WHITE }}>
                    <option value="office-a">Office A</option>
                    <option value="office-b">Office B</option>
                    <option value="retail">Retail</option>
                    <option value="industrial">Industrial</option>
                  </select>
                  <input type="number" value={b.gla} onChange={e => { const s = [...simBuildings]; s[i].gla = +e.target.value; setSimBuildings(s); }}
                    placeholder="GLA m²"
                    style={{ padding: "8px 12px", border: "1.5px solid #E2E8F0", borderRadius: 7, fontSize: "0.82rem", fontFamily: sans, color: FOREST }} />
                  <input type="number" value={b.year} onChange={e => { const s = [...simBuildings]; s[i].year = +e.target.value; setSimBuildings(s); }}
                    placeholder="Year built"
                    style={{ padding: "8px 12px", border: "1.5px solid #E2E8F0", borderRadius: 7, fontSize: "0.82rem", fontFamily: sans, color: FOREST }} />
                </div>
              ))}
              <button onClick={() => setSimBuildings([...simBuildings, { name: `Building ${simBuildings.length + 1}`, type: "office-a", gla: 10000, year: 2010 }])}
                style={{ background: "none", border: `1.5px dashed #CBD5E0`, borderRadius: 10, padding: "12px", fontSize: "0.8rem", color: DARK_MUTED, cursor: "pointer", fontFamily: sans }}>
                + Add building
              </button>
            </div>
            <button onClick={runSimulator}
              style={{ background: FOREST, color: WHITE, border: "none", padding: "14px 32px", borderRadius: 10, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, marginBottom: 32 }}>
              Generate portfolio insights →
            </button>
            {simResult && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                {[
                  { label: "Total GLA", value: `${(simResult.totalGla / 1000).toFixed(0)}k m²`, sub: "Portfolio gross leasable area", color: FOREST },
                  { label: "Avg energy intensity", value: `${simResult.avgIntensity} kWh/m²`, sub: "vs SAPOA benchmark", color: FOREST2 },
                  { label: "Carbon liability / yr", value: `R${simResult.carbonLiability}M`, sub: "SARS carbon tax exposure", color: CLAY },
                  { label: "EPC risk buildings", value: `${simResult.epcRisk}`, sub: "Require urgent certification", color: "#F59E0B" },
                  { label: "GRESB readiness", value: `${simResult.gresbScore}/100`, sub: "Below SA peer average", color: FOREST3 },
                ].map(r => (
                  <div key={r.label} style={{ background: WHITE, borderRadius: 14, padding: "20px 18px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontFamily: mono, fontSize: "0.58rem", color: DARK_MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{r.label}</div>
                    <div style={{ fontFamily: serif, fontSize: "1.6rem", fontWeight: 900, color: r.color, lineHeight: 1 }}>{r.value}</div>
                    <div style={{ fontFamily: mono, fontSize: "0.6rem", color: DARK_MUTED, marginTop: 6 }}>{r.sub}</div>
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                  <button onClick={() => navigate("/demo")}
                    style={{ background: FOREST, color: WHITE, border: "none", padding: "14px 28px", borderRadius: 10, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                    Get your full portfolio report — request a demo →
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      {activeTab === "home" && (
        <>
          <section style={{ background: WHITE, padding: "100px 56px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: "0.62rem", color: FOREST3, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>How it works</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, color: FOREST, lineHeight: 1.1, marginBottom: 16 }}>Four steps from liability to legacy.</h2>
              <p style={{ fontSize: "0.95rem", color: DARK_MUTED, lineHeight: 1.8, maxWidth: 560, marginBottom: 64 }}>GreenBDG combines SA's deepest green building expertise with a platform built on 13 years of real project data.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
                {[
                  { num: "01", icon: "🔍", title: "Audit & benchmark", body: "GreenBDG's consultants audit your portfolio. Energy consumption, carbon footprint, certification status, FM state. You see the full picture — many clients see it clearly for the first time." },
                  { num: "02", icon: "📊", title: "Onboard to the platform", body: "Your buildings go into the platform — tiered to your pace. One building in 20 minutes. A 50-building portfolio via GreenBDG-assisted migration. Dashboard live from day one." },
                  { num: "03", icon: "⚡", title: "Run your operations", body: "FM tickets, energy monitoring, ESG reporting, carbon tracking — all in one place. Your team works from a single source of truth. No more spreadsheets." },
                  { num: "04", icon: "📈", title: "Report & improve", body: "70% of your annual ESG report generated automatically. GRESB, TCFD, GRI-aligned. Benchmark against peers. Track your net-zero trajectory." },
                ].map(step => (
                  <div key={step.num} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontFamily: mono, fontSize: "0.65rem", color: EMERALD, fontWeight: 600 }}>{step.num} — {step.icon}</div>
                      <div style={{ width: "100%", height: 2, background: `linear-gradient(90deg, ${FOREST2} 0%, transparent 100%)`, marginBottom: 16 }} />
                    </div>
                    <h3 style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 700, color: FOREST, marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ fontSize: "0.88rem", color: DARK_MUTED, lineHeight: 1.75 }}>{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PLATFORM FEATURES ── */}
          <section style={{ background: FOREST, padding: "100px 56px", position: "relative", overflow: "hidden" }}>
            <img src={DASH_IMG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: mono, fontSize: "0.62rem", color: EMERALD, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>The platform</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, color: WHITE, lineHeight: 1.1, marginBottom: 64 }}>What you actually get.</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                {[
                  { num: "01", title: "FM & reactive maintenance", body: "Ticket management, PPM scheduling, contractor coordination, OHS compliance log — all in one place." },
                  { num: "02", title: "Energy & carbon tracking", body: "Scope 1, 2, 3 emissions, SARS carbon tax liability, anomaly detection, solar generation tracking." },
                  { num: "03", title: "Full ESG compliance suite", body: "Green Star V2, EDGE, SANS 10400-XA, B-BBEE, social impact — tracked at building level." },
                  { num: "04", title: "Automated ESG reporting", body: "70% of your annual ESG report generated by the platform. GRI, TCFD, GRESB-aligned." },
                  { num: "05", title: "Certification tracking", body: "Green Star V2, EDGE, LEED, EPC — status, expiry dates, renewal workflows, consultant coordination." },
                  { num: "06", title: "Tenant portal", body: "Tenants log faults, view energy usage, access certifications, and engage with sustainability goals." },
                ].map(f => (
                  <div key={f.num} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontFamily: mono, fontSize: "0.6rem", color: EMERALD, marginBottom: 12 }}>{f.num}</div>
                    <h3 style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 700, color: WHITE, marginBottom: 10 }}>{f.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROOF BAND (Brian's exact) ── */}
          <section style={{ background: FOREST, padding: "72px 56px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: mono, fontSize: "0.6rem", color: EMERALD, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Case study · Sandton · Commercial office</div>
              <h3 style={{ fontFamily: serif, fontSize: "1.35rem", fontWeight: 700, color: WHITE, lineHeight: 1.35, marginBottom: 11 }}>25% energy reduction.<br/>14 months. One platform.</h3>
              <p style={{ fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 16, maxWidth: 240 }}>GreenBDG audited the building systems, deployed smart metering, and tracked performance in real time. Carbon intensity dropped year-on-year. Green Star rating upgraded.</p>
              <a href="#" style={{ fontFamily: mono, fontSize: "0.65rem", color: EMERALD, textDecoration: "none", borderBottom: "1px solid rgba(138,184,154,.3)" }}>Read full case study →</a>
            </div>
            {[{ n: "25", unit: "%", label: "Energy\nsavings" }, { n: "R58", unit: "k", label: "Saved per\nmonth" }, { n: "38", unit: "%", label: "Carbon\nreduction" }].map(s => (
              <div key={s.n} style={{ textAlign: "center", padding: "0 18px", borderLeft: "1px solid rgba(255,255,255,.08)", position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(44px,5vw,62px)", fontWeight: 900, color: WHITE, lineHeight: 1, marginBottom: 6, letterSpacing: "-.02em" }}>
                  {s.n}<span style={{ color: CLAY }}>{s.unit}</span>
                </div>
                <div style={{ fontFamily: mono, fontSize: "0.62rem", color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".08em", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </section>

          {/* ── WHY GREENBDG (Brian's exact 6 cards) ── */}
          <section style={{ background: WHITE, padding: "100px 56px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: "0.65rem", fontWeight: 500, color: CLAY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
                <span style={{ display: "block", width: 20, height: 1, background: CLAY }} />Why GreenBDG
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.022em", color: FOREST, marginBottom: 12 }}>Not another European SaaS<br/><em style={{ fontStyle: "italic", color: CLAY }}>adapted for Africa.</em></h2>
              <p style={{ fontSize: "0.93rem", fontWeight: 300, color: DARK_MUTED, maxWidth: 500, lineHeight: 1.8, marginBottom: 48 }}>Every global competitor was built for EU or US regulatory frameworks. GreenBDG was built from the ground up for SA's grid, certification systems, and legal environment.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {[
                  { num: "01", title: "Built for SA's regulatory stack", body: "Green Star V2, SANS 10400-XA, SARS carbon tax, the Carbon Budget Act — not bolted on after the fact, but the foundation. Measurabl and Deepki don't know what Eskom peak demand charges are." },
                  { num: "02", title: "Software backed by real expertise", body: "GreenBDG's consultants have done 100+ energy audits and EPC certifications. The platform is built on that data. When the software doesn't cover something, a human expert does." },
                  { num: "03", title: "FM-first, not investor-first", body: "Global ESG platforms are built for institutional investors producing reports. GreenBDG is built for the facilities manager whose job it is to actually run the buildings. Reports are a byproduct." },
                  { num: "04", title: "Consulting + platform = the 30%", body: "Every ESG report has 30% that software can't automate. GreenBDG's team does that. No other SaaS provider offers this without a third-party consultant." },
                  { num: "05", title: "SA's data moat", body: "13 years of SA project data is not replicable. A European platform entering SA starts with zero local benchmarks. GreenBDG already has the SAPOA-comparable data layer. That's a 10-year head start." },
                  { num: "06", title: "Social impact built in", body: "B-BBEE, SMME supplier spend, women and youth employment, learnerships — tracked at building level. No global platform does this. It's uniquely African and uniquely GreenBDG." },
                ].map(w => (
                  <div key={w.num} style={{ background: "#F5F0E8", border: "1px solid #E4DDD0", borderRadius: 12, padding: 26, transition: "all 0.3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(27,67,50,0.1)"; (e.currentTarget as HTMLDivElement).style.background = WHITE; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.background = "#F5F0E8"; }}
                  >
                    <div style={{ fontFamily: mono, fontSize: "0.6rem", color: CLAY, letterSpacing: "0.1em", marginBottom: 12 }}>{w.num} —</div>
                    <h3 style={{ fontFamily: serif, fontSize: "1.08rem", fontWeight: 700, color: FOREST, marginBottom: 10, lineHeight: 1.3 }}>{w.title}</h3>
                    <p style={{ fontSize: "0.82rem", fontWeight: 300, color: DARK_MUTED, lineHeight: 1.75 }}>{w.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section style={{ background: FOREST, padding: "100px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <img src={PORTFOLIO_IMG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
            <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: mono, fontSize: "0.65rem", color: EMERALD, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 20 }}>Make the choice</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: WHITE, lineHeight: 1.1, marginBottom: 20 }}>
                Every building is either a liability or a <em>legacy.</em>
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 40 }}>
                Start with your free portfolio check. Know your number before your next board meeting.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                <button onClick={() => setActiveTab("benchmark")}
                  style={{ display: "inline-flex", alignItems: "center", gap: 9, background: EMERALD, color: WHITE, border: "none", padding: "16px 32px", borderRadius: 9, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                  Get my free ESG score
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={() => navigate("/demo")}
                  style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "16px 32px", borderRadius: 9, fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
                  Book a platform walkthrough
                </button>
              </div>
              <p style={{ fontFamily: mono, fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", marginTop: 16 }}>
                Free score = 4-min self-serve, no sign-up &nbsp;·&nbsp; Walkthrough = 30-min guided demo of the SaaS dashboard with a GreenBDG consultant
              </p>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ background: "#0A0A0A", padding: "60px 56px 32px", color: "rgba(255,255,255,0.5)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, background: FOREST2, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                        <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
                        <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
                        <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
                        <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <span style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 700, color: WHITE, display: "block" }}>GreenBDG Africa</span>
                      <span style={{ fontFamily: mono, fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Green Building Design Group</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.7, maxWidth: 280 }}>The digital brain behind sustainable African assets.</p>
                </div>
                {[
                  { title: "Platform", links: ["FM Dashboard", "ESG Module", "Energy & Carbon", "Reporting"] },
                  { title: "Company", links: ["About GreenBDG", "Case studies", "Careers", "Contact"] },
                  { title: "Resources", links: ["ESG Benchmark Tool", "Carbon Calculator", "SA Regulatory Guide", "Blog"] },
                ].map(col => (
                  <div key={col.title}>
                    <div style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 700, color: WHITE, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{col.title}</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {col.links.map(l => (
                        <li key={l}><a href="#" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                          onMouseEnter={e => e.currentTarget.style.color = WHITE}
                          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>{l}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: "0.78rem" }}>© 2025 Green Building Design Group Africa. All rights reserved.</span>
                <span style={{ fontFamily: mono, fontSize: "0.62rem", color: EMERALD }}>Built for SA's regulatory reality.</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
