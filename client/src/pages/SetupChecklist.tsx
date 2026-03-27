/**
 * Admin Setup Checklist — Botanical design system
 * Songo's admin home after sign-in. Two tasks: upload buildings, upload staff.
 * Step 1 active. Step 2 locked until buildings are loaded.
 */
import { useLocation } from "wouter";
import { Building2, Users, CheckCircle2, Lock, ArrowRight, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Building2 size={22} />,
    title: "Upload building portfolio",
    desc: "Import your building list via CSV template. Add addresses, floor areas, EPC ratings, financial data, and utility accounts. The platform validates each record and flags missing information.",
    tags: ["Download CSV template", "Upload & validate", "Review data checklist"],
    cta: "Start building upload",
    path: "/onboarding/buildings",
    locked: false,
    status: "active",
  },
  {
    num: "02",
    icon: <Users size={22} />,
    title: "Upload staff & send magic links",
    desc: "Upload your staff list with roles and building assignments. The platform sends personalised magic link invitations. Each user confirms their details, verifies via OTP, and lands in their dashboard.",
    tags: ["Upload staff CSV", "Assign roles", "Send magic links"],
    cta: "Upload staff list",
    path: "/onboarding/staff",
    locked: true,
    status: "locked",
    lockReason: "Complete building upload first",
  },
];

export default function SetupChecklist() {
  const [, navigate] = useLocation();

  return (
    <div className="bot-page min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#84A98C]/15 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#52796F] flex items-center justify-center" style={{ borderRadius: 10 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-[#354F52]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>GreenBDG Africa</span>
            <span className="text-[11px] text-[#84A98C] ml-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Admin Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#84A98C]/20 rounded-full flex items-center justify-center text-[#52796F] font-bold text-[12px]">
            SD
          </div>
          <span className="text-[13px] text-[#354F52] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Songo Didiza</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Welcome */}
        <div className="mb-12">
          <div className="text-[11px] font-semibold text-[#84A98C] uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            New client setup
          </div>
          <h1 className="bot-heading mb-3" style={{ fontSize: 32 }}>
            Setting up Growthpoint Properties.
          </h1>
          <p className="text-[#7A9A82] text-[15px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Complete these two steps to onboard your client. Step 2 unlocks automatically once buildings are loaded.
          </p>
        </div>

        {/* Client summary card */}
        <div className="bot-card p-6 mb-10 flex items-center justify-between">
          <div>
            <div className="font-bold text-[#354F52] mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>Growthpoint Properties</div>
            <div className="text-[13px] text-[#7A9A82]" style={{ fontFamily: "'DM Sans', sans-serif" }}>34 buildings · Johannesburg, Cape Town, Durban, Pretoria · Tier 2 (10–100 buildings)</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold text-[#84A98C] uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Account status</div>
            <span className="px-3 py-1 bg-[#FFF8E1] text-[#F57F17] text-[11px] font-semibold rounded-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Setup in progress
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`bot-card p-8 transition-all ${step.locked ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-5">
                {/* Step indicator */}
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center ${step.locked ? "bg-[#84A98C]/10 text-[#84A98C]" : "bg-[#52796F]/10 text-[#52796F]"}`} style={{ borderRadius: 12 }}>
                  {step.locked ? <Lock size={20} /> : step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-bold text-[#84A98C] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Step {step.num}
                    </span>
                    {step.locked && (
                      <span className="px-2 py-0.5 bg-[#84A98C]/10 text-[#84A98C] text-[10px] font-semibold rounded-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Locked — {step.lockReason}
                      </span>
                    )}
                  </div>
                  <h3 className="bot-heading mb-2" style={{ fontSize: 20 }}>{step.title}</h3>
                  <p className="text-[#7A9A82] text-[14px] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {step.tags.map((tag, j) => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7FAF7] text-[#52796F] text-[12px] font-medium rounded-full border border-[#84A98C]/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <span className="w-4 h-4 bg-[#52796F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">{j + 1}</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {!step.locked && (
                    <button
                      onClick={() => navigate(step.path)}
                      className="bot-btn"
                      style={{ width: "auto", padding: "0.75rem 1.75rem", display: "inline-flex", alignItems: "center", gap: 8 }}
                    >
                      {step.cta}
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick access to dashboards */}
        <div className="mt-12 pt-8 border-t border-[#84A98C]/15">
          <div className="text-[12px] font-semibold text-[#84A98C] uppercase tracking-wider mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Preview dashboards
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "CFO", path: "/dashboard/cfo" },
              { label: "Sustainability", path: "/dashboard/sustainability" },
              { label: "Portfolio", path: "/dashboard/portfolio" },
              { label: "Building Mgr", path: "/dashboard/building" },
              { label: "Facilities", path: "/dashboard/fm" },
              { label: "Tenant Portal", path: "/dashboard/tenant" },
            ].map(d => (
              <button
                key={d.label}
                onClick={() => navigate(d.path)}
                className="flex items-center justify-between px-4 py-3 bg-white border border-[#84A98C]/20 hover:border-[#52796F] hover:bg-[#F7FAF7] transition-all text-[13px] font-medium text-[#354F52]"
                style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 12 }}
              >
                {d.label}
                <ChevronRight size={13} className="text-[#84A98C]" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
