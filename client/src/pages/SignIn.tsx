import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328168552/7LFaJoytji6z7JBaxftKtH/hero-onboarding-W8m83tJcenuZivUqHsjVYR.webp";

export default function SignIn() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("admin@growthpoint.co.za");
  const [password, setPassword] = useState("••••••••");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left: form */}
      <div className="w-full lg:w-[480px] flex flex-col justify-center px-10 py-12 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-12">
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#002117] mb-2" style={{fontFamily:"'Libre Baskerville',serif"}}>Welcome back.</h1>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Sign in to your GreenBDG account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#003527] uppercase tracking-wider mb-1.5" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-[13px] border border-[#CCE0D6] rounded bg-[#F9F9F8] text-[#002117] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#003527] uppercase tracking-wider mb-1.5" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-[13px] border border-[#CCE0D6] rounded bg-[#F9F9F8] text-[#002117] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors pr-10"
                style={{fontFamily:"'Work Sans',sans-serif"}}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6BAF8A] hover:text-[#064E3B]"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate("/onboarding/buildings")}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#064E3B] text-white text-[14px] font-semibold rounded hover:bg-[#003527] transition-colors mt-2"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Sign in
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8F0EC]">
          <p className="text-[12px] text-[#6BAF8A] mb-3" style={{fontFamily:"'Work Sans',sans-serif"}}>Or jump straight to a dashboard:</p>
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
                className="px-3 py-2 text-[11px] font-medium text-[#064E3B] border border-[#CCE0D6] rounded hover:bg-[#F0F7F4] hover:border-[#064E3B] transition-colors"
                style={{fontFamily:"'Work Sans',sans-serif"}}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: hero image */}
      <div className="hidden lg:flex flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#002117]/60" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <blockquote className="text-white">
            <p className="text-2xl font-bold leading-snug mb-4" style={{fontFamily:"'Libre Baskerville',serif"}}>
              "GreenBDG gave us a single view of our entire portfolio's carbon footprint — from the CFO to the building manager."
            </p>
            <footer className="text-[13px] text-[#B0F0D6]" style={{fontFamily:"'Work Sans',sans-serif"}}>
              — Amahle Dube, CFO · Growthpoint Properties
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
