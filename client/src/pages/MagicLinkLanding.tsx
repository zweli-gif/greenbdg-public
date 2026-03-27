import { useLocation } from "wouter";
import { ArrowRight, Shield } from "lucide-react";

export default function MagicLinkLanding() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#F0F7F4] flex items-center justify-center mx-auto mb-4">
            <Shield size={24} className="text-[#064E3B]" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F7F4] border border-[#CCE0D6] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#2DAF85]" />
            <span className="text-[11px] text-[#064E3B] font-medium" style={{fontFamily:"'Work Sans',sans-serif"}}>Secure magic link · Single use</span>
          </div>
          <h1 className="text-3xl font-bold text-[#002117] mb-2" style={{fontFamily:"'Libre Baskerville',serif"}}>Welcome, Sipho.</h1>
          <p className="text-[13px] text-[#5A8A6A]" style={{fontFamily:"'Work Sans',sans-serif"}}>
            You've been invited to GreenBDG Africa as <strong>Facilities Manager</strong> at Waterfall Corporate Estate.
          </p>
        </div>

        <div className="bg-white border border-[#E8F0EC] rounded-xl p-6 mb-6">
          <div className="space-y-3">
            {[
              { label: "Name", value: "Sipho Mthembu" },
              { label: "Email", value: "s.mthembu@growthpoint.co.za" },
              { label: "Role", value: "Facilities Manager" },
              { label: "Building", value: "Waterfall Corporate Estate" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between items-center py-2 border-b border-[#F0F7F4] last:border-0">
                <span className="text-[11px] text-[#6BAF8A] font-medium uppercase tracking-wider" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.label}</span>
                <span className="text-[13px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/onboarding/password-setup")}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#064E3B] text-white text-[13px] font-semibold rounded hover:bg-[#003527] transition-colors"
          style={{fontFamily:"'Work Sans',sans-serif"}}
        >
          Set your password & access dashboard
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
