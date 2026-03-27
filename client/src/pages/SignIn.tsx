/**
 * Admin Sign In — Botanical design system
 * Linen background #F7FAF7, Fraunces heading, DM Sans body, eucalyptus CTA
 * Songo Didiza (GreenBDG Implementation Lead) signs in to set up client account
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-onboarding-W8m83tJcenuZivUqHsjVYR.webp";

export default function SignIn() {
  const [, navigate] = useLocation();
  const [showPass, setShowPass] = useState(false);
  const [email] = useState("songo.didiza@greenbdg.co.za");

  return (
    <div className="min-h-screen flex" style={{ background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left: form */}
      <div className="w-full lg:w-[500px] flex flex-col justify-center px-10 py-12 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[#52796F] hover:text-[#354F52] transition-colors bg-transparent border-none mr-2">
            <ArrowLeft size={15} />
          </button>
          <div className="w-9 h-9 bg-[#52796F] flex items-center justify-center" style={{ borderRadius: 10 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
              <path d="M12 2v20M4 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-[#354F52]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>GreenBDG Africa</span>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-[#84A98C]/15 text-[#52796F] text-[11px] font-semibold rounded-full" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
            Implementation Portal
          </span>
        </div>

        <h1 className="bot-heading mb-2" style={{ fontSize: 30 }}>Welcome back, Songo.</h1>
        <p className="text-[#7A9A82] text-[14px] mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Sign in to set up your client's GreenBDG account.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#354F52] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Work email
            </label>
            <input className="bot-input" type="email" defaultValue={email} readOnly />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#354F52] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <div className="relative">
              <input
                className="bot-input"
                type={showPass ? "text" : "password"}
                defaultValue="••••••••"
                style={{ paddingRight: "2.75rem" }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84A98C] hover:text-[#52796F] bg-transparent border-none"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-[12px] text-[#52796F] hover:text-[#354F52] bg-transparent border-none font-medium">
              Forgot password?
            </button>
          </div>
          <button
            onClick={() => navigate("/onboarding/checklist")}
            className="bot-btn mt-2"
          >
            Sign in to portal
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#84A98C]/15">
          <p className="text-[12px] text-[#84A98C] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Or jump straight to a dashboard:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "CFO Dashboard", path: "/dashboard/cfo" },
              { label: "Sustainability", path: "/dashboard/sustainability" },
              { label: "Portfolio", path: "/dashboard/portfolio" },
              { label: "Building Mgr", path: "/dashboard/building" },
              { label: "FM Dashboard", path: "/dashboard/fm" },
              { label: "Tenant Portal", path: "/dashboard/tenant" },
            ].map((d) => (
              <button
                key={d.label}
                onClick={() => navigate(d.path)}
                className="px-3 py-2 text-[11px] font-medium text-[#52796F] border border-[#84A98C]/25 hover:bg-[#F7FAF7] hover:border-[#52796F] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 10 }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: hero image */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(53,79,82,0.75) 0%, rgba(44,62,51,0.85) 100%)" }} />
        <div className="relative z-10 flex flex-col justify-end p-14">
          <div className="mb-8">
            <div className="text-[11px] font-semibold text-[#84A98C] uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Setting up for
            </div>
            <div className="text-white font-bold mb-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 22 }}>
              Growthpoint Properties
            </div>
            <div className="text-white/60 text-[13px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              34 buildings · 6 users · Johannesburg, Cape Town, Durban
            </div>
          </div>
          <blockquote>
            <p className="text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontStyle: "italic" }}>
              "GreenBDG gave us a single view of our entire portfolio's carbon footprint — from the CFO to the building manager."
            </p>
            <footer className="text-[13px] text-[#84A98C]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              — Amahle Dube, CFO · Growthpoint Properties
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
