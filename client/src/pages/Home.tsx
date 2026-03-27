/**
 * GreenBDG Africa — Public Homepage (Enterprise)
 * CRISP PLUSH design: white canvas, full-bleed aerial photography, Libre Baskerville display
 * NO sign-in / start-setup CTAs — enterprise SaaS, not self-serve
 * Two tabs: Platform Overview | Building Simulator
 * Interactive widgets: Sustainability Benchmarker + Carbon Tax Calculator
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight, CheckCircle2, Upload, Wifi, PenLine,
  Building2, Leaf, TrendingUp, Shield, FileText, Users,
  Calculator, BarChart3, Plus, Trash2, ChevronDown, ChevronUp,
  Mail, Phone
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-landing-8seFcF2qiNuDz9kZrpcgfa.webp";
const SUSTAINABILITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-sustainability_dd5b65c0.jpg";
const PORTFOLIO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-portfolio-jskySYAbc4ZEh7pr9VxGG2.webp";

// SAPOA benchmarks kWh/m²/year
const BENCHMARKS: Record<string, { label: string; benchmark: number; good: number; poor: number }> = {
  office_a: { label: "Office A-Grade", benchmark: 142, good: 120, poor: 180 },
  office_b: { label: "Office B-Grade", benchmark: 168, good: 140, poor: 210 },
  retail: { label: "Retail Centre", benchmark: 210, good: 175, poor: 260 },
  industrial: { label: "Industrial / Warehouse", benchmark: 95, good: 75, poor: 130 },
  hotel: { label: "Hotel", benchmark: 280, good: 230, poor: 340 },
  mixed: { label: "Mixed-Use", benchmark: 175, good: 145, poor: 220 },
};

const EMISSION_FACTOR = 0.9 ; // kgCO₂e per kWh (Eskom grid, 2024)
const CARBON_RATE_2024 = 236; // R per tCO₂e
const CARBON_RATE_2030 = 472;

const benefits = [
  { icon: <Shield size={22} className="text-[#064E3B]" />, title: "EPC Compliance", sub: "SANS 1544 · SANEDI", body: "Automated tracking of Energy Performance Certificates across your entire portfolio. Expiry alerts, renewal scheduling, and audit-ready documentation — eliminating the R5M non-compliance penalty risk." },
  { icon: <TrendingUp size={22} className="text-[#064E3B]" />, title: "Carbon Tax Intelligence", sub: "SARS Carbon Tax Act", body: "Real-time carbon liability calculations at R236/tCO₂e, escalating to R472/t by 2030. CapEx scenario modelling shows your CFO exactly which projects reduce tax exposure the most." },
  { icon: <FileText size={22} className="text-[#064E3B]" />, title: "ESG Reporting (70/30)", sub: "GRESB · TCFD · GRI", body: "The platform auto-generates 70% of your annual ESG report from operational data. GreenBDG's consulting team writes the remaining 30% — materiality narrative, TCFD framing, executive sign-off." },
  { icon: <Building2 size={22} className="text-[#064E3B]" />, title: "Live Building Intelligence", sub: "BMS · IoT · Real-time", body: "Connect your BMS, smart meters, and IoT sensors for live energy, water, HVAC, and fault data. Anomaly detection flags issues before they become costly failures." },
  { icon: <Users size={22} className="text-[#064E3B]" />, title: "Tenant Portal", sub: "3-tap fault reporting", body: "Tenants log faults in three taps via QR code, mobile app, or web portal. Every contractor assignment automatically captures B-BBEE level to your ESG Social metrics." },
  { icon: <Leaf size={22} className="text-[#064E3B]" />, title: "Portfolio Benchmarking", sub: "SAPOA · Green Star · EDGE", body: "Compare every building against SAPOA peers. Track Green Star and EDGE certification pipelines. Identify underperformers before they drag down your GRESB score." },
];

const dataPathways = [
  { step: "01", icon: <Upload size={20} />, title: "Day 1 — CSV Bulk Upload", desc: "Your implementation lead uploads your building portfolio and staff list via a structured CSV template. Historical energy and financial data imported in the same session.", color: "#064E3B", bg: "#E8F0EC" },
  { step: "02", icon: <Wifi size={20} />, title: "Week 2–4 — API & BMS Integration", desc: "Connect your Building Management System (BACnet, Modbus), smart meters, and utility accounts. Live energy, water, and HVAC data flows automatically. No manual entry required once connected.", color: "#0A6B4F", bg: "#EAF4EE" },
  { step: "03", icon: <PenLine size={20} />, title: "Ongoing — Manual Entry & Uploads", desc: "Building managers update maintenance records, upload new lease data, and log compliance documents directly in the platform. Monthly utility bills can be uploaded as CSV or entered manually.", color: "#1A8C6A", bg: "#EDF7F2" },
];

const personas = [
  { initials: "CFO", name: "Chief Financial Officer", role: "Executive", teaser: "Carbon tax liability, green premiums, CapEx scenario modelling & income statement impact", path: "/dashboard/cfo", accent: "#E8A838" },
  { initials: "ESG", name: "Sustainability Manager", role: "ESG & Reporting", teaser: "Portfolio ESG scores, carbon trajectory to net zero & automated GRESB/TCFD reporting", path: "/dashboard/sustainability", accent: "#2DAF85" },
  { initials: "PM", name: "Portfolio Manager", role: "Asset Management", teaser: "Building performance vs SAPOA benchmarks, EPC compliance & portfolio heat maps", path: "/dashboard/portfolio", accent: "#0A6B4F" },
  { initials: "BM", name: "Building Manager", role: "Operations", teaser: "Live systems monitoring, tenant management, fault tickets & compliance tracking", path: "/dashboard/building", accent: "#064E3B" },
  { initials: "FM", name: "Facilities Manager", role: "Maintenance", teaser: "Critical work orders, PPM schedules, contractor management & equipment status", path: "/dashboard/fm", accent: "#1A8C6A" },
  { initials: "TEN", name: "Tenant Admin", role: "Tenant Portal", teaser: "Floor-level energy usage, 3-tap fault reporting & building certifications", path: "/dashboard/tenant", accent: "#2DAF85" },
];

const penalties = [
  { value: "R5M", label: "EPC non-compliance penalty", sub: "SANS 1544 / SANEDI" },
  { value: "R236", label: "per tCO₂e carbon tax today", sub: "Escalating to R472 by 2030" },
  { value: "70%", label: "of ESG report auto-generated", sub: "GRESB · TCFD · GRI" },
];

// ── Sustainability Benchmarker Widget ──────────────────────────────────────────
function BenchmarkWidget() {
  const [gla, setGla] = useState("");
  const [annualKwh, setAnnualKwh] = useState("");
  const [buildingType, setBuildingType] = useState("office_a");
  const [result, setResult] = useState<null | { intensity: number; benchmark: number; label: string; rating: string; color: string; percentile: number }>(null);

  function calculate() {
    const g = parseFloat(gla);
    const k = parseFloat(annualKwh);
    if (!g || !k || g <= 0 || k <= 0) return;
    const intensity = k / g;
    const bm = BENCHMARKS[buildingType];
    let rating = "", color = "";
    let percentile = 0;
    if (intensity <= bm.good) { rating = "Top Performer"; color = "#2DAF85"; percentile = 85; }
    else if (intensity <= bm.benchmark) { rating = "Above Average"; color = "#6BAF8A"; percentile = 62; }
    else if (intensity <= bm.poor) { rating = "Below Average"; color = "#E8A838"; percentile = 38; }
    else { rating = "Poor Performer"; color = "#DF795F"; percentile = 15; }
    setResult({ intensity: Math.round(intensity), benchmark: bm.benchmark, label: bm.label, rating, color, percentile });
  }

  return (
    <div className="bg-white border border-[#E0EBE4] p-8" style={{ borderRadius: 4 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#E8F0EC] flex items-center justify-center" style={{ borderRadius: 2 }}>
          <BarChart3 size={20} className="text-[#064E3B]" />
        </div>
        <div>
          <div className="font-bold text-[#002117]" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 16 }}>Sustainability Benchmarker</div>
          <div className="text-[12px] text-[#6BAF8A]" style={{ fontFamily: "'Work Sans', sans-serif" }}>Compare your building against SAPOA peers — instantly</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>Building Type</label>
          <select value={buildingType} onChange={e => setBuildingType(e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] bg-white focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}>
            {Object.entries(BENCHMARKS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>GLA (m²)</label>
          <input type="number" placeholder="e.g. 12 500" value={gla} onChange={e => setGla(e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>Annual Electricity (kWh)</label>
          <input type="number" placeholder="e.g. 1 800 000" value={annualKwh} onChange={e => setAnnualKwh(e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
        </div>
      </div>
      <button onClick={calculate} className="cp-btn-primary text-[13px] mb-6" style={{ padding: "0.6rem 1.5rem" }}>
        Benchmark now <ArrowRight size={14} />
      </button>
      {result && (
        <div className="border-t border-[#E0EBE4] pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-[28px] font-bold" style={{ fontFamily: "'Libre Baskerville', serif", color: result.color }}>{result.intensity}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>kWh/m²/year<br/>Your intensity</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#002117]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{result.benchmark}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>kWh/m²/year<br/>SAPOA benchmark</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold" style={{ fontFamily: "'Libre Baskerville', serif", color: result.color }}>{result.rating}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>vs {result.label}<br/>peer group</div>
            </div>
            <div className="text-center">
              <div className="text-[28px] font-bold text-[#002117]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{result.percentile}th</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>percentile<br/>estimated ranking</div>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 text-[12px]" style={{ background: result.color + "18", borderRadius: 2, color: result.color, fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            {result.intensity <= result.benchmark
              ? `✓ Your building performs better than the SAPOA ${result.label} benchmark. GreenBDG can help you maintain and certify this performance.`
              : `⚠ Your building uses ${result.intensity - result.benchmark} kWh/m²/year more than the SAPOA ${result.label} benchmark. GreenBDG identifies exactly where the waste is occurring.`}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Carbon Tax Calculator Widget ───────────────────────────────────────────────
function CarbonCalcWidget() {
  const [gla, setGla] = useState("");
  const [annualKwh, setAnnualKwh] = useState("");
  const [result, setResult] = useState<null | { tco2: number; liability2024: number; liability2030: number; perM2: number }>(null);

  function calculate() {
    const g = parseFloat(gla);
    const k = parseFloat(annualKwh);
    if (!g || !k || g <= 0 || k <= 0) return;
    const tco2 = (k * EMISSION_FACTOR) / 1000;
    const liability2024 = tco2 * CARBON_RATE_2024;
    const liability2030 = tco2 * CARBON_RATE_2030;
    const perM2 = liability2024 / g;
    setResult({ tco2: Math.round(tco2), liability2024: Math.round(liability2024), liability2030: Math.round(liability2030), perM2: Math.round(perM2 * 10) / 10 });
  }

  const fmt = (n: number) => "R " + n.toLocaleString("en-ZA");

  return (
    <div className="bg-white border border-[#E0EBE4] p-8" style={{ borderRadius: 4 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FFF4E0] flex items-center justify-center" style={{ borderRadius: 2 }}>
          <Calculator size={20} className="text-[#E8A838]" />
        </div>
        <div>
          <div className="font-bold text-[#002117]" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 16 }}>Carbon Tax Calculator</div>
          <div className="text-[12px] text-[#6BAF8A]" style={{ fontFamily: "'Work Sans', sans-serif" }}>See your SARS carbon liability at R236/tCO₂e — and what it becomes by 2030</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>GLA (m²)</label>
          <input type="number" placeholder="e.g. 25 000" value={gla} onChange={e => setGla(e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>Annual Electricity (kWh)</label>
          <input type="number" placeholder="e.g. 3 500 000" value={annualKwh} onChange={e => setAnnualKwh(e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
        </div>
      </div>
      <button onClick={calculate} className="cp-btn-primary text-[13px] mb-6" style={{ padding: "0.6rem 1.5rem", background: "#E8A838", border: "none" }}>
        Calculate liability <ArrowRight size={14} />
      </button>
      {result && (
        <div className="border-t border-[#E0EBE4] pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-[26px] font-bold text-[#002117]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{result.tco2.toLocaleString("en-ZA")}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>tCO₂e/year<br/>carbon footprint</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] font-bold text-[#E8A838]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{fmt(result.liability2024)}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>2024 liability<br/>at R236/tCO₂e</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] font-bold text-[#DF795F]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{fmt(result.liability2030)}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>2030 liability<br/>at R472/tCO₂e</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] font-bold text-[#002117]" style={{ fontFamily: "'Libre Baskerville', serif" }}>R{result.perM2}</div>
              <div className="text-[11px] text-[#5A6B5A] mt-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>per m²/year<br/>carbon cost</div>
            </div>
          </div>
          <div className="mt-4 px-4 py-3 text-[12px]" style={{ background: "#FFF4E0", borderRadius: 2, color: "#B07A10", fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            ⚠ Your carbon tax liability doubles to {fmt(result.liability2030)} by 2030. GreenBDG's CapEx modeller shows you exactly which retrofit investments reduce this exposure the most.
          </div>
        </div>
      )}
    </div>
  );
}

// ── Building Simulator ─────────────────────────────────────────────────────────
type SimBuilding = { id: number; name: string; type: string; gla: string; year: string; kwh: string };

function BuildingSimulator() {
  const [buildings, setBuildings] = useState<SimBuilding[]>([
    { id: 1, name: "Building 1", type: "office_a", gla: "", year: "", kwh: "" },
  ]);
  const [results, setResults] = useState<null | SimBuilding[]>(null);

  function addBuilding() {
    if (buildings.length >= 10) return;
    setBuildings(prev => [...prev, { id: Date.now(), name: `Building ${prev.length + 1}`, type: "office_a", gla: "", year: "", kwh: "" }]);
  }

  function removeBuilding(id: number) {
    setBuildings(prev => prev.filter(b => b.id !== id));
  }

  function updateBuilding(id: number, field: keyof SimBuilding, value: string) {
    setBuildings(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  }

  function generate() {
    const valid = buildings.filter(b => b.name && b.gla && b.kwh);
    if (valid.length === 0) return;
    setResults(valid);
  }

  if (results) {
    const insights = results.map(b => {
      const gla = parseFloat(b.gla) || 1;
      const kwh = parseFloat(b.kwh) || 0;
      const intensity = Math.round(kwh / gla);
      const bm = BENCHMARKS[b.type];
      const tco2 = Math.round((kwh * EMISSION_FACTOR) / 1000);
      const liability = Math.round(tco2 * CARBON_RATE_2024);
      const liability2030 = Math.round(tco2 * CARBON_RATE_2030);
      const age = new Date().getFullYear() - (parseInt(b.year) || 2000);
      let epcRisk = "Low";
      if (age > 20) epcRisk = "High";
      else if (age > 10) epcRisk = "Medium";
      let rating = "Poor";
      let ratingColor = "#DF795F";
      if (intensity <= bm.good) { rating = "Top Performer"; ratingColor = "#2DAF85"; }
      else if (intensity <= bm.benchmark) { rating = "Above Average"; ratingColor = "#6BAF8A"; }
      else if (intensity <= bm.poor) { rating = "Below Average"; ratingColor = "#E8A838"; }
      return { ...b, intensity, tco2, liability, liability2030, epcRisk, rating, ratingColor, bm };
    });

    const totalGla = insights.reduce((s, b) => s + (parseFloat(b.gla) || 0), 0);
    const totalKwh = insights.reduce((s, b) => s + (parseFloat(b.kwh) || 0), 0);
    const totalLiability = insights.reduce((s, b) => s + b.liability, 0);
    const totalLiability2030 = insights.reduce((s, b) => s + b.liability2030, 0);
    const portIntensity = Math.round(totalKwh / (totalGla || 1));
    const highRisk = insights.filter(b => b.epcRisk === "High").length;
    const fmt = (n: number) => "R " + n.toLocaleString("en-ZA");

    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="cp-label text-[#6BAF8A] mb-1">Portfolio Simulation Results</div>
            <h3 className="cp-display-dark" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>Your portfolio insights</h3>
          </div>
          <button onClick={() => setResults(null)} className="text-[13px] text-[#064E3B] font-semibold border border-[#064E3B] px-4 py-2 hover:bg-[#E8F0EC] transition-colors" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}>
            ← Edit buildings
          </button>
        </div>

        {/* Portfolio summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Portfolio GLA", value: totalGla.toLocaleString("en-ZA") + " m²" },
            { label: "Energy Intensity", value: portIntensity + " kWh/m²/yr" },
            { label: "2024 Carbon Liability", value: fmt(totalLiability) },
            { label: "2030 Carbon Liability", value: fmt(totalLiability2030) },
          ].map(s => (
            <div key={s.label} className="bg-[#002117] px-5 py-5" style={{ borderRadius: 2 }}>
              <div className="text-[11px] text-[#6BAF8A] uppercase tracking-wider mb-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>{s.label}</div>
              <div className="text-white font-bold" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 20 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Building cards */}
        <div className="space-y-4 mb-8">
          {insights.map((b, i) => (
            <div key={b.id} className="bg-white border border-[#E0EBE4] p-6" style={{ borderRadius: 4 }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-[#002117] text-[15px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{b.name}</div>
                  <div className="text-[12px] text-[#6BAF8A]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{b.bm.label} · {b.gla} m² GLA</div>
                </div>
                <span className="text-[11px] font-bold px-3 py-1" style={{ background: b.ratingColor + "20", color: b.ratingColor, borderRadius: 20, fontFamily: "'Work Sans', sans-serif" }}>{b.rating}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Energy Intensity", value: b.intensity + " kWh/m²/yr", note: `SAPOA: ${b.bm.benchmark}` },
                  { label: "Carbon Footprint", value: b.tco2.toLocaleString("en-ZA") + " tCO₂e/yr", note: "Scope 2 (electricity)" },
                  { label: "2024 Carbon Tax", value: fmt(b.liability), note: "at R236/tCO₂e" },
                  { label: "2030 Projection", value: fmt(b.liability2030), note: "at R472/tCO₂e" },
                  { label: "EPC Risk", value: b.epcRisk, note: b.year ? `Built ${b.year}` : "Age unknown" },
                ].map(m => (
                  <div key={m.label} className="bg-[#F7FAF7] px-3 py-3" style={{ borderRadius: 2 }}>
                    <div className="text-[10px] text-[#5A6B5A] uppercase tracking-wider mb-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>{m.label}</div>
                    <div className="font-bold text-[#002117] text-[13px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{m.value}</div>
                    <div className="text-[10px] text-[#8AAA94]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-[#002117] p-8" style={{ borderRadius: 4 }}>
          <div className="cp-label text-[#6BAF8A] mb-3">What GreenBDG would show you next</div>
          <h4 className="text-white font-bold mb-5" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 16 }}>Recommended actions for your portfolio</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "EPC Compliance Review", desc: `${highRisk} building${highRisk !== 1 ? "s" : ""} flagged as high EPC risk. Immediate audit recommended to avoid R5M penalty.`, icon: "⚠" },
              { title: "Carbon Tax CapEx Modelling", desc: `Your 2030 liability is ${fmt(totalLiability2030)}. GreenBDG models which retrofits reduce this the most per rand spent.`, icon: "📊" },
              { title: "GRESB Readiness Score", desc: "Based on your portfolio profile, GreenBDG estimates your baseline GRESB score and the fastest path to a 4-star rating.", icon: "🌿" },
            ].map(r => (
              <div key={r.title} className="bg-white/5 border border-white/10 p-5" style={{ borderRadius: 2 }}>
                <div className="text-2xl mb-3">{r.icon}</div>
                <div className="text-white font-semibold mb-2" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 13 }}>{r.title}</div>
                <div className="text-white/60 text-[12px] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif" }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="cp-label text-[#6BAF8A] mb-2">Portfolio Simulator</div>
        <h3 className="cp-display-dark mb-3" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>Enter up to 10 buildings. Get instant insights.</h3>
        <p className="text-[#5A6B5A] max-w-2xl" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14, lineHeight: 1.7 }}>
          Add your buildings below and we'll generate an instant portfolio analysis — energy benchmarking, carbon liability, EPC risk flags, and a GRESB readiness estimate. No sign-up required.
        </p>
      </div>
      <div className="space-y-3 mb-6">
        {buildings.map((b, i) => (
          <div key={b.id} className="bg-white border border-[#E0EBE4] p-5" style={{ borderRadius: 4 }}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif" }}>Building Name</label>
                <input value={b.name} onChange={e => updateBuilding(b.id, "name", e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif" }}>Type</label>
                <select value={b.type} onChange={e => updateBuilding(b.id, "type", e.target.value)} className="w-full border border-[#D0DDD4] px-2 py-2 text-[12px] text-[#002117] bg-white focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}>
                  {Object.entries(BENCHMARKS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif" }}>GLA (m²)</label>
                <input type="number" placeholder="12 500" value={b.gla} onChange={e => updateBuilding(b.id, "gla", e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif" }}>Annual kWh</label>
                <input type="number" placeholder="1 800 000" value={b.kwh} onChange={e => updateBuilding(b.id, "kwh", e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5" style={{ fontFamily: "'Work Sans', sans-serif" }}>Year Built</label>
                  <input type="number" placeholder="2005" value={b.year} onChange={e => updateBuilding(b.id, "year", e.target.value)} className="w-full border border-[#D0DDD4] px-3 py-2 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }} />
                </div>
                {buildings.length > 1 && (
                  <button onClick={() => removeBuilding(b.id)} className="p-2 text-[#DF795F] hover:bg-[#FFF0EC] transition-colors mb-0.5" style={{ borderRadius: 2 }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {buildings.length < 10 && (
          <button onClick={addBuilding} className="flex items-center gap-2 text-[13px] font-semibold text-[#064E3B] border border-[#064E3B] px-4 py-2.5 hover:bg-[#E8F0EC] transition-colors" style={{ borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}>
            <Plus size={14} /> Add building {buildings.length < 10 ? `(${10 - buildings.length} remaining)` : ""}
          </button>
        )}
        <button onClick={generate} className="cp-btn-primary text-[13px]" style={{ padding: "0.6rem 1.5rem" }}>
          Generate portfolio insights <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"platform" | "simulator">("platform");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Work Sans', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav className="cp-nav">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#064E3B] flex items-center justify-center" style={{ borderRadius: 2 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
              <path d="M12 2v20M4 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
            </svg>
          </div>
          <div>
            <span className="text-[15px] font-bold text-[#002117]" style={{ fontFamily: "'Work Sans', sans-serif", letterSpacing: "-0.01em" }}>GreenBDG</span>
            <span className="text-[10px] text-[#6BAF8A] tracking-[0.14em] uppercase ml-2">Africa</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Solutions", "Compliance"].map(item => (
            <button key={item} className="text-[13px] font-medium text-[#5A6B5A] hover:text-[#064E3B] transition-colors bg-transparent border-none">
              {item}
            </button>
          ))}
          <button onClick={() => navigate("/roadmap")} className="text-[13px] font-medium text-[#5A6B5A] hover:text-[#064E3B] transition-colors bg-transparent border-none">Roadmap</button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/signin")}
            className="text-[13px] font-medium text-[#064E3B] hover:text-[#002117] transition-colors bg-transparent border-none"
          >
            Client login
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="cp-btn-primary text-[13px]"
            style={{ padding: "0.6rem 1.25rem" }}
          >
            Contact us for a demo
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="cp-hero" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="cp-hero-overlay" />
        <div className="relative z-10 container pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="cp-label text-[#6BAF8A] mb-5">ESG Intelligence Platform · South Africa</div>
            <h1 className="cp-display text-white mb-6" style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
              The intelligent ESG platform built for African real estate.
            </h1>
            <p className="text-white/75 mb-10 max-w-xl" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 17, lineHeight: 1.7 }}>
              GreenBDG turns your building portfolio's energy, carbon, compliance, and financial data into a single source of truth — purpose-built for SANS 1544, the Carbon Tax Act, and GRESB reporting.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/demo")} className="cp-btn-primary" style={{ fontSize: 15 }}>
                Contact us for a demo
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => { setActiveTab("simulator"); document.getElementById("interactive")?.scrollIntoView({ behavior: "smooth" }); }}
                className="cp-btn-ghost" style={{ fontSize: 15 }}
              >
                Try the simulator
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {["SANS 1544 compliant", "Carbon Tax Act ready", "GRESB aligned", "B-BBEE tracked"].map(tag => (
                <div key={tag} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#2DAF85]" />
                  <span className="text-white/70 text-[13px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Penalty Stakes ── */}
      <section className="bg-[#002117] py-16">
        <div className="container">
          <div className="cp-label text-[#6BAF8A] mb-8 text-center">The cost of non-compliance</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {penalties.map(p => (
              <div key={p.value} className="bg-[#002117] px-10 py-10 text-center">
                <div className="cp-display text-white mb-2" style={{ fontSize: "3rem" }}>{p.value}</div>
                <div className="text-white/80 font-medium mb-1" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14 }}>{p.label}</div>
                <div className="text-white/40" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Section (tabbed) ── */}
      <section id="interactive" className="py-24" style={{ background: "#F7FAF7" }}>
        <div className="container">
          <div className="mb-10">
            <div className="cp-label text-[#6BAF8A] mb-4">Try it now — no sign-up required</div>
            <h2 className="cp-display-dark mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              See what GreenBDG reveals about your portfolio.
            </h2>
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white border border-[#E0EBE4] inline-flex" style={{ borderRadius: 4 }}>
              {[
                { id: "platform" as const, label: "Benchmark & Calculate", icon: <BarChart3 size={14} /> },
                { id: "simulator" as const, label: "Portfolio Simulator", icon: <Building2 size={14} /> },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold transition-all"
                  style={{
                    borderRadius: 2,
                    fontFamily: "'Work Sans', sans-serif",
                    background: activeTab === t.id ? "#064E3B" : "transparent",
                    color: activeTab === t.id ? "white" : "#5A6B5A",
                    border: "none",
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "platform" && (
            <div className="space-y-6">
              <BenchmarkWidget />
              <CarbonCalcWidget />
            </div>
          )}
          {activeTab === "simulator" && <BuildingSimulator />}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="mb-16">
            <div className="cp-label text-[#6BAF8A] mb-4">What GreenBDG does</div>
            <h2 className="cp-display-dark" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 560 }}>
              Six pillars of ESG intelligence.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="cp-card p-8">
                <div className="w-10 h-10 bg-[#E8F0EC] flex items-center justify-center mb-5" style={{ borderRadius: 2 }}>
                  {b.icon}
                </div>
                <div className="cp-label text-[#6BAF8A] mb-2">{b.sub}</div>
                <h3 className="text-[#002117] font-bold mb-3" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 17 }}>{b.title}</h3>
                <p className="text-[#5A6B5A] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Data Updates Work ── */}
      <section className="py-28" style={{ background: "#F7FAF7" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="cp-label text-[#6BAF8A] mb-4">How your data gets in</div>
              <h2 className="cp-display-dark mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                Three pathways. One source of truth.
              </h2>
              <p className="text-[#5A6B5A] mb-10 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 15 }}>
                GreenBDG is designed to meet your portfolio wherever it is — whether you have a fully integrated BMS or you're still on spreadsheets.
              </p>
              <div className="space-y-6">
                {dataPathways.map((p) => (
                  <div key={p.step} className="flex gap-5">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center" style={{ background: p.bg, borderRadius: 2, color: p.color }}>
                      {p.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="cp-label" style={{ color: p.color, fontSize: 10 }}>{p.step}</span>
                        <h4 className="font-semibold text-[#002117]" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14 }}>{p.title}</h4>
                      </div>
                      <p className="text-[#5A6B5A] leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 13 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{ backgroundImage: `url(${SUSTAINABILITY_IMG})`, borderRadius: 2, boxShadow: "0 24px 64px rgba(0,33,23,0.18)" }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5" style={{ borderRadius: 2, boxShadow: "0 8px 32px rgba(0,33,23,0.12)", border: "1px solid rgba(6,78,59,0.08)" }}>
                <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>Day 1 onboarding</div>
                <div className="text-[#002117] font-bold" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 22 }}>Under 20 mins</div>
                <div className="text-[#5A6B5A] text-[12px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>from CSV upload to live dashboards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Persona Preview ── */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="mb-14">
            <div className="cp-label text-[#6BAF8A] mb-4">Role-based intelligence</div>
            <h2 className="cp-display-dark mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", maxWidth: 520 }}>
              Every stakeholder sees exactly what they need.
            </h2>
            <p className="text-[#5A6B5A]" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 15, maxWidth: 560 }}>
              GreenBDG serves six distinct roles across your organisation — from the CFO tracking carbon tax liability to the tenant logging a fault in three taps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((p) => (
              <button key={p.name} onClick={() => navigate(p.path)} className="cp-card p-6 text-left group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center text-white font-bold text-[11px]" style={{ background: p.accent, borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}>
                    {p.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#002117] text-[14px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>{p.name}</div>
                    <div className="text-[11px] text-[#6BAF8A] font-medium" style={{ fontFamily: "'Work Sans', sans-serif" }}>{p.role}</div>
                  </div>
                </div>
                <p className="text-[#5A6B5A] text-[13px] leading-relaxed mb-4" style={{ fontFamily: "'Work Sans', sans-serif" }}>{p.teaser}</p>
                <div className="flex items-center gap-1 text-[#064E3B] text-[12px] font-semibold group-hover:gap-2 transition-all" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  View dashboard <ArrowRight size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${PORTFOLIO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,33,23,0.88) 0%, rgba(6,78,59,0.75) 100%)" }} />
        <div className="relative z-10 container text-center">
          <div className="cp-label text-[#6BAF8A] mb-5">Ready to see GreenBDG in action?</div>
          <h2 className="cp-display text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", maxWidth: 640, margin: "0 auto 1.5rem" }}>
            Let's show you what your portfolio looks like inside GreenBDG.
          </h2>
          <p className="text-white/70 mb-10 max-w-lg mx-auto" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            Our team will walk you through a live demo tailored to your portfolio — showing exactly how GreenBDG handles your compliance obligations, carbon exposure, and ESG reporting requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate("/demo")} className="cp-btn-primary" style={{ fontSize: 15 }}>
              Contact us for a demo
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { setActiveTab("simulator"); document.getElementById("interactive")?.scrollIntoView({ behavior: "smooth" }); }}
              className="cp-btn-ghost" style={{ fontSize: 15 }}
            >
              Try the simulator first
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-8 justify-center mt-12">
            {[
              { icon: <Mail size={14} />, text: "zweli@greenbdg.co.za" },
              { icon: <Phone size={14} />, text: "+27 11 000 0000" },
            ].map(c => (
              <div key={c.text} className="flex items-center gap-2 text-white/60 text-[13px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                {c.icon} {c.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#002117] py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#064E3B] flex items-center justify-center" style={{ borderRadius: 2 }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 14 }}>GreenBDG Africa</span>
          </div>
          <div className="text-white/30 text-[12px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            © 2026 GreenBDG Africa · ESG Intelligence Platform · Built for South African real estate
          </div>
        </div>
      </footer>
    </div>
  );
}
