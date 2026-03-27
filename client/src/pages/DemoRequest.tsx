/**
 * GreenBDG Africa — Demo Request Page
 * Enterprise contact form: company details → submitted to GreenBDG team
 * Botanical design system: linen background, Fraunces serif, DM Sans body
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Building2, Users, Mail, Phone, ChevronLeft } from "lucide-react";

const BUILDING_TYPES = ["Office A-Grade", "Office B-Grade", "Retail Centre", "Industrial / Warehouse", "Hotel", "Mixed-Use", "Residential"];
const ESG_TOOLS = ["None / Spreadsheets", "Internal system", "MRI Software", "Yardi", "Buildium", "Other"];

export default function DemoRequest() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", role: "", portfolioSize: "", buildingTypes: [] as string[],
    currentTool: "", message: "", preferredDate: "",
  });

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleBuildingType(type: string) {
    setForm(prev => ({
      ...prev,
      buildingTypes: prev.buildingTypes.includes(type)
        ? prev.buildingTypes.filter(t => t !== type)
        : [...prev.buildingTypes, type],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-lg w-full mx-4 text-center">
          <div className="w-16 h-16 bg-[#064E3B] flex items-center justify-center mx-auto mb-6" style={{ borderRadius: "50%" }}>
            <CheckCircle2 size={32} className="text-white" />
          </div>
          <h1 className="text-[#002117] font-bold mb-4" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
            Thank you, {form.firstName}.
          </h1>
          <p className="text-[#5A6B5A] mb-8 leading-relaxed" style={{ fontSize: 16 }}>
            We've received your demo request for <strong>{form.company}</strong>. A member of the GreenBDG team will be in touch within one business day to schedule your personalised walkthrough.
          </p>
          <div className="bg-white border border-[#E0EBE4] p-6 mb-8 text-left" style={{ borderRadius: 4 }}>
            <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>What happens next</div>
            {[
              { step: "1", text: "Our team reviews your portfolio profile and prepares a tailored demo" },
              { step: "2", text: "We send you a calendar invite for your preferred date and time" },
              { step: "3", text: "A 45-minute live walkthrough of GreenBDG using your building types as examples" },
              { step: "4", text: "Post-demo: a proposal with implementation timeline and pricing" },
            ].map(s => (
              <div key={s.step} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-6 h-6 bg-[#064E3B] text-white flex items-center justify-center flex-shrink-0 text-[11px] font-bold" style={{ borderRadius: "50%" }}>{s.step}</div>
                <p className="text-[#5A6B5A] text-[13px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/")} className="text-[13px] font-semibold text-[#064E3B] flex items-center gap-2 mx-auto">
            <ChevronLeft size={14} /> Back to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="bg-white border-b border-[#E0EBE4] px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 bg-transparent border-none">
          <div className="w-8 h-8 bg-[#064E3B] flex items-center justify-center" style={{ borderRadius: 2 }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="font-bold text-[#002117] text-[14px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>GreenBDG Africa</span>
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-[13px] text-[#5A6B5A] hover:text-[#064E3B] transition-colors bg-transparent border-none">
          <ChevronLeft size={14} /> Back
        </button>
      </nav>

      <div className="container py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: context */}
          <div className="lg:col-span-2">
            <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Enterprise Demo</div>
            <h1 className="text-[#002117] font-bold mb-5" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1.2 }}>
              Let's show you GreenBDG in action.
            </h1>
            <p className="text-[#5A6B5A] mb-8 leading-relaxed" style={{ fontSize: 14 }}>
              Fill in your details and we'll prepare a personalised demo tailored to your portfolio — using your building types, compliance obligations, and ESG reporting requirements as the foundation.
            </p>
            <div className="space-y-5">
              {[
                { icon: <Building2 size={18} className="text-[#064E3B]" />, title: "Tailored to your portfolio", desc: "We prepare examples using your building types and size" },
                { icon: <Users size={18} className="text-[#064E3B]" />, title: "All stakeholders welcome", desc: "CFO, ESG Manager, Portfolio Manager — bring your team" },
                { icon: <Mail size={18} className="text-[#064E3B]" />, title: "Response within 24 hours", desc: "A GreenBDG consultant will confirm your demo slot" },
              ].map(f => (
                <div key={f.title} className="flex gap-3">
                  <div className="w-9 h-9 bg-[#E8F0EC] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 2 }}>{f.icon}</div>
                  <div>
                    <div className="font-semibold text-[#002117] text-[13px] mb-0.5">{f.title}</div>
                    <div className="text-[#5A6B5A] text-[12px]">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[#E0EBE4]">
              <div className="text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-3">Contact us directly</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[13px] text-[#5A6B5A]"><Mail size={13} /> zweli@greenbdg.co.za</div>
                <div className="flex items-center gap-2 text-[13px] text-[#5A6B5A]"><Phone size={13} /> +27 11 000 0000</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-[#E0EBE4] p-8" style={{ borderRadius: 4 }}>
              <div className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Your details</div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "First Name", field: "firstName", placeholder: "Thabo" },
                  { label: "Last Name", field: "lastName", placeholder: "Sibeko" },
                ].map(f => (
                  <div key={f.field}>
                    <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">{f.label} *</label>
                    <input required value={(form as any)[f.field]} onChange={e => update(f.field, e.target.value)} placeholder={f.placeholder}
                      className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Work Email", field: "email", placeholder: "thabo@company.co.za", type: "email" },
                  { label: "Phone", field: "phone", placeholder: "+27 82 000 0000", type: "tel" },
                ].map(f => (
                  <div key={f.field}>
                    <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">{f.label} *</label>
                    <input required type={f.type} value={(form as any)[f.field]} onChange={e => update(f.field, e.target.value)} placeholder={f.placeholder}
                      className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Company / Organisation", field: "company", placeholder: "Growthpoint Properties" },
                  { label: "Your Role", field: "role", placeholder: "CFO / ESG Manager / Portfolio Manager" },
                ].map(f => (
                  <div key={f.field}>
                    <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">{f.label} *</label>
                    <input required value={(form as any)[f.field]} onChange={e => update(f.field, e.target.value)} placeholder={f.placeholder}
                      className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">Portfolio Size</label>
                  <select value={form.portfolioSize} onChange={e => update("portfolioSize", e.target.value)}
                    className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] bg-white focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }}>
                    <option value="">Select range</option>
                    {["1–5 buildings", "6–20 buildings", "21–50 buildings", "51–100 buildings", "100+ buildings"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">Current ESG Tool</label>
                  <select value={form.currentTool} onChange={e => update("currentTool", e.target.value)}
                    className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] bg-white focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }}>
                    <option value="">Select</option>
                    {ESG_TOOLS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-2">Building Types in Your Portfolio</label>
                <div className="flex flex-wrap gap-2">
                  {BUILDING_TYPES.map(t => (
                    <button key={t} type="button" onClick={() => toggleBuildingType(t)}
                      className="text-[12px] px-3 py-1.5 border transition-all"
                      style={{
                        borderRadius: 20,
                        fontFamily: "'DM Sans', sans-serif",
                        background: form.buildingTypes.includes(t) ? "#064E3B" : "transparent",
                        color: form.buildingTypes.includes(t) ? "white" : "#5A6B5A",
                        borderColor: form.buildingTypes.includes(t) ? "#064E3B" : "#D0DDD4",
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">Preferred Demo Date</label>
                <input type="date" value={form.preferredDate} onChange={e => update("preferredDate", e.target.value)}
                  className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B]" style={{ borderRadius: 2 }} />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-semibold text-[#5A6B5A] uppercase tracking-wider mb-1.5">Anything specific you'd like to see?</label>
                <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={3} placeholder="e.g. Carbon tax modelling for our Sandton office tower, GRESB submission workflow, tenant portal demo..."
                  className="w-full border border-[#D0DDD4] px-3 py-2.5 text-[13px] text-[#002117] focus:outline-none focus:border-[#064E3B] resize-none" style={{ borderRadius: 2 }} />
              </div>

              <button type="submit" className="w-full cp-btn-primary text-[14px] justify-center" style={{ padding: "0.85rem" }}>
                Request your demo
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-[11px] text-[#8AAA94] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We respond within one business day. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
