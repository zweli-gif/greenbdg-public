import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function PasswordSetup() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  const strength = password.length > 8 ? (password.length > 12 ? "strong" : "medium") : password.length > 0 ? "weak" : "";

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2.5 justify-center mb-6">
            <div className="w-7 h-7 rounded bg-[#064E3B] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white"/></svg>
            </div>
            <span className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG Africa</span>
          </div>
          <h1 className="text-3xl font-bold text-[#002117] mb-2" style={{fontFamily:"'Libre Baskerville',serif"}}>Set your password.</h1>
          <p className="text-[13px] text-[#5A8A6A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Choose a strong password to secure your GreenBDG account.</p>
        </div>

        <div className="bg-white border border-[#E8F0EC] rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#003527] uppercase tracking-wider mb-1.5" style={{fontFamily:"'Work Sans',sans-serif"}}>New password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-3 text-[13px] border border-[#CCE0D6] rounded bg-[#F9F9F8] text-[#002117] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors pr-10"
                style={{fontFamily:"'Work Sans',sans-serif"}}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6BAF8A]">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {strength && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {["weak","medium","strong"].map((s, i) => (
                    <div key={s} className={`h-1 w-8 rounded-full ${i <= ["weak","medium","strong"].indexOf(strength) ? (strength === "strong" ? "bg-[#2DAF85]" : strength === "medium" ? "bg-[#E8A838]" : "bg-[#DF795F]") : "bg-[#E8F0EC]"}`} />
                  ))}
                </div>
                <span className="text-[10px] text-[#6BAF8A] capitalize" style={{fontFamily:"'Work Sans',sans-serif"}}>{strength}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#003527] uppercase tracking-wider mb-1.5" style={{fontFamily:"'Work Sans',sans-serif"}}>Confirm password</label>
            <div className="relative">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 text-[13px] border border-[#CCE0D6] rounded bg-[#F9F9F8] text-[#002117] focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-colors pr-10"
                style={{fontFamily:"'Work Sans',sans-serif"}}
              />
              {confirm && confirm === password && (
                <CheckCircle size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2DAF85]" />
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/fm")}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#064E3B] text-white text-[13px] font-semibold rounded hover:bg-[#003527] transition-colors mt-2"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Access my dashboard
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
