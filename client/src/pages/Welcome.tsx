/**
 * GreenBDG Africa — Welcome / Org Setup Entry
 * Post-purchase: first screen the admin sees after signing in for the first time
 * Botanical design: linen #F7FAF7, Fraunces serif, DM Sans body
 * 3-step progress: Buildings → Team → Go Live
 */
import { useLocation } from "wouter";
import { ArrowRight, Building2, Users, Zap, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, icon: <Building2 size={20} />, label: "Add Buildings", desc: "Upload your portfolio via CSV or add buildings manually" },
  { id: 2, icon: <Users size={20} />, label: "Set Up Your Team", desc: "Invite staff and assign roles to buildings" },
  { id: 3, icon: <Zap size={20} />, label: "Go Live", desc: "Your team receives magic link invitations and lands on their dashboards" },
];

export default function Welcome() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-[#E0EBE4] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#064E3B] flex items-center justify-center" style={{ borderRadius: 2 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-bold text-[#002117] text-[14px]">GreenBDG Africa</span>
        </div>
        <div className="text-[12px] text-[#8AAA94]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Setup wizard · Step 1 of 3
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          {/* Welcome heading */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#064E3B] flex items-center justify-center mx-auto mb-6" style={{ borderRadius: "50%" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
                <path d="M12 2v20M4 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
              </svg>
            </div>
            <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Welcome to GreenBDG Africa
            </div>
            <h1 className="text-[#002117] font-bold mb-4" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.2 }}>
              Let's set up your organisation.
            </h1>
            <p className="text-[#5A6B5A] max-w-lg mx-auto leading-relaxed" style={{ fontSize: 15 }}>
              We'll walk you through three quick steps. By the end, your entire team will have personalised dashboards — and your portfolio will be live inside GreenBDG.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="bg-white border border-[#E0EBE4] p-6 flex items-center gap-5" style={{ borderRadius: 4 }}>
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: i === 0 ? "#064E3B" : "#E8F0EC", borderRadius: "50%", color: i === 0 ? "white" : "#064E3B" }}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold text-[#8AAA94] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Step {s.id}</span>
                    {i === 0 && <span className="text-[10px] font-bold text-[#064E3B] bg-[#E8F0EC] px-2 py-0.5" style={{ borderRadius: 20 }}>Up next</span>}
                  </div>
                  <div className="font-bold text-[#002117] text-[15px] mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
                  <div className="text-[#5A6B5A] text-[13px]">{s.desc}</div>
                </div>
                {i === 0 && <ArrowRight size={18} className="text-[#064E3B] flex-shrink-0" />}
                {i > 0 && <div className="w-5 h-5 border-2 border-[#D0DDD4]" style={{ borderRadius: "50%" }} />}
              </div>
            ))}
          </div>

          {/* Estimated time */}
          <div className="bg-[#002117] p-5 flex items-center gap-4 mb-8" style={{ borderRadius: 4 }}>
            <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 2 }}>
              <Zap size={18} className="text-[#6BAF8A]" />
            </div>
            <div>
              <div className="text-white font-semibold text-[13px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Estimated setup time: under 20 minutes</div>
              <div className="text-white/50 text-[12px]">Your GreenBDG implementation lead is available to assist if needed</div>
            </div>
          </div>

          <button
            onClick={() => navigate("/setup/buildings")}
            className="w-full cp-btn-primary text-[15px] justify-center"
            style={{ padding: "1rem" }}
          >
            Start setup — Add your buildings
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
