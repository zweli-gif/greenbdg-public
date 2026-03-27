/**
 * Portfolio Dashboard — Richard Patel, Portfolio Manager
 * Focus: Building performance vs SAPOA benchmarks, EPC compliance
 */
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Building2, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

const buildingPerformance = [
  { name: "Waterfall", energy: 128, water: 0.62, epc: "A", score: 88 },
  { name: "Sandton Hts", energy: 156, water: 0.84, epc: "B", score: 71 },
  { name: "Cape Green", energy: 112, water: 0.58, epc: "A+", score: 94 },
  { name: "Mombasa Hub", energy: 198, water: 1.12, epc: "C", score: 52 },
  { name: "Rosebank Sq", energy: 142, water: 0.71, epc: "B", score: 76 },
  { name: "Durban Port", energy: 174, water: 0.95, epc: "C", score: 61 },
];

const energyBenchmarkData = buildingPerformance.map((b) => ({
  name: b.name,
  actual: b.energy,
}));

const epcSummary = [
  { rating: "A+", count: 4, pct: 8 },
  { rating: "A", count: 13, pct: 27 },
  { rating: "B", count: 22, pct: 46 },
  { rating: "C", count: 6, pct: 13 },
  { rating: "D", count: 3, pct: 6 },
];

const epcColors: Record<string, string> = {
  "A+": "epc-a-plus", A: "epc-a", B: "epc-b", C: "epc-c", D: "epc-d",
};

export default function PortfolioDashboard() {
  return (
    <DashboardLayout role="Portfolio Manager" user="Richard Patel" initials="RP">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002117] mb-1" style={{fontFamily:"'Libre Baskerville',serif"}}>Good morning, Richard.</h2>
          <p className="text-[13px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Thursday, 27 March 2026 · Portfolio Manager · 48 buildings across 4 provinces</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 card-stagger">
          {[
            { label: "Portfolio Avg Energy", value: "142", sub: "kWh/m² · SAPOA: 160", icon: <TrendingDown size={16} className="text-[#2DAF85]" />, accent: "border-l-4 border-l-[#2DAF85]" },
            { label: "EPC Compliance", value: "73%", sub: "35 of 48 buildings", icon: <CheckCircle size={16} className="text-[#064E3B]" />, accent: "border-l-4 border-l-[#064E3B]" },
            { label: "Underperforming", value: "8", sub: "Buildings > SAPOA benchmark", icon: <AlertCircle size={16} className="text-[#DF795F]" />, accent: "border-l-4 border-l-[#DF795F]" },
            { label: "Total GLA", value: "892k", sub: "m² under management", icon: <Building2 size={16} className="text-[#E8A838]" />, accent: "border-l-4 border-l-[#E8A838]" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-lg p-5 shadow-sm ${s.accent}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.label}</span>
                {s.icon}
              </div>
              <div className="stat-numeral text-[#002117]">{s.value}</div>
              <div className="text-[11px] text-[#8BBFA0] mt-1" style={{fontFamily:"'Work Sans',sans-serif"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy intensity chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-[14px] font-semibold text-[#002117] mb-1" style={{fontFamily:"'Work Sans',sans-serif"}}>Energy Intensity vs SAPOA Benchmark</h3>
            <p className="text-[11px] text-[#8BBFA0] mb-5" style={{fontFamily:"'Work Sans',sans-serif"}}>kWh/m² · SAPOA Office Benchmark: 160 kWh/m²</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={energyBenchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F7F4" />
                <XAxis dataKey="name" tick={{fontSize: 10, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: "#8BBFA0", fontFamily: "Work Sans"}} axisLine={false} tickLine={false} domain={[0, 220]} />
                <Tooltip
                  contentStyle={{background: "#fff", border: "1px solid #E8F0EC", borderRadius: 6, fontSize: 11, fontFamily: "Work Sans"}}
                  formatter={(v: number) => [`${v} kWh/m²`]}
                />
                <ReferenceLine y={160} stroke="#DF795F" strokeDasharray="4 3" strokeWidth={1.5} label={{value: "SAPOA 160", position: "right", fontSize: 10, fill: "#DF795F", fontFamily: "Work Sans"}} />
                <Bar dataKey="actual" name="Energy Intensity" fill="#064E3B" radius={[3,3,0,0]}
                  label={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* EPC summary */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-[14px] font-semibold text-[#002117] mb-4" style={{fontFamily:"'Work Sans',sans-serif"}}>EPC Rating Distribution</h3>
            <div className="space-y-3">
              {epcSummary.map((e) => (
                <div key={e.rating} className="flex items-center gap-3">
                  <span className={`w-8 h-6 flex items-center justify-center rounded text-[10px] font-bold flex-shrink-0 ${epcColors[e.rating]}`}>{e.rating}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-[#F0F7F4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#064E3B] rounded-full" style={{width: `${e.pct}%`, opacity: e.rating === "A+" ? 1 : e.rating === "A" ? 0.85 : e.rating === "B" ? 0.65 : e.rating === "C" ? 0.45 : 0.3}} />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#002117] w-16 text-right" style={{fontFamily:"'Work Sans',sans-serif"}}>{e.count} bldgs</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E8F0EC]">
              <p className="text-[11px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>13 buildings require EPC renewal within 12 months</p>
            </div>
          </div>
        </div>

        {/* Building table */}
        <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8F0EC]">
            <h3 className="text-[14px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>Building Performance Table</h3>
            <span className="text-[11px] text-[#6BAF8A]" style={{fontFamily:"'Work Sans',sans-serif"}}>Showing 6 of 48</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]" style={{fontFamily:"'Work Sans',sans-serif"}}>
              <thead>
                <tr className="border-b border-[#E8F0EC]">
                  {["Building", "Energy (kWh/m²)", "Water (kL/m²)", "EPC", "Score"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-[#6BAF8A] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buildingPerformance.map((b) => (
                  <tr key={b.name} className="border-b border-[#F0F7F4] data-row cursor-pointer">
                    <td className="px-5 py-3.5 font-medium text-[#002117]">{b.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={b.energy > 160 ? "text-[#DF795F] font-semibold" : "text-[#064E3B] font-semibold"}>{b.energy}</span>
                      {b.energy > 160 && <span className="text-[10px] text-[#DF795F] ml-1">▲ above</span>}
                    </td>
                    <td className="px-5 py-3.5 text-[#5A8A6A]">{b.water}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${epcColors[b.epc]}`}>{b.epc}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#F0F7F4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#064E3B] rounded-full" style={{width: `${b.score}%`}} />
                        </div>
                        <span className="text-[#002117] font-medium">{b.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
