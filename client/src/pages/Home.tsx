/**
 * PUBLIC HOMEPAGE — "GreenBDG Africa"
 * Design: Brian's HTML — Playfair Display serif + Sora sans + DM Mono
 * Colors: --forest:#1B4332 --clay:#B85042 --sage:#8AB89A --cream:#F5F0E8
 * Layout: Asymmetric two-column hero, cream background, forest green authority
 * Sections: Nav → Hero (with live Portfolio Check widget) → Ticker → How it works → Platform features → Dashboard preview → Why GreenBDG → Case study → Final CTA → Footer
 * CTA: Only "See the platform →" connects to /signin (platform site)
 */
import { useState } from "react";
import { useLocation } from "wouter";

const F = "#1B4332";
const FL = "#2D6A4F";
const FXL = "#52796F";
const CLAY = "#B85042";
const CLAY_LT = "#D4826E";
const SAGE = "#8AB89A";
const SAGE_LT = "#D8EDE0";
const SAGE_XLT = "#EBF5EE";
const CREAM = "#F5F0E8";
const CREAM2 = "#EDE6D8";
const CREAM3 = "#E4DDD0";
const INK = "#1A1A18";
const MID = "#4A4A46";
const MUTED = "#8A8880";

const serif = "'Playfair Display', Georgia, serif";
const sans = "'Sora', sans-serif";
const mono = "'DM Mono', monospace";

export default function Home() {
  const [, navigate] = useLocation();

  // Portfolio Intelligence Check widget state
  const [buildings, setBuildings] = useState(21);
  const [gla, setGla] = useState(3500);
  const [energy, setEnergy] = useState<"eskom" | "solar" | "mixed">("eskom");
  const [showReport, setShowReport] = useState(false);

  // Computed results
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
    let rating = "Excellent"; let color = "#2D6A4F";
    if (ratio > 1.5) { rating = "Critical"; color = "#B85042"; }
    else if (ratio > 1.2) { rating = "Poor"; color = "#D4826E"; }
    else if (ratio > 1.0) { rating = "Below average"; color = "#B8860B"; }
    else if (ratio > 0.85) { rating = "Average"; color = "#52796F"; }
    setBmResult({ intensity, benchmark, rating, color });
  };

  // Building simulator
  const [simBuildings, setSimBuildings] = useState([
    { name: "Sandton Towers", type: "office-a", gla: 18500, year: 2008 },
    { name: "Rosebank Square", type: "office-b", gla: 12200, year: 2001 },
    { name: "Menlyn Park Retail", type: "retail", gla: 45000, year: 1995 },
  ]);
  const [simGenerated, setSimGenerated] = useState(false);

  const addSimBuilding = () => {
    if (simBuildings.length < 10) {
      setSimBuildings([...simBuildings, { name: `Building ${simBuildings.length + 1}`, type: "office-b", gla: 8000, year: 2005 }]);
    }
  };

  const generateSim = () => setSimGenerated(true);

  const simResults = simBuildings.map(b => {
    const bench = benchmarks[b.type] || 142;
    const intensity = bench * (0.85 + Math.random() * 0.6);
    const carbonTons = (b.gla * intensity * 0.00092);
    const tax = Math.round(carbonTons * 236);
    const age = 2025 - b.year;
    const epcRisk = age > 20 ? "High" : age > 10 ? "Medium" : "Low";
    return { ...b, intensity: Math.round(intensity), carbonTons: Math.round(carbonTons), tax, epcRisk };
  });

  const navItems = ["About us", "The platform", "Solutions", "Free tools", "Resources"];

  return (
    <div style={{ fontFamily: sans, background: CREAM, color: INK, minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(245,240,232,0.96)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${CREAM3}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 66,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: F, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 19, height: 19 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9" /></svg>
            </div>
            <div>
              <span style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: F, display: "block", lineHeight: 1.15 }}>GreenBDG</span>
              <span style={{ fontFamily: mono, fontSize: "0.5rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.14em", display: "block" }}>Africa</span>
            </div>
          </a>
          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "stretch", height: 66, gap: 0 }}>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => item === "Free tools" ? setActiveTab("benchmark") : null}
                style={{
                  display: "flex", alignItems: "center", padding: "0 15px",
                  fontSize: "0.82rem", fontWeight: 500, color: MID,
                  background: "none", border: "none",
                  borderBottom: `2.5px solid transparent`,
                  cursor: "pointer", transition: "color 0.2s",
                  fontFamily: sans,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = F; e.currentTarget.style.borderBottomColor = F; }}
                onMouseLeave={e => { e.currentTarget.style.color = MID; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/signin")}
            style={{ background: "transparent", color: MID, border: `1.5px solid ${CREAM3}`, padding: "8px 18px", borderRadius: 7, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = F; e.currentTarget.style.color = F; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = CREAM3; e.currentTarget.style.color = MID; }}
          >
            Client login
          </button>
          <button
            onClick={() => navigate("/signin")}
            style={{ background: F, color: "white", border: "none", padding: "9px 20px", borderRadius: 7, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, letterSpacing: "0.01em" }}
            onMouseEnter={e => { e.currentTarget.style.background = FL; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = F; e.currentTarget.style.transform = "none"; }}
          >
            See the platform →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", background: SAGE_XLT,
        display: "grid", gridTemplateColumns: "1.05fr 0.95fr",
        gap: 56, alignItems: "center",
        padding: "130px 56px 90px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ghost watermark */}
        <div style={{
          position: "absolute", bottom: -80, right: -40,
          fontFamily: serif, fontSize: "clamp(150px,22vw,280px)", fontWeight: 900,
          color: "rgba(27,67,50,0.035)", lineHeight: 1, pointerEvents: "none",
          userSelect: "none", letterSpacing: "-0.04em",
        }}>LEGACY</div>

        {/* Left: copy */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: "0.65rem", fontWeight: 500, color: FL, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 26 }}>
            <span style={{ display: "block", width: 22, height: 1, background: FL }} />
            SA's green building intelligence platform
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(40px,5.2vw,68px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.028em", color: F, marginBottom: 4 }}>
            Every building is either
          </h1>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(40px,5.2vw,68px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.08, letterSpacing: "-0.028em", color: CLAY, marginBottom: 4 }}>
            a liability
          </h1>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, letterSpacing: "-0.02em", color: FXL, marginBottom: 32 }}>
            or a legacy.
          </h1>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, color: MID, lineHeight: 1.85, maxWidth: 440, marginBottom: 36 }}>
            GreenBDG helps you choose. <strong style={{ color: F, fontWeight: 600 }}>FM operations · ESG reporting · Carbon compliance · Green Star certification</strong> — one platform, built for SA's regulatory reality.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("benchmark")}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: F, color: "white", border: "none", padding: "14px 26px", borderRadius: 8, fontSize: "0.86rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}
              onMouseEnter={e => { e.currentTarget.style.background = FL; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = F; e.currentTarget.style.transform = "none"; }}
            >
              Try free portfolio check →
            </button>
            <button
              onClick={() => navigate("/signin")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: F, border: `1.5px solid rgba(27,67,50,0.28)`, padding: "14px 26px", borderRadius: 8, fontSize: "0.86rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = F; e.currentTarget.style.background = "rgba(27,67,50,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(27,67,50,0.28)"; e.currentTarget.style.background = "transparent"; }}
            >
              See the platform
            </button>
          </div>
          <p style={{ fontFamily: mono, fontSize: "0.6rem", color: MUTED, marginTop: 12, lineHeight: 1.7 }}>
            Free check = 4 min, no sign-up &nbsp;·&nbsp; Platform = full interactive demo, no account needed
          </p>
        </div>

        {/* Right: Portfolio Intelligence Check card */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            background: "white", borderRadius: 16, padding: 28,
            boxShadow: "0 24px 64px rgba(27,67,50,0.13), 0 4px 16px rgba(0,0,0,0.06)",
            border: `1px solid ${SAGE_LT}`, overflow: "hidden", position: "relative",
          }}>
            {/* Top accent bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${F}, ${CLAY})` }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 10 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: "0.63rem", fontWeight: 500, color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 5 }}>Portfolio Intelligence Check</div>
                <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 700, color: F, lineHeight: 1.3 }}>3 inputs → your full risk picture</div>
              </div>
              <span style={{ background: SAGE_XLT, color: F, fontFamily: mono, fontSize: "0.58rem", padding: "4px 9px", borderRadius: 20, border: `1px solid ${SAGE}`, whiteSpace: "nowrap", flexShrink: 0 }}>Free · No sign-up</span>
            </div>

            {/* Sliders */}
            {[
              { label: "Buildings in portfolio", value: buildings, min: 1, max: 100, display: `${buildings} buildings`, onChange: (v: number) => setBuildings(v) },
              { label: "Average GLA per building (m²)", value: gla, min: 500, max: 50000, display: `${gla.toLocaleString()} m²`, onChange: (v: number) => setGla(v) },
            ].map(sl => (
              <div key={sl.label} style={{ marginBottom: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 500, color: MID }}>{sl.label}</span>
                  <span style={{ fontFamily: mono, fontSize: "0.72rem", fontWeight: 500, color: FL }}>{sl.display}</span>
                </div>
                <input type="range" min={sl.min} max={sl.max} value={sl.value}
                  onChange={e => sl.onChange(Number(e.target.value))}
                  style={{ width: "100%", accentColor: F, cursor: "pointer" }}
                />
              </div>
            ))}

            {/* Energy source */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: "0.76rem", fontWeight: 500, color: MID, marginBottom: 8 }}>Primary energy source</div>
              <div style={{ display: "flex", gap: 8 }}>
                {(["eskom", "solar", "mixed"] as const).map(e => (
                  <button key={e} onClick={() => setEnergy(e)}
                    style={{ flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: "0.72rem", fontWeight: 500, cursor: "pointer", fontFamily: sans, border: `1.5px solid ${energy === e ? F : CREAM3}`, background: energy === e ? F : "white", color: energy === e ? "white" : MID, transition: "all 0.15s" }}>
                    {e === "eskom" ? "Eskom grid" : e === "solar" ? "Solar mix" : "Mixed"}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Carbon tax exposure / yr", value: `R${(carbonTax / 1000000).toFixed(1)}M`, sub: `SARS · R236/tCO₂e`, color: CLAY },
                { label: "ESG readiness score", value: `${Math.round(esgScore)}/100`, sub: "Below SA peer avg", color: FL },
                { label: "Certification risk", value: `${certRisk} bldgs`, sub: "No current EPC", color: "#B8860B" },
              ].map(r => (
                <div key={r.label} style={{ background: SAGE_XLT, borderRadius: 10, padding: "12px 10px", border: `1px solid ${SAGE_LT}` }}>
                  <div style={{ fontFamily: mono, fontSize: "0.6rem", color: MUTED, marginBottom: 4, lineHeight: 1.3 }}>{r.label}</div>
                  <div style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.value}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.58rem", color: MUTED }}>{r.sub}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowReport(true)}
              style={{ width: "100%", padding: "13px", background: F, color: "white", border: "none", borderRadius: 9, fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, marginBottom: 8 }}
              onMouseEnter={e => { e.currentTarget.style.background = FL; }}
              onMouseLeave={e => { e.currentTarget.style.background = F; }}
            >
              Get my full portfolio report →
            </button>
            <p style={{ fontFamily: mono, fontSize: "0.58rem", color: MUTED, textAlign: "center" }}>Full report in 4 minutes · PDF delivered to your inbox</p>

            {showReport && (
              <div style={{ marginTop: 16, padding: "14px 16px", background: SAGE_XLT, borderRadius: 10, border: `1px solid ${SAGE}` }}>
                <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, fontWeight: 500 }}>✓ Report queued — check your inbox in 4 minutes</div>
              </div>
            )}
          </div>

          {/* Trusted by */}
          <div style={{ marginTop: 20, padding: "14px 20px", background: "rgba(255,255,255,0.7)", borderRadius: 12, border: `1px solid ${CREAM3}` }}>
            <div style={{ fontFamily: mono, fontSize: "0.6rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Trusted by</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Growthpoint", "Redefine", "Liberty Two Degrees", "Momentum", "Eris Property"].map(name => (
                <span key={name} style={{ fontFamily: serif, fontSize: "0.78rem", fontWeight: 700, color: F, opacity: 0.7 }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE TOOLS TABS (Benchmark + Simulator) ── */}
      {(activeTab === "benchmark" || activeTab === "simulator") && (
        <section style={{ background: "white", padding: "80px 56px", borderTop: `1px solid ${CREAM3}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48, borderBottom: `2px solid ${CREAM3}` }}>
              {(["benchmark", "simulator"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: "12px 28px", fontSize: "0.88rem", fontWeight: 600, fontFamily: sans, background: "none", border: "none", cursor: "pointer", color: activeTab === tab ? F : MID, borderBottom: `2.5px solid ${activeTab === tab ? F : "transparent"}`, marginBottom: -2, transition: "all 0.2s" }}>
                  {tab === "benchmark" ? "🔬 ESG Benchmark Tool" : "🏗️ Building Simulator"}
                </button>
              ))}
              <button onClick={() => setActiveTab("home")} style={{ marginLeft: "auto", padding: "8px 16px", fontSize: "0.78rem", color: MUTED, background: "none", border: "none", cursor: "pointer", fontFamily: sans }}>✕ Close</button>
            </div>

            {/* Benchmark Tool */}
            {activeTab === "benchmark" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                <div>
                  <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 12 }}>Free · No sign-up required</div>
                  <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 16 }}>How does your building rank?</h2>
                  <p style={{ fontSize: "0.9rem", color: MID, lineHeight: 1.8, marginBottom: 32 }}>Enter your building's energy consumption and see how it stacks up against SAPOA benchmarks for your building type.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK, marginBottom: 8 }}>Building type</label>
                      <select value={bmType} onChange={e => setBmType(e.target.value as typeof bmType)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${CREAM3}`, fontSize: "0.88rem", fontFamily: sans, color: INK, background: "white", cursor: "pointer" }}>
                        {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK, marginBottom: 8 }}>Total GLA (m²): <span style={{ fontFamily: mono, color: FL }}>{bmGla.toLocaleString()}</span></label>
                      <input type="range" min={500} max={100000} step={500} value={bmGla} onChange={e => setBmGla(Number(e.target.value))} style={{ width: "100%", accentColor: F }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK, marginBottom: 8 }}>Annual energy consumption (kWh): <span style={{ fontFamily: mono, color: FL }}>{bmKwh.toLocaleString()}</span></label>
                      <input type="range" min={50000} max={10000000} step={50000} value={bmKwh} onChange={e => setBmKwh(Number(e.target.value))} style={{ width: "100%", accentColor: F }} />
                    </div>
                    <button onClick={runBenchmark}
                      style={{ padding: "14px 28px", background: F, color: "white", border: "none", borderRadius: 8, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, alignSelf: "flex-start" }}>
                      Benchmark now →
                    </button>
                  </div>
                </div>

                <div>
                  {bmResult ? (
                    <div style={{ background: SAGE_XLT, borderRadius: 16, padding: 32, border: `1px solid ${SAGE_LT}` }}>
                      <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>Your results</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                        {[
                          { label: "Your intensity", value: `${bmResult.intensity} kWh/m²/yr`, color: bmResult.color },
                          { label: "SAPOA benchmark", value: `${bmResult.benchmark} kWh/m²/yr`, color: FL },
                          { label: "Rating", value: bmResult.rating, color: bmResult.color },
                          { label: "vs benchmark", value: `${bmResult.intensity > bmResult.benchmark ? "+" : ""}${Math.round(((bmResult.intensity - bmResult.benchmark) / bmResult.benchmark) * 100)}%`, color: bmResult.color },
                        ].map(r => (
                          <div key={r.label} style={{ background: "white", borderRadius: 10, padding: "16px 14px" }}>
                            <div style={{ fontFamily: mono, fontSize: "0.6rem", color: MUTED, marginBottom: 6 }}>{r.label}</div>
                            <div style={{ fontFamily: serif, fontSize: "1.3rem", fontWeight: 700, color: r.color }}>{r.value}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: "16px", background: "white", borderRadius: 10, borderLeft: `4px solid ${bmResult.color}` }}>
                        <div style={{ fontSize: "0.82rem", color: MID, lineHeight: 1.7 }}>
                          {bmResult.rating === "Excellent" && "Your building is performing well above the SAPOA benchmark. Consider pursuing Green Star certification to formalise this performance."}
                          {bmResult.rating === "Average" && "Your building is tracking close to the SAPOA benchmark. Targeted efficiency measures could move you into the top quartile."}
                          {bmResult.rating === "Below average" && "Your building is consuming above the SAPOA benchmark. An energy audit would identify the highest-impact interventions."}
                          {bmResult.rating === "Poor" && "Your building is significantly above benchmark. This represents a material carbon tax liability and Green Star certification risk."}
                          {bmResult.rating === "Critical" && "Your building is in the critical range. Immediate action is required to manage SARS carbon tax exposure and avoid EPC non-compliance."}
                        </div>
                      </div>
                      <button onClick={() => navigate("/signin")} style={{ marginTop: 20, width: "100%", padding: "13px", background: F, color: "white", border: "none", borderRadius: 9, fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                        See full platform →
                      </button>
                    </div>
                  ) : (
                    <div style={{ background: SAGE_XLT, borderRadius: 16, padding: 32, border: `1px solid ${SAGE_LT}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, textAlign: "center" }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🔬</div>
                      <div style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 700, color: F, marginBottom: 8 }}>Your benchmark results will appear here</div>
                      <div style={{ fontSize: "0.82rem", color: MUTED }}>Adjust the inputs and click "Benchmark now"</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Building Simulator */}
            {activeTab === "simulator" && (
              <div>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 12 }}>Free · Up to 10 buildings</div>
                  <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 16 }}>See your portfolio insights before you buy.</h2>
                  <p style={{ fontSize: "0.9rem", color: MID, lineHeight: 1.8, maxWidth: 600 }}>Enter your buildings below and we'll generate a full portfolio risk picture — energy intensity, carbon liability, EPC risk, and GRESB readiness.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {simBuildings.map((b, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr auto", gap: 12, alignItems: "center", background: "white", borderRadius: 12, padding: "16px 20px", border: `1px solid ${CREAM3}` }}>
                      <input value={b.name} onChange={e => { const nb = [...simBuildings]; nb[i].name = e.target.value; setSimBuildings(nb); }}
                        style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${CREAM3}`, fontSize: "0.84rem", fontFamily: sans, color: INK }} />
                      <select value={b.type} onChange={e => { const nb = [...simBuildings]; nb[i].type = e.target.value; setSimBuildings(nb); }}
                        style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${CREAM3}`, fontSize: "0.84rem", fontFamily: sans, color: INK }}>
                        {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                      <input type="number" value={b.gla} onChange={e => { const nb = [...simBuildings]; nb[i].gla = Number(e.target.value); setSimBuildings(nb); }}
                        placeholder="GLA m²" style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${CREAM3}`, fontSize: "0.84rem", fontFamily: sans, color: INK }} />
                      <input type="number" value={b.year} onChange={e => { const nb = [...simBuildings]; nb[i].year = Number(e.target.value); setSimBuildings(nb); }}
                        placeholder="Year built" style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${CREAM3}`, fontSize: "0.84rem", fontFamily: sans, color: INK }} />
                      <button onClick={() => setSimBuildings(simBuildings.filter((_, j) => j !== i))}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: CREAM2, border: "none", cursor: "pointer", fontSize: 14, color: MUTED }}>×</button>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
                  {simBuildings.length < 10 && (
                    <button onClick={addSimBuilding} style={{ padding: "12px 22px", background: "white", color: F, border: `1.5px solid ${CREAM3}`, borderRadius: 8, fontSize: "0.84rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
                      + Add building
                    </button>
                  )}
                  <button onClick={generateSim} style={{ padding: "12px 28px", background: F, color: "white", border: "none", borderRadius: 8, fontSize: "0.86rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                    Generate portfolio insights →
                  </button>
                </div>

                {simGenerated && (
                  <div>
                    <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 24 }}>Portfolio insights — {simBuildings.length} buildings</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {simResults.map((b, i) => (
                        <div key={i} style={{ background: "white", borderRadius: 12, padding: "20px 24px", border: `1px solid ${CREAM3}`, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: INK, marginBottom: 2 }}>{b.name}</div>
                            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED }}>{typeLabels[b.type]} · {b.gla.toLocaleString()} m²</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED, marginBottom: 3 }}>Energy intensity</div>
                            <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: b.intensity > benchmarks[b.type] ? CLAY : FL }}>{b.intensity} kWh/m²</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED, marginBottom: 3 }}>Carbon (tCO₂e)</div>
                            <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: F }}>{b.carbonTons.toLocaleString()}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED, marginBottom: 3 }}>Carbon tax / yr</div>
                            <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: CLAY }}>R{(b.tax / 1000).toFixed(0)}k</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED, marginBottom: 3 }}>EPC risk</div>
                            <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600, background: b.epcRisk === "High" ? "#FDF0EB" : b.epcRisk === "Medium" ? "#FFF8E1" : SAGE_XLT, color: b.epcRisk === "High" ? CLAY : b.epcRisk === "Medium" ? "#B8860B" : FL }}>{b.epcRisk}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 32, padding: "24px 28px", background: F, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: 4 }}>Want the full platform experience?</div>
                        <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>Live dashboards, automated reporting, FM ticketing — all in one place.</div>
                      </div>
                      <button onClick={() => navigate("/signin")} style={{ padding: "12px 24px", background: "white", color: F, border: "none", borderRadius: 8, fontSize: "0.86rem", fontWeight: 600, cursor: "pointer", fontFamily: sans, whiteSpace: "nowrap" }}>
                        See the platform →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── REGULATORY TICKER ── */}
      <div style={{ background: F, padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 48, animation: "none", padding: "0 48px", flexWrap: "wrap" }}>
          {[
            "Carbon Budget Act (2024) is now in force.",
            "CIPC Notice 6 of 2025 mandates ESG disclosure.",
            "JHB, CPT & Tshwane: net-zero for all new builds by 2030.",
          ].map((item, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: "0.72rem", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: CLAY, display: "inline-block", flexShrink: 0 }} />
              {item}
              {i < 2 && <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>·</span>}
            </span>
          ))}
          <a href="#" style={{ fontFamily: mono, fontSize: "0.72rem", color: SAGE_LT, textDecoration: "none", marginLeft: "auto", whiteSpace: "nowrap" }}>SA regulatory guide →</a>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: CREAM, padding: "100px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>How it works</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 20 }}>Four steps from liability to legacy.</h2>
              <p style={{ fontSize: "0.88rem", color: MID, lineHeight: 1.8 }}>GreenBDG combines SA's deepest green building expertise with a platform built on 13 years of real project data.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { num: "01", icon: "🔍", title: "Audit & benchmark", body: "GreenBDG's consultants audit your portfolio. Energy consumption, carbon footprint, certification status, FM state. You see the full picture — many clients see it clearly for the first time." },
                { num: "02", icon: "📊", title: "Onboard to the platform", body: "Your buildings go into the platform — tiered to your pace. One building in 20 minutes. A 50-building portfolio via GreenBDG-assisted migration. Dashboard live from day one." },
                { num: "03", icon: "⚡", title: "Run your portfolio", body: "Your FM team manages tickets, PPM schedules, and utility anomalies daily. Carbon and ESG data updates automatically. You always know what's broken, where, and who's fixing it." },
                { num: "04", icon: "📄", title: "Report with confidence", body: "The platform builds 70% of your ESG report. GreenBDG's sustainability team closes the 30%. GRI-aligned, TCFD-structured, GRESB-ready — delivered on time, every time." },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 24, padding: "28px 0", borderBottom: i < 3 ? `1px solid ${CREAM3}` : "none" }}>
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED }}>{step.num} —</div>
                    <div style={{ fontSize: 24 }}>{step.icon}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 700, color: F, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: "0.88rem", color: MID, lineHeight: 1.8 }}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ── */}
      <section style={{ background: "white", padding: "100px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>The platform</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, color: F, lineHeight: 1.1 }}>What you actually get.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { num: "01", title: "FM & reactive maintenance", body: "Ticket management, PPM scheduling, contractor coordination, OHS compliance log — all in one place." },
              { num: "02", title: "Energy & carbon tracking", body: "Scope 1, 2, 3 emissions, SARS carbon tax liability, anomaly detection, solar generation tracking." },
              { num: "03", title: "Full ESG compliance suite", body: "Green Star V2, EDGE, SANS 10400-XA, B-BBEE, social impact — tracked at building level." },
              { num: "04", title: "Automated ESG reporting", body: "70% of your annual ESG report generated by the platform. GRI, TCFD, GRESB-aligned." },
              { num: "05", title: "Certification tracking", body: "Green Star V2, EDGE, LEED, EPC — status, expiry dates, and renewal alerts across your whole portfolio." },
              { num: "06", title: "Multi-role dashboards", body: "CFO, Sustainability Manager, Portfolio Manager, Building Manager, FM, and Tenant — each with a tailored view." },
            ].map((feat, i) => (
              <div key={i} style={{ padding: "28px 24px", background: SAGE_XLT, borderRadius: 14, border: `1px solid ${SAGE_LT}`, transition: "transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
                <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, marginBottom: 12 }}>{feat.num}</div>
                <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: F, marginBottom: 10, lineHeight: 1.3 }}>{feat.title}</div>
                <div style={{ fontSize: "0.84rem", color: MID, lineHeight: 1.75 }}>{feat.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section style={{ background: CREAM2, padding: "100px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>Live dashboard</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 20 }}>Your portfolio at a glance.</h2>
              <p style={{ fontSize: "0.88rem", color: MID, lineHeight: 1.8, marginBottom: 28 }}>Real-time KPIs, critical ticket alerts, and ESG scores — all on one screen. No spreadsheets. No waiting for monthly reports.</p>
              <button onClick={() => navigate("/signin")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", background: F, color: "white", border: "none", borderRadius: 8, fontSize: "0.86rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Enter your own buildings and see your dashboard →
              </button>
            </div>
            {/* Mock dashboard card */}
            <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 20px 60px rgba(27,67,50,0.1)", border: `1px solid ${SAGE_LT}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${F}, ${CLAY})` }} />
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["Dashboard", "FM", "ESG", "Carbon"].map(tab => (
                  <span key={tab} style={{ padding: "5px 12px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 500, background: tab === "Dashboard" ? F : SAGE_XLT, color: tab === "Dashboard" ? "white" : MID, fontFamily: sans }}>{tab}</span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Open tickets", value: "6", sub: "↑ 2 critical", color: CLAY },
                  { label: "ESG score", value: "68/100", sub: "↑ +4 this qtr", color: FL },
                  { label: "Carbon (tCO₂e)", value: "1,240", sub: "↓ 12% vs last yr", color: F },
                  { label: "Cert expiring", value: "3", sub: "Within 90 days", color: "#B8860B" },
                ].map(kpi => (
                  <div key={kpi.label} style={{ background: SAGE_XLT, borderRadius: 10, padding: "12px 10px" }}>
                    <div style={{ fontFamily: mono, fontSize: "0.58rem", color: MUTED, marginBottom: 4 }}>{kpi.label}</div>
                    <div style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 700, color: kpi.color, marginBottom: 2 }}>{kpi.value}</div>
                    <div style={{ fontFamily: mono, fontSize: "0.58rem", color: MUTED }}>{kpi.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: mono, fontSize: "0.62rem", color: MUTED, marginBottom: 10 }}>Portfolio health</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Sandton HQ", "Rosebank B", "Midrand C", "Centurion 4", "Waterfall 1", "Fourways D"].map((b, i) => (
                    <span key={b} style={{ padding: "4px 10px", borderRadius: 20, fontSize: "0.7rem", background: i === 0 ? "#FDF0EB" : i === 5 ? "#FFF3E0" : SAGE_XLT, color: i === 0 ? CLAY : i === 5 ? "#B8860B" : FL, fontFamily: mono }}>{b}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: "0.62rem", color: MUTED, marginBottom: 10 }}>Critical tickets · 6 open</div>
                {[
                  { text: "HVAC fault — Sandton HQ B3", type: "HVAC" },
                  { text: "Geyser burst — Rosebank P1", type: "Plumbing" },
                  { text: "Elec anomaly — Fourways D", type: "Electrical" },
                ].map(t => (
                  <div key={t.text} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${CREAM3}` }}>
                    <span style={{ fontSize: "0.78rem", color: INK }}>{t.text}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", background: CREAM2, color: MID, fontFamily: mono }}>{t.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY GREENBDG ── */}
      <section style={{ background: F, padding: "100px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: mono, fontSize: "0.65rem", color: SAGE, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>Why GreenBDG</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 16 }}>Not another European SaaS<br /><em style={{ fontWeight: 400 }}>adapted for Africa.</em></h2>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 560 }}>Every global competitor was built for EU or US regulatory frameworks. GreenBDG was built from the ground up for SA's grid, certification systems, and legal environment.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { num: "01 —", title: "Built for SA's regulatory stack", body: "Green Star V2, SANS 10400-XA, SARS carbon tax, the Carbon Budget Act — not bolted on after the fact, but the foundation. Measurabl and Deepki don't know what Eskom peak demand charges are." },
              { num: "02 —", title: "Software backed by real expertise", body: "GreenBDG's consultants have done 100+ energy audits and EPC certifications. The platform is built on that data. When the software doesn't cover something, a human expert does." },
              { num: "03 —", title: "FM-first, not investor-first", body: "Global ESG platforms are built for institutional investors producing reports. GreenBDG is built for the facilities manager whose job it is to actually run the buildings. Reports are a byproduct." },
              { num: "04 —", title: "Consulting + platform = the 30%", body: "Every ESG report has 30% that software can't automate. GreenBDG's team does that. No other SaaS provider offers this without a third-party consultant." },
              { num: "05 —", title: "SA's data moat", body: "13 years of SA project data is not replicable. A European platform entering SA starts with zero local benchmarks. GreenBDG already has the SAPOA-comparable data layer. That's a 10-year head start." },
              { num: "06 —", title: "Social impact built in", body: "B-BBEE, SMME supplier spend, women and youth employment, learnerships — tracked at building level. No global platform does this. It's uniquely African and uniquely GreenBDG." },
            ].map((card, i) => (
              <div key={i} style={{ padding: "28px 24px", background: "rgba(255,255,255,0.06)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontFamily: mono, fontSize: "0.65rem", color: SAGE, marginBottom: 12 }}>{card.num}</div>
                <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.3 }}>{card.title}</div>
                <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section style={{ background: CREAM, padding: "100px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 16 }}>Case study · Sandton · Commercial office</div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 20 }}>25% energy reduction.<br /><em style={{ fontWeight: 400, color: CLAY }}>14 months. One platform.</em></h2>
              <p style={{ fontSize: "0.9rem", color: MID, lineHeight: 1.8, marginBottom: 32 }}>GreenBDG audited the building systems, deployed smart metering, and tracked performance in real time. Carbon intensity dropped year-on-year. Green Star rating upgraded.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.86rem", fontWeight: 600, color: F, textDecoration: "none", borderBottom: `1.5px solid ${F}`, paddingBottom: 2 }}>Read full case study →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { value: "25%", label: "Energy\nsavings" },
                { value: "R58k", label: "Saved per\nmonth" },
                { value: "38%", label: "Carbon\nreduction" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "white", borderRadius: 14, padding: "28px 20px", textAlign: "center", boxShadow: "0 4px 20px rgba(27,67,50,0.08)", border: `1px solid ${SAGE_LT}` }}>
                  <div style={{ fontFamily: serif, fontSize: "2.4rem", fontWeight: 900, color: F, lineHeight: 1, marginBottom: 8 }}>{stat.value}</div>
                  <div style={{ fontFamily: mono, fontSize: "0.65rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "pre-line", lineHeight: 1.5 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: SAGE_XLT, padding: "100px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: mono, fontSize: "0.65rem", color: FL, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 20 }}>Make the choice</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: F, lineHeight: 1.1, marginBottom: 20 }}>Every building is either a liability or a legacy.</h2>
          <p style={{ fontSize: "0.9rem", color: MID, lineHeight: 1.8, marginBottom: 40 }}>Start with your free portfolio check. Know your number before your next board meeting.</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("benchmark")}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: F, color: "white", border: "none", padding: "16px 32px", borderRadius: 9, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
              Get my free ESG score
            </button>
            <button onClick={() => navigate("/signin")}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "white", color: F, border: `1.5px solid rgba(27,67,50,0.25)`, padding: "16px 32px", borderRadius: 9, fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
              Book a platform walkthrough
            </button>
          </div>
          <p style={{ fontFamily: mono, fontSize: "0.62rem", color: MUTED, marginTop: 16 }}>
            Free score = 4-min self-serve, no sign-up &nbsp;·&nbsp; Walkthrough = 30-min guided demo with a GreenBDG consultant
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: INK, padding: "60px 56px 32px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: F, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9" /></svg>
                </div>
                <div>
                  <span style={{ fontFamily: serif, fontSize: "0.95rem", fontWeight: 700, color: "white", display: "block" }}>GreenBDG Africa</span>
                  <span style={{ fontFamily: mono, fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Green Building Design Group</span>
                </div>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7, maxWidth: 260 }}>The digital brain behind sustainable African assets.</p>
            </div>
            {[
              { title: "Platform", links: ["FM Dashboard", "ESG Module", "Energy & Carbon", "Reporting"] },
              { title: "Company", links: ["About GreenBDG", "Case studies", "Careers", "Contact"] },
              { title: "Resources", links: ["ESG Benchmark Tool", "Carbon Calculator", "SA Regulatory Guide", "Blog"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: mono, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.78rem" }}>© 2025 Green Building Design Group Africa. All rights reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Terms", "Cookies"].map(l => (
                <a key={l} href="#" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
