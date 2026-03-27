/**
 * RoleSwitcher — Prototype navigation helper
 * Allows demo users to jump between any dashboard role
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronDown, X } from "lucide-react";

const roles = [
  { initials: "AD", name: "Amahle Dube", role: "CFO", path: "/dashboard/cfo", color: "bg-[#E8A838]" },
  { initials: "NK", name: "Nomsa Khumalo", role: "Sustainability Mgr", path: "/dashboard/sustainability", color: "bg-[#2DAF85]" },
  { initials: "RP", name: "Richard Patel", role: "Portfolio Mgr", path: "/dashboard/portfolio", color: "bg-[#0A6B4F]" },
  { initials: "ND", name: "Nkosi Dlamini", role: "Building Mgr", path: "/dashboard/building", color: "bg-[#064E3B]" },
  { initials: "SM", name: "Sipho Mthembu", role: "FM", path: "/dashboard/fm", color: "bg-[#1A8C6A]" },
  { initials: "AC", name: "African Corp", role: "Tenant", path: "/dashboard/tenant", color: "bg-[#2DAF85]" },
];

interface RoleSwitcherProps {
  currentPath: string;
}

export default function RoleSwitcher({ currentPath }: RoleSwitcherProps) {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-2 bg-white border border-[#E8F0EC] rounded-xl shadow-xl overflow-hidden w-64">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8F0EC]">
            <span className="text-[11px] font-semibold text-[#6BAF8A] uppercase tracking-wider" style={{fontFamily:"'Work Sans',sans-serif"}}>Switch Role</span>
            <button onClick={() => setOpen(false)} className="text-[#8BBFA0] hover:text-[#002117]"><X size={14} /></button>
          </div>
          <div className="py-1">
            {roles.map((r) => (
              <button
                key={r.path}
                onClick={() => { navigate(r.path); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F7F4] transition-colors ${currentPath === r.path ? "bg-[#F0F7F4]" : ""}`}
              >
                <div className={`w-7 h-7 rounded-full ${r.color} flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0`}>
                  {r.initials}
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-medium text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.name}</div>
                  <div className="text-[10px] text-[#8BBFA0]" style={{fontFamily:"'Work Sans',sans-serif"}}>{r.role}</div>
                </div>
                {currentPath === r.path && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2DAF85]" />}
              </button>
            ))}
          </div>
          <div className="border-t border-[#E8F0EC] px-4 py-2.5">
            <button
              onClick={() => { navigate("/hub"); setOpen(false); }}
              className="text-[11px] text-[#6BAF8A] hover:text-[#064E3B] transition-colors"
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              ← Back to Home Hub
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#002117] text-white rounded-full shadow-lg hover:bg-[#003527] transition-colors"
        style={{fontFamily:"'Work Sans',sans-serif"}}
      >
        <div className="w-5 h-5 rounded-full bg-[#2DAF85] flex items-center justify-center text-[9px] font-bold">▶</div>
        <span className="text-[12px] font-semibold">Switch Role</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
