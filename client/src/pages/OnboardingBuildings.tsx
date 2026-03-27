import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, FileText, CheckCircle, ArrowRight, Download, Building2 } from "lucide-react";

const steps = [
  { num: 1, label: "Sign In", done: true },
  { num: 2, label: "Upload Buildings", active: true },
  { num: 3, label: "Add Team" },
  { num: 4, label: "Magic Links" },
  { num: 5, label: "Go Live" },
];

const sampleBuildings = [
  { name: "Waterfall Corporate Estate", location: "Midrand, GP", gla: "18,200 m²", epc: "A", meter: "WCE-001" },
  { name: "Sandton Heights", location: "Sandton, GP", gla: "22,400 m²", epc: "B", meter: "SH-002" },
  { name: "Cape Green Tower", location: "Cape Town, WC", gla: "15,600 m²", epc: "A+", meter: "CGT-003" },
  { name: "Mombasa Logistics Hub", location: "KZN", gla: "8,900 m²", epc: "C", meter: "MLH-004" },
];

export default function OnboardingBuildings() {
  const [, navigate] = useLocation();
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex">
      {/* Left sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#002117] text-white px-8 py-10">
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-7 h-7 rounded bg-[#2DAF85] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white"/>
            </svg>
          </div>
          <span className="text-[14px] font-semibold" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG Africa</span>
        </div>

        <div>
          <p className="text-[10px] text-[#6BAF8A] tracking-widest uppercase mb-6" style={{fontFamily:"'Work Sans',sans-serif"}}>Onboarding steps</p>
          <div className="space-y-1">
            {steps.map((s) => (
              <div key={s.num} className={`flex items-center gap-3 px-3 py-2.5 rounded-sm ${s.active ? "bg-[#003527] border-l-2 border-[#2DAF85]" : ""}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${s.done ? "bg-[#2DAF85] text-white" : s.active ? "bg-[#2DAF85] text-white" : "bg-[#1A3D2E] text-[#6BAF8A]"}`}>
                  {s.done ? "✓" : s.num}
                </div>
                <span className={`text-[12px] ${s.active ? "text-white font-medium" : s.done ? "text-[#8BBFA0]" : "text-[#4A7A5A]"}`} style={{fontFamily:"'Work Sans',sans-serif"}}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-4 bg-[#003527] rounded-lg">
            <p className="text-[11px] text-[#B0F0D6] leading-relaxed" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Upload your building portfolio once. GreenBDG will automatically configure dashboards for every stakeholder.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 lg:px-16 py-12 overflow-y-auto">
        <div className="max-w-2xl">
          <div className="mb-8">
            <p className="text-[11px] text-[#2DAF85] tracking-widest uppercase font-medium mb-2" style={{fontFamily:"'Work Sans',sans-serif"}}>Step 2 of 5</p>
            <h1 className="text-3xl font-bold text-[#002117] mb-2" style={{fontFamily:"'Libre Baskerville',serif"}}>Upload your buildings</h1>
            <p className="text-[13px] text-[#5A8A6A]" style={{fontFamily:"'Work Sans',sans-serif"}}>
              Upload a CSV with your building portfolio. We'll extract GLA, EPC ratings, meter IDs and location data automatically.
            </p>
          </div>

          {/* Download template */}
          <div className="flex items-center justify-between p-4 bg-[#F0F7F4] border border-[#CCE0D6] rounded-lg mb-6">
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-[#064E3B]" />
              <div>
                <div className="text-[12px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG_Building_Template.csv</div>
                <div className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Required columns: Building Name, Location, GLA (m²), EPC Rating, Meter ID</div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-[#064E3B] border border-[#064E3B] rounded hover:bg-[#064E3B] hover:text-white transition-colors" style={{fontFamily:"'Work Sans',sans-serif"}}>
              <Download size={12} />
              Download
            </button>
          </div>

          {/* Upload zone */}
          {!uploaded ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${dragOver ? "border-[#064E3B] bg-[#F0F7F4]" : "border-[#CCE0D6] bg-white hover:border-[#064E3B] hover:bg-[#F9F9F8]"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={() => { setDragOver(false); setUploaded(true); }}
              onClick={() => setUploaded(true)}
            >
              <div className="w-12 h-12 rounded-full bg-[#F0F7F4] flex items-center justify-center mx-auto mb-4">
                <Upload size={20} className="text-[#064E3B]" />
              </div>
              <p className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Drop your CSV here</p>
              <p className="text-[12px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>or click to browse · CSV files only · Max 10MB</p>
            </div>
          ) : (
            <div className="border border-[#CCE0D6] rounded-xl overflow-hidden bg-white">
              <div className="flex items-center gap-3 px-5 py-4 bg-[#F0F7F4] border-b border-[#CCE0D6]">
                <CheckCircle size={16} className="text-[#2DAF85]" />
                <div>
                  <div className="text-[13px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>growthpoint_buildings.csv · 48 buildings detected</div>
                  <div className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Preview of first 4 rows</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]" style={{fontFamily:"'Work Sans',sans-serif"}}>
                  <thead>
                    <tr className="border-b border-[#E8F0EC]">
                      {["Building Name", "Location", "GLA", "EPC", "Meter ID"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-[#6BAF8A] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleBuildings.map((b, i) => (
                      <tr key={i} className="border-b border-[#F0F7F4] data-row">
                        <td className="px-4 py-3 font-medium text-[#002117]">
                          <div className="flex items-center gap-2">
                            <Building2 size={12} className="text-[#6BAF8A]" />
                            {b.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#5A8A6A]">{b.location}</td>
                        <td className="px-4 py-3 text-[#5A8A6A]">{b.gla}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.epc === "A+" ? "epc-a-plus" : b.epc === "A" ? "epc-a" : b.epc === "B" ? "epc-b" : "epc-d"}`}>
                            {b.epc}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#5A8A6A] font-mono text-[11px]">{b.meter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-[#F9F9F8] text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>
                + 44 more buildings · 4 provinces · Gauteng, Western Cape, KZN, Limpopo
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => navigate("/signin")}
              className="text-[13px] text-[#6BAF8A] hover:text-[#064E3B] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              ← Back
            </button>
            <button
              onClick={() => navigate("/onboarding/staff")}
              className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white text-[13px] font-semibold rounded hover:bg-[#003527] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              Continue to Add Team
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
