import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, CheckCircle, ArrowRight, Users } from "lucide-react";

const steps = [
  { num: 1, label: "Sign In", done: true },
  { num: 2, label: "Upload Buildings", done: true },
  { num: 3, label: "Add Team", active: true },
  { num: 4, label: "Magic Links" },
  { num: 5, label: "Go Live" },
];

const sampleStaff = [
  { name: "Amahle Dube", email: "a.dube@growthpoint.co.za", role: "CFO", building: "Portfolio" },
  { name: "Nomsa Khumalo", email: "n.khumalo@growthpoint.co.za", role: "Sustainability Manager", building: "Portfolio" },
  { name: "Richard Patel", email: "r.patel@growthpoint.co.za", role: "Portfolio Manager", building: "Portfolio" },
  { name: "Nkosi Dlamini", email: "n.dlamini@growthpoint.co.za", role: "Building Manager", building: "Sandton Heights" },
  { name: "Sipho Mthembu", email: "s.mthembu@growthpoint.co.za", role: "Facilities Manager", building: "Waterfall Estate" },
];

const roleColors: Record<string, string> = {
  "CFO": "bg-[#E8A838] text-white",
  "Sustainability Manager": "bg-[#2DAF85] text-white",
  "Portfolio Manager": "bg-[#0A6B4F] text-white",
  "Building Manager": "bg-[#064E3B] text-white",
  "Facilities Manager": "bg-[#1A8C6A] text-white",
};

export default function OnboardingStaff() {
  const [, navigate] = useLocation();
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex">
      <aside className="hidden lg:flex flex-col w-72 bg-[#002117] text-white px-8 py-10">
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-7 h-7 rounded bg-[#2DAF85] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white"/></svg>
          </div>
          <span className="text-[14px] font-semibold" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG Africa</span>
        </div>
        <div>
          <p className="text-[10px] text-[#6BAF8A] tracking-widest uppercase mb-6" style={{fontFamily:"'Work Sans',sans-serif"}}>Onboarding steps</p>
          <div className="space-y-1">
            {steps.map((s) => (
              <div key={s.num} className={`flex items-center gap-3 px-3 py-2.5 rounded-sm ${s.active ? "bg-[#003527] border-l-2 border-[#2DAF85]" : ""}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${s.done || s.active ? "bg-[#2DAF85] text-white" : "bg-[#1A3D2E] text-[#6BAF8A]"}`}>
                  {s.done ? "✓" : s.num}
                </div>
                <span className={`text-[12px] ${s.active ? "text-white font-medium" : s.done ? "text-[#8BBFA0]" : "text-[#4A7A5A]"}`} style={{fontFamily:"'Work Sans',sans-serif"}}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 px-8 lg:px-16 py-12 overflow-y-auto">
        <div className="max-w-2xl">
          <div className="mb-8">
            <p className="text-[11px] text-[#2DAF85] tracking-widest uppercase font-medium mb-2" style={{fontFamily:"'Work Sans',sans-serif"}}>Step 3 of 5</p>
            <h1 className="text-3xl font-bold text-[#002117] mb-2" style={{fontFamily:"'Libre Baskerville',serif"}}>Add your team</h1>
            <p className="text-[13px] text-[#5A8A6A]" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Upload your staff list. GreenBDG will assign each person to their role and building, then send personalised magic links.
            </p>
          </div>

          {!uploaded ? (
            <div
              className="border-2 border-dashed border-[#CCE0D6] rounded-xl p-12 text-center bg-white hover:border-[#064E3B] hover:bg-[#F9F9F8] cursor-pointer transition-colors"
              onClick={() => setUploaded(true)}
            >
              <div className="w-12 h-12 rounded-full bg-[#F0F7F4] flex items-center justify-center mx-auto mb-4">
                <Users size={20} className="text-[#064E3B]" />
              </div>
              <p className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Upload staff CSV</p>
              <p className="text-[12px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Required: Name, Email, Role, Building Assignment</p>
            </div>
          ) : (
            <div className="border border-[#CCE0D6] rounded-xl overflow-hidden bg-white">
              <div className="flex items-center gap-3 px-5 py-4 bg-[#F0F7F4] border-b border-[#CCE0D6]">
                <CheckCircle size={16} className="text-[#2DAF85]" />
                <div>
                  <div className="text-[13px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>growthpoint_staff.csv · 23 team members detected</div>
                  <div className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Preview of key stakeholders</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{fontFamily:"'Work Sans',sans-serif"}}>
                  <thead>
                    <tr className="border-b border-[#E8F0EC]">
                      {["Name", "Email", "Role", "Building"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-[#6BAF8A] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleStaff.map((s, i) => (
                      <tr key={i} className="border-b border-[#F0F7F4] data-row">
                        <td className="px-4 py-3 font-medium text-[#002117]">{s.name}</td>
                        <td className="px-4 py-3 text-[#5A8A6A]">{s.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleColors[s.role] || "bg-[#F0F7F4] text-[#064E3B]"}`}>{s.role}</span>
                        </td>
                        <td className="px-4 py-3 text-[#5A8A6A]">{s.building}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-[#F9F9F8] text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>
                + 18 more team members across 4 provinces
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button onClick={() => navigate("/onboarding/buildings")} className="text-[13px] text-[#6BAF8A] hover:text-[#064E3B] transition-colors" style={{fontFamily:"'Work Sans',sans-serif"}}>← Back</button>
            <button
              onClick={() => navigate("/onboarding/magic-link-sent")}
              className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white text-[13px] font-semibold rounded hover:bg-[#003527] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              Send Magic Links
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
