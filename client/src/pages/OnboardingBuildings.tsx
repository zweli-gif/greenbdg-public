/**
 * Building Bulk Upload — Botanical design system
 * 3 tabs: Upload CSV → Review & Edit → Data Checklist
 * 12 buildings: 4 complete, 5 partial, 3 missing critical
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, ChevronRight, Download, Plus, FileText } from "lucide-react";

type Tab = "upload" | "review" | "checklist";

const buildings = [
  { name: "Sandton Towers", city: "Johannesburg", type: "Office", area: "45,000 m²", purchase: "R 485M", depreciation: "R 9.7M/yr", epc: "A", status: "complete", progress: 85 },
  { name: "Waterfront Plaza", city: "Cape Town", type: "Office", area: "32,000 m²", purchase: "R 320M", depreciation: "R 6.4M/yr", epc: "B", status: "partial", progress: 65 },
  { name: "Midrand Industrial Park", city: "Midrand", type: "Industrial", area: "78,000 m²", purchase: "R 180M", depreciation: "R 3.6M/yr", epc: "C", status: "partial", progress: 55 },
  { name: "Umhlanga Business Centre", city: "Durban", type: "Office", area: "28,500 m²", purchase: "R 245M", depreciation: "R 4.9M/yr", epc: "B", status: "complete", progress: 90 },
  { name: "Menlyn Corporate Park", city: "Pretoria", type: "Office", area: "52,000 m²", purchase: "R 380M", depreciation: "R 7.6M/yr", epc: "D", status: "missing", progress: 30 },
  { name: "Rosebank Junction", city: "Johannesburg", type: "Mixed Use", area: "38,000 m²", purchase: "R 420M", depreciation: "R 8.4M/yr", epc: "B", status: "partial", progress: 70 },
  { name: "Century City Square", city: "Cape Town", type: "Office", area: "41,000 m²", purchase: "R 355M", depreciation: "R 7.1M/yr", epc: "A", status: "complete", progress: 95 },
  { name: "Rivonia Road Offices", city: "Johannesburg", type: "Office", area: "22,000 m²", purchase: "R 195M", depreciation: "R 3.9M/yr", epc: "C", status: "partial", progress: 50 },
  { name: "Gateway Retail Park", city: "Durban", type: "Retail", area: "95,000 m²", purchase: "R 680M", depreciation: "R 13.6M/yr", epc: "B", status: "missing", progress: 25 },
  { name: "Pretoria CBD Tower", city: "Pretoria", type: "Office", area: "18,500 m²", purchase: "R 165M", depreciation: "R 3.3M/yr", epc: "E", status: "missing", progress: 15 },
  { name: "Claremont Business Park", city: "Cape Town", type: "Office", area: "26,000 m²", purchase: "R 280M", depreciation: "R 5.6M/yr", epc: "B", status: "complete", progress: 88 },
  { name: "Greenside Commercial", city: "Johannesburg", type: "Mixed Use", area: "15,000 m²", purchase: "R 125M", depreciation: "R 2.5M/yr", epc: "C", status: "partial", progress: 60 },
];

const checklistCategories = [
  { icon: "🏢", title: "Building Identity & Specifications", items: [
    { label: "Building Name & Full Address", done: true, value: "Sandton Towers, 158 West Street, Sandton, JHB, 2196" },
    { label: "GPS Coordinates", done: true, value: "-26.1076° S, 28.0567° E" },
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
  const [tab, setTab] = useState<Tab>("upload");
  const [uploaded, setUploaded] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("Sandton Towers");

  const complete = buildings.filter(b => b.status === "complete").length;
  const partial = buildings.filter(b => b.status === "partial").length;
  const missing = buildings.filter(b => b.status === "missing").length;

  const statusStyle = (s: string) => s === "complete"
    ? { bg: "#E8F5E9", color: "#2E7D32", label: "Complete" }
    : s === "partial"
    ? { bg: "#FFF8E1", color: "#F57F17", label: "Partial data" }
    : { bg: "#FFEBEE", color: "#C62828", label: "Missing critical" };

  const progressColor = (s: string) => s === "complete" ? "#52796F" : s === "partial" ? "#E8A838" : "#E07A5F";

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAF7", fontFamily: "'DM Sans', sans-serif", color: "#354F52" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid rgba(132,169,140,0.15)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/onboarding/checklist")} style={{ display: "flex", alignItems: "center", gap: 6, color: "#52796F", background: "none", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            <ArrowLeft size={14} /> Setup checklist
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(132,169,140,0.2)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#52796F", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14 }}>GreenBDG Africa</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: "rgba(132,169,140,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#52796F" }}>SD</div>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Songo Didiza</span>
        </div>
      </header>

      {/* Tab nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(132,169,140,0.15)", padding: "0 32px" }}>
        <div style={{ display: "flex", maxWidth: 900, margin: "0 auto" }}>
          {([
            { id: "upload" as Tab, label: "📤  Upload CSV" },
            { id: "review" as Tab, label: "✏️  Review & Edit", count: 12 },
            { id: "checklist" as Tab, label: "📋  Data Checklist" },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "14px 20px", fontSize: 13, fontWeight: 500,
                color: tab === t.id ? "#354F52" : "#84A98C",
                background: "none", borderBottom: tab === t.id ? "2px solid #52796F" : "2px solid transparent",
                cursor: "pointer", transition: "color 0.2s",
              }}
            >
              {t.label}
              {t.count && <span style={{ padding: "1px 6px", background: "rgba(82,121,111,0.1)", color: "#52796F", fontSize: 10, fontWeight: 700, borderRadius: 20 }}>{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* ── UPLOAD TAB ── */}
        {tab === "upload" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: "#354F52", marginBottom: 8 }}>Upload building portfolio</h1>
            <p style={{ color: "#7A9A82", fontSize: 14, marginBottom: 28 }}>Import your building list via CSV. The platform validates each record and flags missing information.</p>

            {!uploaded ? (
              <div>
                <div
                  onClick={() => setUploaded(true)}
                  style={{ border: "2px dashed rgba(132,169,140,0.4)", borderRadius: 20, padding: "56px 32px", textAlign: "center", cursor: "pointer", marginBottom: 20, transition: "all 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#52796F")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(132,169,140,0.4)")}
                >
                  <div style={{ width: 56, height: 56, background: "rgba(82,121,111,0.1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Upload size={24} color="#52796F" />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Drop your spreadsheet here or click to browse</div>
                  <div style={{ color: "#84A98C", fontSize: 13 }}>Supports .csv, .xlsx, .xls (max 10MB)</div>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(132,169,140,0.15)", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <FileText size={18} color="#52796F" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>GreenBDG_Building_Template.csv</div>
                      <div style={{ color: "#84A98C", fontSize: 12 }}>Required: Building Name, Address, City, Type, Total Area (m²)</div>
                    </div>
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", border: "1px solid rgba(132,169,140,0.3)", borderRadius: 10, color: "#52796F", fontSize: 12, fontWeight: 500, background: "none", cursor: "pointer" }}>
                    <Download size={13} /> Download template
                  </button>
                </div>
                <button onClick={() => setUploaded(true)} style={{ padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Simulate upload (12 buildings)
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(132,169,140,0.15)", padding: 24, marginBottom: 20, borderLeft: "4px solid #52796F" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <CheckCircle2 size={18} color="#52796F" />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>growthpoint_buildings.csv uploaded successfully</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {[
                      { val: complete, label: "Ready", bg: "#E8F5E9", color: "#2E7D32" },
                      { val: partial, label: "Partial data", bg: "#FFF8E1", color: "#F57F17" },
                      { val: missing, label: "Missing critical", bg: "#FFEBEE", color: "#C62828" },
                    ].map(s => (
                      <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginTop: 4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setTab("review")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Review buildings <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── REVIEW TAB ── */}
        {tab === "review" && (
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: "#354F52", marginBottom: 4 }}>Review & edit buildings</h1>
                <p style={{ color: "#84A98C", fontSize: 13 }}>12 buildings · R 4.2B total portfolio value</p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "#52796F", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Plus size={14} /> Add building
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total buildings", value: "12", sub: "Across 4 cities", color: "#354F52" },
                { label: "Complete data", value: `${complete}`, sub: "Ready for go-live", color: "#2E7D32" },
                { label: "Partial data", value: `${partial}`, sub: "Need more info", color: "#F57F17" },
                { label: "Missing critical", value: `${missing}`, sub: "Cannot proceed", color: "#C62828" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#354F52", marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#84A98C" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(132,169,140,0.15)" }}>
                    {["Building", "Financials", "EPC", "Status", "Progress", ""].map(h => (
                      <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buildings.map(b => {
                    const st = statusStyle(b.status);
                    return (
                      <tr key={b.name} style={{ borderBottom: "1px solid rgba(132,169,140,0.08)" }}>
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "#84A98C" }}>{b.city} · {b.type} · {b.area}</div>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ fontSize: 12, fontWeight: 500 }}>{b.purchase}</div>
                          <div style={{ fontSize: 11, color: "#84A98C" }}>{b.depreciation}</div>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{ padding: "2px 8px", background: b.epc === "A" ? "#E8F5E9" : b.epc === "B" ? "#E3F2FD" : b.epc === "C" ? "#FFF8E1" : "#FFEBEE", color: b.epc === "A" ? "#2E7D32" : b.epc === "B" ? "#1565C0" : b.epc === "C" ? "#F57F17" : "#C62828", fontSize: 11, fontWeight: 700, borderRadius: 6 }}>{b.epc}</span>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{ padding: "3px 10px", background: st.bg, color: st.color, fontSize: 11, fontWeight: 600, borderRadius: 20 }}>{st.label}</span>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 6, background: "#E8EDE4", borderRadius: 3, overflow: "hidden", minWidth: 60 }}>
                              <div style={{ height: "100%", width: `${b.progress}%`, background: progressColor(b.status), borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 11, color: "#84A98C", fontWeight: 500 }}>{b.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <button
                            onClick={() => { setSelectedBuilding(b.name); setTab("checklist"); }}
                            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: "#52796F", background: "none", border: "none", cursor: "pointer" }}
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

            <div style={{ marginTop: 24 }}>
              <button onClick={() => navigate("/onboarding/staff")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Continue to staff upload <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── CHECKLIST TAB ── */}
        {tab === "checklist" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: "#354F52", marginBottom: 4 }}>Data Checklist: {selectedBuilding}</h1>
                <p style={{ color: "#84A98C", fontSize: 13 }}>Track all required data categories for this building</p>
              </div>
              <select
                value={selectedBuilding}
                onChange={e => setSelectedBuilding(e.target.value)}
                style={{ padding: "8px 14px", border: "1.5px solid rgba(132,169,140,0.3)", borderRadius: 10, fontSize: 13, color: "#354F52", background: "#F7FAF7", cursor: "pointer" }}
              >
                {buildings.map(b => <option key={b.name}>{b.name}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {checklistCategories.map(cat => {
                const doneCount = cat.items.filter(i => i.done).length;
                return (
                  <div key={cat.title} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", background: "#F7FAF7", borderBottom: "1px solid rgba(132,169,140,0.1)" }}>
                      <span style={{ fontSize: 18 }}>{cat.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{cat.title}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#84A98C" }}>{doneCount}/{cat.items.length} complete</span>
                    </div>
                    <div>
                      {cat.items.map(item => (
                        <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 24px", borderBottom: "1px solid rgba(132,169,140,0.08)" }}>
                          <div style={{ marginTop: 2, flexShrink: 0 }}>
                            {item.done
                              ? <CheckCircle2 size={16} color="#52796F" />
                              : <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(132,169,140,0.4)" }} />
                            }
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                            <div style={{ fontSize: 12, color: "#84A98C" }}>{item.value}</div>
                          </div>
                          <span style={{ padding: "2px 8px", background: item.done ? "#E8F5E9" : "#FFF8E1", color: item.done ? "#2E7D32" : "#F57F17", fontSize: 10, fontWeight: 600, borderRadius: 20, flexShrink: 0 }}>
                            {item.done ? "Complete" : "Add"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 24 }}>
              <button onClick={() => navigate("/onboarding/staff")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "#52796F", color: "#fff", border: "none", borderRadius: 22, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Continue to staff upload <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
