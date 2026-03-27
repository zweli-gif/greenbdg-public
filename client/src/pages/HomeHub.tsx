/**
 * GreenBDG Africa — Post-Purchase Home Hub
 * Every user lands here after clicking their magic link and setting their password
 * Shows: company welcome, 6 role tiles, announcements panel
 * Botanical design: white cards on linen, Fraunces serif headings
 */
import { useLocation } from "wouter";
import { ArrowRight, Bell, TrendingUp, Building2, Users, Leaf, BarChart3, Wrench, Home } from "lucide-react";

const roles = [
  {
    id: "cfo",
    initials: "CFO",
    title: "Chief Financial Officer",
    subtitle: "Executive · Finance",
    desc: "Carbon tax liability, green premiums, CapEx scenario modelling and income statement impact across your portfolio.",
    path: "/dashboard/cfo",
    accent: "#E8A838",
    bg: "#FFF8E8",
    icon: <TrendingUp size={22} />,
    access: "CFO · Executive team",
  },
  {
    id: "sustainability",
    initials: "ESG",
    title: "Sustainability Manager",
    subtitle: "ESG · Reporting",
    desc: "Portfolio ESG scores, carbon trajectory to net zero 2030, and automated GRESB / TCFD reporting.",
    path: "/dashboard/sustainability",
    accent: "#2DAF85",
    bg: "#E8F8F2",
    icon: <Leaf size={22} />,
    access: "ESG Manager · Sustainability team",
  },
  {
    id: "portfolio",
    initials: "PM",
    title: "Portfolio Manager",
    subtitle: "Asset Management",
    desc: "Building performance vs SAPOA benchmarks, EPC compliance heat map, and portfolio-wide risk flags.",
    path: "/dashboard/portfolio",
    accent: "#0A6B4F",
    bg: "#E8F4EE",
    icon: <BarChart3 size={22} />,
    access: "Portfolio Manager · Asset team",
  },
  {
    id: "building",
    initials: "BM",
    title: "Building Manager",
    subtitle: "Operations",
    desc: "Live systems monitoring, tenant management, fault tickets, and compliance tracking for your building.",
    path: "/dashboard/building",
    accent: "#064E3B",
    bg: "#E8F0EC",
    icon: <Building2 size={22} />,
    access: "Building Manager · Site team",
  },
  {
    id: "fm",
    initials: "FM",
    title: "Facilities Manager",
    subtitle: "Maintenance",
    desc: "Critical work orders, PPM schedules, contractor management, and equipment status across your buildings.",
    path: "/dashboard/fm",
    accent: "#1A8C6A",
    bg: "#EAF6F2",
    icon: <Wrench size={22} />,
    access: "Facilities Manager · FM team",
  },
  {
    id: "tenant",
    initials: "TEN",
    title: "Tenant Admin",
    subtitle: "Tenant Portal",
    desc: "Floor-level energy usage, 3-tap fault reporting, building certifications and lease documentation.",
    path: "/dashboard/tenant",
    accent: "#2DAF85",
    bg: "#E8F8F2",
    icon: <Home size={22} />,
    access: "Tenant Admin · Occupier",
  },
];

const announcements = [
  { date: "27 Mar 2026", tag: "Platform", title: "Carbon Tax rate updated to R236/tCO₂e", body: "SARS has confirmed the 2026 carbon tax rate. All liability calculations have been updated automatically." },
  { date: "20 Mar 2026", tag: "Compliance", title: "SANS 1544 EPC renewal deadline: 3 buildings", body: "Sandton Towers, Rosebank Square, and Menlyn Park have EPC certificates expiring within 60 days." },
  { date: "15 Mar 2026", tag: "Feature", title: "GRESB 2026 submission window now open", body: "The platform has pre-populated 70% of your GRESB submission from operational data. Review and submit by 30 June." },
];

export default function HomeHub() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-[#E0EBE4] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#064E3B] flex items-center justify-center" style={{ borderRadius: 2 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-[#002117] text-[14px]">GreenBDG Africa</span>
            <span className="text-[#8AAA94] text-[12px] ml-2">· Growthpoint Properties</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={18} className="text-[#5A6B5A]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#DF795F] flex items-center justify-center" style={{ borderRadius: "50%" }}>
              <span className="text-white text-[9px] font-bold">3</span>
            </div>
          </div>
          <div className="w-8 h-8 bg-[#064E3B] text-white flex items-center justify-center text-[11px] font-bold" style={{ borderRadius: "50%" }}>GP</div>
        </div>
      </div>

      <div className="container py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main: role tiles */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-2">Welcome back</div>
              <h1 className="text-[#002117] font-bold mb-2" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Growthpoint Properties
              </h1>
              <p className="text-[#5A6B5A] text-[14px]">Select your role to access your personalised dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => navigate(r.path)}
                  className="bg-white border border-[#E0EBE4] p-6 text-left group hover:border-[#064E3B] hover:shadow-lg transition-all"
                  style={{ borderRadius: 4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center"
                      style={{ background: r.bg, borderRadius: 2, color: r.accent }}
                    >
                      {r.icon}
                    </div>
                    <ArrowRight size={16} className="text-[#D0DDD4] group-hover:text-[#064E3B] transition-colors mt-1" />
                  </div>
                  <div className="font-bold text-[#002117] text-[14px] mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.title}</div>
                  <div className="text-[11px] font-semibold mb-3" style={{ color: r.accent, fontFamily: "'DM Sans', sans-serif" }}>{r.subtitle}</div>
                  <p className="text-[#5A6B5A] text-[12px] leading-relaxed mb-4">{r.desc}</p>
                  <div className="text-[10px] text-[#8AAA94] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.access}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar: announcements */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E0EBE4] p-6" style={{ borderRadius: 4 }}>
              <div className="flex items-center gap-2 mb-6">
                <Bell size={16} className="text-[#064E3B]" />
                <div className="font-bold text-[#002117] text-[14px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Announcements</div>
                <div className="ml-auto w-5 h-5 bg-[#DF795F] text-white flex items-center justify-center text-[10px] font-bold" style={{ borderRadius: "50%" }}>3</div>
              </div>
              <div className="space-y-5">
                {announcements.map((a, i) => (
                  <div key={i} className={`pb-5 ${i < announcements.length - 1 ? "border-b border-[#F0F5F2]" : ""}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5"
                        style={{
                          borderRadius: 20,
                          fontFamily: "'DM Sans', sans-serif",
                          background: a.tag === "Compliance" ? "#FFF4E0" : a.tag === "Feature" ? "#E8F8F2" : "#E8F0EC",
                          color: a.tag === "Compliance" ? "#B07A10" : a.tag === "Feature" ? "#2DAF85" : "#064E3B",
                        }}
                      >
                        {a.tag}
                      </span>
                      <span className="text-[10px] text-[#8AAA94]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.date}</span>
                    </div>
                    <div className="font-semibold text-[#002117] text-[13px] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.title}</div>
                    <p className="text-[#5A6B5A] text-[12px] leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-[#002117] p-6 mt-4" style={{ borderRadius: 4 }}>
              <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Portfolio at a glance</div>
              {[
                { label: "Buildings active", value: "47" },
                { label: "Team members", value: "6" },
                { label: "EPC alerts", value: "3", alert: true },
                { label: "Open fault tickets", value: "12" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                  <span className="text-white/60 text-[12px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</span>
                  <span className="font-bold text-[14px]" style={{ fontFamily: "'Fraunces', serif", color: s.alert ? "#DF795F" : "white" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
