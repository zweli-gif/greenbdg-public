/**
 * GreenBDG Africa — Public Homepage
 * CRISP PLUSH design: white canvas, full-bleed aerial photography, Libre Baskerville display
 * NO portfolio numbers (pre-onboarding state)
 * Sections: Hero → Pain Points → Benefits → Data Update Story → Personas Preview → CTA
 */
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight, Upload, Wifi, PenLine, Building2, Leaf, TrendingUp, Shield, FileText, Users } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-landing-8seFcF2qiNuDz9kZrpcgfa.webp";
const SUSTAINABILITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-sustainability-jskySYAbc4ZEh7pr9VxGG2.webp";
const PORTFOLIO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-portfolio-jskySYAbc4ZEh7pr9VxGG2.webp";

const benefits = [
  {
    icon: <Shield size={22} className="text-[#064E3B]" />,
    title: "EPC Compliance",
    sub: "SANS 1544 · SANEDI",
    body: "Automated tracking of Energy Performance Certificates across your entire portfolio. Expiry alerts, renewal scheduling, and audit-ready documentation — eliminating the R5M non-compliance penalty risk.",
  },
  {
    icon: <TrendingUp size={22} className="text-[#064E3B]" />,
    title: "Carbon Tax Intelligence",
    sub: "SARS Carbon Tax Act",
    body: "Real-time carbon liability calculations at R236/tCO₂e, escalating to R472/t by 2030. CapEx scenario modelling shows your CFO exactly which projects reduce tax exposure the most.",
  },
  {
    icon: <FileText size={22} className="text-[#064E3B]" />,
    title: "ESG Reporting (70/30)",
    sub: "GRESB · TCFD · GRI",
    body: "The platform auto-generates 70% of your annual ESG report from operational data. GreenBDG's consulting team writes the remaining 30% — materiality narrative, TCFD framing, executive sign-off.",
  },
  {
    icon: <Building2 size={22} className="text-[#064E3B]" />,
    title: "Live Building Intelligence",
    sub: "BMS · IoT · Real-time",
    body: "Connect your BMS, smart meters, and IoT sensors for live energy, water, HVAC, and fault data. Anomaly detection flags issues before they become costly failures.",
  },
  {
    icon: <Users size={22} className="text-[#064E3B]" />,
    title: "Tenant Portal",
    sub: "3-tap fault reporting",
    body: "Tenants log faults in three taps via QR code, mobile app, or web portal. Every contractor assignment automatically captures B-BBEE level to your ESG Social metrics.",
  },
  {
    icon: <Leaf size={22} className="text-[#064E3B]" />,
    title: "Portfolio Benchmarking",
    sub: "SAPOA · Green Star · EDGE",
    body: "Compare every building against SAPOA peers. Track Green Star and EDGE certification pipelines. Identify underperformers before they drag down your GRESB score.",
  },
];

const dataPathways = [
  {
    step: "01",
    icon: <Upload size={20} />,
    title: "Day 1 — CSV Bulk Upload",
    desc: "Your implementation lead uploads your building portfolio and staff list via a structured CSV template. 34 buildings and 6 users onboarded in under 20 minutes. Historical energy and financial data imported in the same session.",
    color: "#064E3B",
    bg: "#E8F0EC",
  },
  {
    step: "02",
    icon: <Wifi size={20} />,
    title: "Week 2–4 — API & BMS Integration",
    desc: "Connect your Building Management System (BACnet, Modbus), smart meters, and utility accounts. Live energy, water, and HVAC data flows automatically. No manual entry required once connected.",
    color: "#0A6B4F",
    bg: "#EAF4EE",
  },
  {
    step: "03",
    icon: <PenLine size={20} />,
    title: "Ongoing — Manual Entry & Uploads",
    desc: "Building managers update maintenance records, upload new lease data, and log compliance documents directly in the platform. Monthly utility bills can be uploaded as CSV or entered manually for buildings without smart meters.",
    color: "#1A8C6A",
    bg: "#EDF7F2",
  },
];

const personas = [
  { initials: "AD", name: "Amahle Dube", role: "CFO", teaser: "Carbon tax liability, green premiums & CapEx modelling", path: "/dashboard/cfo", accent: "#E8A838" },
  { initials: "LN", name: "Lerato Ndlovu", role: "Sustainability Manager", teaser: "ESG scores, carbon trajectory & automated GRESB reporting", path: "/dashboard/sustainability", accent: "#2DAF85" },
  { initials: "JM", name: "James Molefe", role: "Portfolio Manager", teaser: "Building performance vs SAPOA benchmarks & EPC compliance", path: "/dashboard/portfolio", accent: "#0A6B4F" },
  { initials: "SK", name: "Sipho Khumalo", role: "Building Manager", teaser: "Live systems monitoring, tenant management & tickets", path: "/dashboard/building", accent: "#064E3B" },
  { initials: "MP", name: "Maria Peters", role: "Facilities Manager", teaser: "Critical tickets, PPM schedules & contractor management", path: "/dashboard/fm", accent: "#1A8C6A" },
  { initials: "DK", name: "David Kgosi", role: "Tenant Admin", teaser: "Energy usage, fault reporting & building certifications", path: "/dashboard/tenant", accent: "#2DAF85" },
];

const penalties = [
  { value: "R5M", label: "EPC non-compliance penalty", sub: "SANS 1544 / SANEDI" },
  { value: "R236", label: "per tCO₂e carbon tax", sub: "Escalating to R472 by 2030" },
  { value: "R472", label: "projected carbon rate 2030", sub: "SARS Carbon Tax Act" },
];

export default function Home() {
  const [, navigate] = useLocation();

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
            Sign in
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="cp-btn-primary text-[13px]"
            style={{ padding: "0.6rem 1.25rem" }}
          >
            Start setup
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="cp-hero" style={{ minHeight: "100vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
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
              <button onClick={() => navigate("/signin")} className="cp-btn-primary" style={{ fontSize: 15 }}>
                Start your setup
                <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate("/dashboard/portfolio")} className="cp-btn-ghost" style={{ fontSize: 15 }}>
                Explore dashboards
                <ChevronRight size={16} />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="cp-label text-[#6BAF8A] mb-4">How your data gets in</div>
              <h2 className="cp-display-dark mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                Three pathways. One source of truth.
              </h2>
              <p className="text-[#5A6B5A] mb-10 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 15 }}>
                GreenBDG is designed to meet your portfolio wherever it is — whether you have a fully integrated BMS or you're still on spreadsheets. Data flows in through three pathways, and the platform handles the rest.
              </p>
              <div className="space-y-6">
                {dataPathways.map((p) => (
                  <div key={p.step} className="flex gap-5">
                    <div
                      className="w-11 h-11 flex-shrink-0 flex items-center justify-center"
                      style={{ background: p.bg, borderRadius: 2, color: p.color }}
                    >
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
                style={{
                  backgroundImage: `url(${SUSTAINABILITY_IMG})`,
                  borderRadius: 2,
                  boxShadow: "0 24px 64px rgba(0,33,23,0.18)"
                }}
              />
              <div
                className="absolute -bottom-6 -left-6 bg-white p-5"
                style={{ borderRadius: 2, boxShadow: "0 8px 32px rgba(0,33,23,0.12)", border: "1px solid rgba(6,78,59,0.08)" }}
              >
                <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-1" style={{ fontFamily: "'Work Sans', sans-serif" }}>Day 1 onboarding</div>
                <div className="text-[#002117] font-bold" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 22 }}>34 buildings</div>
                <div className="text-[#5A6B5A] text-[12px]" style={{ fontFamily: "'Work Sans', sans-serif" }}>loaded in under 20 minutes</div>
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
              GreenBDG serves five distinct roles across your organisation — from the CFO tracking carbon tax liability to the tenant logging a fault in three taps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((p) => (
              <button
                key={p.name}
                onClick={() => navigate(p.path)}
                className="cp-card p-6 text-left group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white font-bold text-[13px]"
                    style={{ background: p.accent, borderRadius: 2, fontFamily: "'Work Sans', sans-serif" }}
                  >
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PORTFOLIO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,33,23,0.88) 0%, rgba(6,78,59,0.75) 100%)" }} />
        <div className="relative z-10 container text-center">
          <div className="cp-label text-[#6BAF8A] mb-5">Ready to get started?</div>
          <h2 className="cp-display text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", maxWidth: 640, margin: "0 auto 1.5rem" }}>
            Set up your portfolio in under 20 minutes.
          </h2>
          <p className="text-white/70 mb-10 max-w-lg mx-auto" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 16, lineHeight: 1.7 }}>
            Your GreenBDG implementation lead handles the setup. You upload your building list and staff CSV. Your team receives magic link invitations and lands directly in their personalised dashboards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate("/signin")} className="cp-btn-primary" style={{ fontSize: 15 }}>
              Start your setup
              <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate("/dashboard/portfolio")} className="cp-btn-ghost" style={{ fontSize: 15 }}>
              Explore the platform
              <ChevronRight size={16} />
            </button>
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
