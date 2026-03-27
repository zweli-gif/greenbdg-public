/**
 * Home — GreenBDG Africa Landing Page
 * Crisp Plush: Full-bleed aerial hero, deep forest green overlay, white text
 * Shows the product story and entry points into the prototype journeys
 */
import { useLocation } from "wouter";
import { ArrowRight, Building2, Leaf, TrendingUp, Shield, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-landing-8seFcF2qiNuDz9kZrpcgfa.webp";
const BUILDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-onboarding-W8m83tJcenuZivUqHsjVYR.webp";
const PORTFOLIO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-portfolio-jskySYAbc4ZEh7pr9VxGG2.webp";

const personas = [
  {
    initials: "AD",
    name: "Amahle Dube",
    role: "CFO",
    company: "Growthpoint Properties",
    description: "Carbon tax liability, green premiums & CapEx modelling",
    path: "/dashboard/cfo",
    color: "bg-[#E8A838]",
  },
  {
    initials: "NK",
    name: "Nomsa Khumalo",
    role: "Sustainability Manager",
    company: "Portfolio View",
    description: "ESG scores, carbon trajectory & automated GRESB reporting",
    path: "/dashboard/sustainability",
    color: "bg-[#2DAF85]",
  },
  {
    initials: "RP",
    name: "Richard Patel",
    role: "Portfolio Manager",
    company: "48 buildings",
    description: "Building performance vs SAPOA benchmarks & EPC compliance",
    path: "/dashboard/portfolio",
    color: "bg-[#0A6B4F]",
  },
  {
    initials: "ND",
    name: "Nkosi Dlamini",
    role: "Building Manager",
    company: "Sandton Heights",
    description: "Live systems monitoring, tenant management & tickets",
    path: "/dashboard/building",
    color: "bg-[#064E3B]",
  },
  {
    initials: "SM",
    name: "Sipho Mthembu",
    role: "Facilities Manager",
    company: "Waterfall Estate",
    description: "Critical tickets, PPM schedules & operational faults",
    path: "/dashboard/fm",
    color: "bg-[#1A8C6A]",
  },
  {
    initials: "AC",
    name: "African Corp Holdings",
    role: "Tenant",
    company: "Floors 14–16, Sandton Heights",
    description: "Energy usage, fault reporting & sustainability commitments",
    path: "/dashboard/tenant",
    color: "bg-[#2DAF85]",
  },
];

const stats = [
  { value: "48", label: "Buildings under management", suffix: "" },
  { value: "142", label: "kWh/m² avg energy intensity", suffix: "" },
  { value: "B+", label: "Portfolio ESG rating", suffix: "" },
  { value: "73%", label: "EPC compliance rate", suffix: "" },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-sm border-b border-[#E8F0EC]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#064E3B] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
              <path d="M12 2v20M4 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
            </svg>
          </div>
          <div>
            <span className="text-[15px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG</span>
            <span className="text-[10px] text-[#6BAF8A] tracking-widest uppercase ml-1.5">Africa</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/signin")}
            className="text-[13px] font-medium text-[#003527] hover:text-[#064E3B] transition-colors"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-2 bg-[#064E3B] text-white text-[13px] font-medium rounded hover:bg-[#003527] transition-colors"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative h-screen min-h-[640px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 px-8 lg:px-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2DAF85]/20 border border-[#2DAF85]/40 mb-6">
            <Leaf size={12} className="text-[#2DAF85]" />
            <span className="text-[11px] text-[#B0F0D6] tracking-widest uppercase font-medium" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Smart Building Intelligence
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{fontFamily:"'Libre Baskerville',serif"}}>
            The Future of<br />
            <span className="italic text-[#B0F0D6]">African</span> Real Estate.
          </h1>
          <p className="text-[16px] text-white/75 leading-relaxed mb-8 max-w-xl" style={{fontFamily:"'Work Sans',sans-serif"}}>
            GreenBDG Africa is the intelligent ESG and building management platform built for South African property portfolios. From carbon tax compliance to live building operations — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 px-6 py-3 bg-[#2DAF85] text-white text-[14px] font-semibold rounded hover:bg-[#1A8C6A] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              Start your journey
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("personas");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white text-[14px] font-medium rounded hover:bg-white/20 transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              Explore dashboards
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#002117]/80 backdrop-blur-sm border-t border-white/10">
          <div className="flex divide-x divide-white/10 overflow-x-auto">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 min-w-[140px] px-6 py-4">
                <div className="text-2xl font-bold text-white" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.value}{s.suffix}</div>
                <div className="text-[11px] text-[#8BBFA0] mt-0.5" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 px-8 lg:px-20 bg-[#F9F9F8] border-b border-[#E8F0EC]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Building2 size={20} className="text-[#064E3B]" />, title: "Portfolio Intelligence", desc: "Monitor 48+ buildings against SAPOA benchmarks in real time" },
            { icon: <Leaf size={20} className="text-[#064E3B]" />, title: "ESG & Carbon Tracking", desc: "Net Zero trajectory aligned with SA NDC 2030 targets" },
            { icon: <TrendingUp size={20} className="text-[#064E3B]" />, title: "CFO-Grade Financials", desc: "Carbon tax modelling at R190/tCO2e with CapEx prioritisation" },
            { icon: <Shield size={20} className="text-[#064E3B]" />, title: "Compliance Automation", desc: "EPC, GRESB, TCFD and GBCSA Green Star — all automated" },
          ].map((f) => (
            <div key={f.title}>
              <div className="w-10 h-10 rounded bg-[#F0F7F4] flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-[#002117] mb-1.5" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.title}</h3>
              <p className="text-[12px] text-[#5A8A6A] leading-relaxed" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personas section */}
      <section id="personas" className="py-20 px-8 lg:px-20">
        <div className="mb-12">
          <p className="text-[11px] text-[#2DAF85] tracking-widest uppercase font-medium mb-3" style={{fontFamily:"'Work Sans',sans-serif"}}>
            Role-based intelligence
          </p>
          <h2 className="text-4xl font-bold text-[#002117] mb-4" style={{fontFamily:"'Libre Baskerville',serif"}}>
            Every stakeholder,<br />their own view.
          </h2>
          <p className="text-[15px] text-[#5A8A6A] max-w-xl" style={{fontFamily:"'Work Sans',sans-serif"}}>
            GreenBDG delivers tailored dashboards for every role in your organisation — from the CFO to the building manager to the tenant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {personas.map((p) => (
            <button
              key={p.name}
              onClick={() => navigate(p.path)}
              className="group text-left p-6 bg-white border border-[#E8F0EC] rounded-lg hover:border-[#064E3B] hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${p.color} flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0`}>
                  {p.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{p.name}</div>
                  <div className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>{p.role} · {p.company}</div>
                </div>
              </div>
              <p className="text-[12px] text-[#5A8A6A] leading-relaxed mb-4" style={{fontFamily:"'Work Sans',sans-serif"}}>{p.description}</p>
              <div className="flex items-center gap-1 text-[12px] font-medium text-[#064E3B] group-hover:gap-2 transition-all" style={{fontFamily:"'Work Sans',sans-serif"}}>
                Open dashboard <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Onboarding CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BUILDING_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#002117]/85" />
        <div className="relative z-10 px-8 lg:px-20 py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] text-[#2DAF85] tracking-widest uppercase font-medium mb-3" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Onboarding journey
            </p>
            <h2 className="text-4xl font-bold text-white mb-3" style={{fontFamily:"'Libre Baskerville',serif"}}>
              From zero to<br />operational in minutes.
            </h2>
            <p className="text-[14px] text-white/65 max-w-lg" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Upload your buildings via CSV, add your team, and watch as GreenBDG sends magic links to every stakeholder — automatically routing them to their personalised dashboard.
            </p>
          </div>
          <button
            onClick={() => navigate("/signin")}
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 bg-[#2DAF85] text-white text-[14px] font-semibold rounded hover:bg-[#1A8C6A] transition-colors"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Begin onboarding
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-20 py-8 bg-[#002117] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#2DAF85] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white"/>
            </svg>
          </div>
          <span className="text-[13px] font-medium text-white/80" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG Africa</span>
        </div>
        <p className="text-[11px] text-white/40" style={{fontFamily:"'Work Sans',sans-serif"}}>
          © 2026 GreenBDG Africa · POPIA Compliant · South African Data Hosting
        </p>
        <div className="flex gap-4 text-[11px] text-white/40" style={{fontFamily:"'Work Sans',sans-serif"}}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
