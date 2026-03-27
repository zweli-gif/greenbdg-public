import { useLocation } from "wouter";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

const recipients = [
  { initials: "AD", name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", color: "bg-[#E8A838]" },
  { initials: "NK", name: "Nomsa Khumalo", email: "n.khumalo@growthpoint.co.za", role: "Sustainability Manager", color: "bg-[#2DAF85]" },
  { initials: "RP", name: "Richard Patel", email: "r.patel@growthpoint.co.za", role: "Portfolio Manager", color: "bg-[#0A6B4F]" },
  { initials: "ND", name: "Nkosi Dlamini", email: "n.dlamini@growthpoint.co.za", role: "Building Manager", color: "bg-[#064E3B]" },
  { initials: "SM", name: "Sipho Mthembu", email: "s.mthembu@growthpoint.co.za", role: "Facilities Manager", color: "bg-[#1A8C6A]" },
];

export default function MagicLinkSent() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#F0F7F4] flex items-center justify-center mx-auto mb-5">
            <Mail size={28} className="text-[#064E3B]" />
          </div>
          <h1 className="text-3xl font-bold text-[#002117] mb-3" style={{fontFamily:"'Libre Baskerville',serif"}}>Magic links sent.</h1>
          <p className="text-[13px] text-[#5A8A6A] leading-relaxed" style={{fontFamily:"'Work Sans',sans-serif"}}>
            We've dispatched personalised, single-use magic links to your entire team. Each link routes them directly to their role-specific dashboard.
          </p>
        </div>

        <div className="bg-white border border-[#E8F0EC] rounded-xl overflow-hidden mb-6">
          <div className="px-5 py-3 border-b border-[#E8F0EC]">
            <p className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider" style={{fontFamily:"'Work Sans',sans-serif"}}>23 links dispatched</p>
          </div>
          <div className="divide-y divide-[#F0F7F4]">
            {recipients.map((r) => (
              <div key={r.name} className="flex items-center gap-3 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-full ${r.color} flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0`}>
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.name}</div>
                  <div className="text-[11px] text-[#6BAF8A] truncate" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.email} · {r.role}</div>
                </div>
                <CheckCircle size={14} className="text-[#2DAF85] flex-shrink-0" />
              </div>
            ))}
            <div className="px-5 py-3 text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>+ 18 more team members</div>
          </div>
        </div>

        <div className="bg-[#F0F7F4] border border-[#CCE0D6] rounded-lg p-4 mb-6">
          <p className="text-[12px] text-[#003527] leading-relaxed" style={{fontFamily:"'Work Sans',sans-serif"}}>
            <strong>What happens next:</strong> Each team member clicks their magic link, sets a password, and is instantly routed to their personalised dashboard. Links expire in 48 hours.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/onboarding/magic-link-landing")}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#064E3B] text-white text-[13px] font-semibold rounded hover:bg-[#003527] transition-colors"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Preview: Sipho's magic link experience
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate("/dashboard/fm")}
            className="text-[12px] text-[#6BAF8A] hover:text-[#064E3B] transition-colors text-center"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            Skip to FM Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
