/**
 * Building Bulk Upload — PLUSH design system
 * Deep forest green #002117, crisp white, Libre Baskerville serif
 * 3 tabs: Upload CSV → Review & Edit → Data Checklist
 * Content kept exactly as source HTML
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, ChevronRight, Download, FileText } from "lucide-react";

type Tab = "upload" | "review" | "checklist";

const DEEP = "#002117";
const FOREST = "#064E3B";
const ACCENT = "#10B981";
const GOLD = "#E8A838";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const BORDER = "rgba(0,33,23,0.1)";
const MUTED = "#6B7280";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

const buildings = [
  { name: "Sandton Towers", city: "Johannesburg", type: "Office", area: "45,000 m²", purchase: "R 485M", depreciation: "R 9.7M/yr", epc: "A", status: "complete", progress: 85 },
  { name: "Waterfront Plaza", city: "Cape Town", type: "Office", area: "32,000 m²", purchase: "R 320M", depreciation: "R 6.4M/yr", epc: "B", status: "partial", progress: 65 },
  { name: "Midrand Industrial Park", city: "Midrand", type: "Industrial", area: "78,000 m²", purchase: "R 180M", depreciation: "R 3.6M/yr", epc: "C", status: "partial", progress: 55 },
  { name: "Umhlanga Business Centre", city: "Durban", type: "Office", area: "28,500 m²", purchase: "R 245M", depreciation: "R 4.9M/yr", epc: "B", status: "complete", progress: 90 },
  { name: "Menlyn Corporate Park", city: "Pretoria", type: "Office", area: "52,000 m²", purchase: "R 380M", depreciation: "R 7.6M/yr", epc: "D", status: "missing", progress: 30 },
  { name: "Rosebank Junction", city: "Johannesburg", type: "Mixed Use", area: "38,000 m²", purchase: "R 420M", depreciation: "R 8.4M/yr", epc: "B", status: "partial", progress: 70 },
  { name: "Century City Square", city: "Cape Town", type: "Office", area: "41,000 m²", purchase: "R 355M", depreciation: "R 7.1M/yr", epc: "A", status: "complete", progress: 95 },
  { name: "Rivonia Road Offices", city: "Johannesburg", type: "Office", area: "22,000 m²", purchase: "R 195M", depreciation: "R 3.9M/yr", epc: "C", status: "partial", progress: 50 },
];

const checklistCategories = [
  { icon: "🏢", title: "Building Identity & Physical Data", items: [
    { label: "Building Name & Address", done: true, value: "Sandton Towers · 1 Maude Street, Sandton, 2196" },
    { label: "Building Type & Year Built", done: true, value: "Office Building · Built 2015" },
    { label: "Floor Area & Configuration", done: true, value: "45,000 m² total · 18 floors · 38,500 m² rentable" },
    { label: "Construction Type & Materials", done: false, value: "Steel frame, glass curtain wall — add details" },
  ]},
  { icon: "💰", title: "Financial & Asset Data", items: [
    { label: "Purchase Price / Acquisition Cost", done: true, value: "R 485,000,000 (acquired 2018)" },
    { label: "Current Book Value", done: true, value: "R 412,250,000 (as of Dec 2024)" },
    { label: "Depreciation Schedule", done: true, value: "Straight-line · 50yr life · R 9.7M/year" },
    { label: "Accumulated Depreciation", done: false, value: "Track total depreciation to date" },
    { label: "Property Tax Assessment", done: true, value: "City of JHB · Valuation: R 520M · Rates: R 1.56M/year" },
  ]},
  { icon: "📝", title: "Lease & Tenant Data", items: [
    { label: "Complete Rent Roll", done: true, value: "24 tenants · R 58.2M annual rental income" },
    { label: "Lease Terms & Expiry Dates", done: true, value: "Avg lease term: 5 years · 3 expiries in 2025" },
    { label: "Tenant Contact Information", done: true, value: "24 tenant contacts on file" },
    { label: "Operating Expense Recoveries (CAM)", done: false, value: "Recoverable expenses & reconciliation needed" },
  ]},
  { icon: "⚡", title: "Utility & Infrastructure Data", items: [
    { label: "Electricity Provider & Account", done: true, value: "City Power JHB · Account: 7845623145" },
    { label: "Water Provider & Account", done: true, value: "Johannesburg Water · Account: JW-45821" },
    { label: "Main Meter Details", done: false, value: "Meter ID, location, type — add details" },
    { label: "Sub-meter Inventory", done: false, value: "Tenant-level meter details needed" },
  ]},
  { icon: "📜", title: "Certifications & Compliance", items: [
    { label: "EPC Certificate", done: true, value: "Rating: A · Valid until Dec 2027 · EPC-SA-2019-004782" },
    { label: "Occupancy Certificate", done: true, value: "Valid · Issued 2015" },
    { label: "Green Star Certification", done: false, value: "GBCSA certification — add if applicable" },
    { label: "Fire Safety Certificate", done: false, value: "Annual inspection certificate needed" },
  ]},
];

export default function OnboardingBuildings() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("review");
  const [uploaded, setUploaded] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState("Sandton Towers");

  const complete = buildings.filter(b => b.status === "complete").length;
  const partial = buildings.filter(b => b.status === "partial").length;
  const missing = buildings.filter(b => b.status === "missing").length;

  const statusStyle = (s: string) => s === "complete"
    ? { bg: "rgba(16,185,129,0.12)", color: "#059669", label: "Complete" }
    : s === "partial"
    ? { bg: "rgba(232,168,56,0.12)", color: "#B45309", label: "Partial data" }
    : { bg: "rgba(239,68,68,0.1)", color: "#DC2626", label: "Missing critical" };

  const progressColor = (s: string) => s === "complete" ? ACCENT : s === "partial" ? GOLD : "#EF4444";

  const tabs = [
    { id: "upload" as Tab, label: "Upload CSV" },
    { id: "review" as Tab, label: "Review & Edit", count: buildings.length },
    { id: "checklist" as Tab, label: "Data Checklist" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: OFF_WHITE, fontFamily: sans, color: DEEP }}>
      {/* ── HEADER ── */}
      <header style={{
        background: DEEP, borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 40,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button onClick={() => navigate("/platform")} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.55)", background: "none", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: sans }}>
            <ArrowLeft size={14} /> Setup
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
                <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
                <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
                <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: WHITE }}>GreenBDG Africa</span>
          </div>
        </div>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["Buildings", "Staff", "Go live"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? ACCENT : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: i === 0 ? DEEP : "rgba(255,255,255,0.4)" }}>{i + 1}</div>
                <span style={{ fontFamily: mono, fontSize: 11, color: i === 0 ? WHITE : "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.15)" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: ACCENT, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: DEEP }}>SD</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)", fontFamily: sans }}>Songo Didiza</span>
        </div>
      </header>

      {/* ── TABS ── */}
      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "0 40px" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "16px 20px", background: "none",
              border: "none", borderBottom: tab === t.id ? `2.5px solid ${DEEP}` : "2.5px solid transparent",
              fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? DEEP : MUTED, cursor: "pointer", fontFamily: sans,
            }}>
              {t.label}
              {t.count !== undefined && <span style={{ padding: "1px 7px", background: tab === t.id ? DEEP : "rgba(0,33,23,0.08)", color: tab === t.id ? WHITE : MUTED, fontSize: 10, fontWeight: 700, borderRadius: 20 }}>{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>

        {/* ── UPLOAD TAB ── */}
        {tab === "upload" && (
          <div>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 8 }}>Upload your building portfolio</h1>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32 }}>Upload a CSV file with your building data. GreenBDG will parse, validate, and import all records.</p>
            {!uploaded ? (
              <div>
                <div style={{ background: WHITE, borderRadius: 16, border: `2px dashed ${BORDER}`, padding: "56px 40px", textAlign: "center", marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, background: "rgba(0,33,23,0.06)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Upload size={24} color={FOREST} />
                  </div>
                  <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: DEEP, marginBottom: 8 }}>Drop your CSV here</h3>
                  <p style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>or click to browse</p>
                  <button onClick={() => setUploaded(true)} style={{ padding: "12px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                    Choose file
                  </button>
                </div>
                <div style={{ background: WHITE, borderRadius: 14, border: `1px solid ${BORDER}`, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: DEEP, marginBottom: 2 }}>Download template</div>
                    <div style={{ fontSize: 12, color: MUTED }}>GreenBDG CSV template with all required columns</div>
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: `1px solid ${BORDER}`, borderRadius: 8, color: DEEP, fontSize: 12, fontWeight: 500, background: "none", cursor: "pointer", fontFamily: sans }}>
                    <Download size={13} /> Download
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "20px 24px", marginBottom: 24, borderLeft: `4px solid ${ACCENT}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <CheckCircle2 size={20} color={ACCENT} />
                    <div>
                      <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: DEEP }}>growthpoint_portfolio_2025.csv uploaded</div>
                      <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>34 buildings detected · 8 shown in preview · Processing complete</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                  {[
                    { label: "Complete", count: complete, bg: "rgba(16,185,129,0.08)", color: "#059669" },
                    { label: "Partial data", count: partial, bg: "rgba(232,168,56,0.08)", color: "#B45309" },
                    { label: "Missing critical", count: missing, bg: "rgba(239,68,68,0.06)", color: "#DC2626" },
                  ].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                      <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.count}</div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTab("review")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                  Review buildings <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── REVIEW TAB ── */}
        {tab === "review" && (
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 6 }}>Review your portfolio</h1>
                <p style={{ color: MUTED, fontSize: 14 }}>34 buildings imported · Review and complete missing data before going live</p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                <FileText size={14} /> Export report
              </button>
            </div>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Complete", count: complete, color: "#059669", bg: "rgba(16,185,129,0.08)" },
                { label: "Partial data", count: partial, color: "#B45309", bg: "rgba(232,168,56,0.08)" },
                { label: "Missing critical", count: missing, color: "#DC2626", bg: "rgba(239,68,68,0.06)" },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: s.color }}>{s.count}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* Table */}
            <div style={{ background: WHITE, borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: DEEP }}>
                    {["Building", "City", "Type", "Area", "Purchase", "Depreciation", "EPC", "Status", "Progress", ""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: mono, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buildings.map((b, i) => {
                    const st = statusStyle(b.status);
                    return (
                      <tr key={b.name} style={{ borderBottom: i < buildings.length - 1 ? `1px solid ${BORDER}` : "none", background: i % 2 === 0 ? WHITE : "#FAFBFA" }}>
                        <td style={{ padding: "14px 16px", fontFamily: serif, fontWeight: 600, fontSize: 13, color: DEEP }}>{b.name}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: MUTED }}>{b.city}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: MUTED }}>{b.type}</td>
                        <td style={{ padding: "14px 16px", fontFamily: mono, fontSize: 12, color: DEEP }}>{b.area}</td>
                        <td style={{ padding: "14px 16px", fontFamily: mono, fontSize: 12, color: DEEP }}>{b.purchase}</td>
                        <td style={{ padding: "14px 16px", fontFamily: mono, fontSize: 12, color: MUTED }}>{b.depreciation}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "3px 8px", background: b.epc === "A" ? "rgba(16,185,129,0.12)" : b.epc === "B" ? "rgba(59,130,246,0.1)" : b.epc === "C" ? "rgba(232,168,56,0.12)" : "rgba(239,68,68,0.1)", color: b.epc === "A" ? "#059669" : b.epc === "B" ? "#1D4ED8" : b.epc === "C" ? "#B45309" : "#DC2626", fontSize: 11, fontWeight: 700, borderRadius: 6, fontFamily: mono }}>{b.epc}</span>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ padding: "3px 10px", background: st.bg, color: st.color, fontSize: 11, fontWeight: 600, borderRadius: 20, fontFamily: mono, whiteSpace: "nowrap" }}>{st.label}</span>
                        </td>
                        <td style={{ padding: "14px 16px", minWidth: 100 }}>
                          <div style={{ height: 4, background: "rgba(0,33,23,0.08)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${b.progress}%`, background: progressColor(b.status), borderRadius: 2 }} />
                          </div>
                          <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, marginTop: 4 }}>{b.progress}%</div>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <button
                            onClick={() => { setSelectedBuilding(b.name); setTab("checklist"); }}
                            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: FOREST, background: "none", border: "none", cursor: "pointer", fontFamily: sans }}
                          >
                            Checklist <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 28 }}>
              <button onClick={() => navigate("/onboarding/staff")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Continue to staff upload <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── CHECKLIST TAB ── */}
        {tab === "checklist" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: DEEP, marginBottom: 4 }}>Data Checklist: {selectedBuilding}</h1>
                <p style={{ color: MUTED, fontSize: 14 }}>Track all required data categories for this building</p>
              </div>
              <select
                value={selectedBuilding}
                onChange={e => setSelectedBuilding(e.target.value)}
                style={{ padding: "10px 16px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, color: DEEP, background: WHITE, cursor: "pointer", fontFamily: sans }}
              >
                {buildings.map(b => <option key={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {checklistCategories.map(cat => {
                const doneCount = cat.items.filter(i => i.done).length;
                return (
                  <div key={cat.title} style={{ background: WHITE, borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", background: DEEP }}>
                      <span style={{ fontSize: 16 }}>{cat.icon}</span>
                      <span style={{ fontFamily: serif, fontWeight: 600, fontSize: 14, color: WHITE }}>{cat.title}</span>
                      <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{doneCount}/{cat.items.length} complete</span>
                    </div>
                    <div>
                      {cat.items.map((item, idx) => (
                        <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 24px", borderBottom: idx < cat.items.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                          <div style={{ marginTop: 2, flexShrink: 0 }}>
                            {item.done
                              ? <CheckCircle2 size={16} color={ACCENT} />
                              : <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid rgba(0,33,23,0.2)` }} />
                            }
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: DEEP, marginBottom: 2 }}>{item.label}</div>
                            <div style={{ fontSize: 12, color: MUTED }}>{item.value}</div>
                          </div>
                          <span style={{ padding: "3px 10px", background: item.done ? "rgba(16,185,129,0.1)" : "rgba(232,168,56,0.1)", color: item.done ? "#059669" : "#B45309", fontSize: 10, fontWeight: 600, borderRadius: 20, flexShrink: 0, fontFamily: mono }}>
                            {item.done ? "Complete" : "Add"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 28 }}>
              <button onClick={() => navigate("/onboarding/staff")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: DEEP, color: WHITE, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: sans }}>
                Continue to staff upload <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
