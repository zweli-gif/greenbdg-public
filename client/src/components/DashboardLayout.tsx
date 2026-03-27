/**
 * DashboardLayout — PLUSH design system
 * Deep forest green #002117 header, crisp white body, Libre Baskerville serif
 * Horizontal pill nav matching source HTML dashboards
 * RoleSwitcher floating bottom-right for demo navigation
 */
import { useLocation } from "wouter";
import RoleSwitcher from "./RoleSwitcher";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
  user: string;
  initials: string;
  accentColor?: string;
}

const navLinks = [
  { label: "CFO", path: "/dashboard/cfo" },
  { label: "Sustainability", path: "/dashboard/sustainability" },
  { label: "Portfolio", path: "/dashboard/portfolio" },
  { label: "Building", path: "/dashboard/building" },
  { label: "Facilities", path: "/dashboard/fm" },
  { label: "Tenant", path: "/dashboard/tenant" },
];

const DEEP = "#002117";
const ACCENT = "#10B981";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F8FAF9";
const serif = "'Libre Baskerville', Georgia, serif";
const sans = "'Work Sans', sans-serif";
const mono = "'DM Mono', monospace";

export default function DashboardLayout({ children, role, user, initials, accentColor = ACCENT }: DashboardLayoutProps) {
  const [location, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: OFF_WHITE, fontFamily: sans, color: DEEP }}>
      {/* ── HEADER ── */}
      <header style={{
        background: DEEP,
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, height: 64,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => navigate("/hub")}
        >
          <div style={{ width: 34, height: 34, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
              <rect x="2" y="7.5" width="3.5" height="11" fill="white" rx="0.4"/>
              <rect x="7" y="3" width="3.5" height="15.5" fill="white" rx="0.4"/>
              <rect x="12" y="5.5" width="3.5" height="13" fill="white" rx="0.4"/>
              <line x1="2" y1="3" x2="16" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 14, color: WHITE }}>GreenBDG Africa</span>
        </div>

        {/* Pill nav */}
        <nav style={{ display: "flex", gap: 4 }}>
          {navLinks.map(n => {
            const active = location === n.path;
            return (
              <button
                key={n.label}
                onClick={() => navigate(n.path)}
                style={{
                  padding: "7px 18px", borderRadius: 24, fontSize: 12, fontWeight: active ? 600 : 400,
                  cursor: "pointer", transition: "all 0.15s", border: "none", fontFamily: sans,
                  background: active ? ACCENT : "rgba(255,255,255,0.08)",
                  color: active ? DEEP : "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = WHITE; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}}
              >
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: serif, fontSize: 13, fontWeight: 600, color: WHITE }}>{user}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{role}</div>
          </div>
          <div style={{ width: 34, height: 34, background: accentColor, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: DEEP }}>{initials}</div>
        </div>
      </header>

      {/* Page content */}
      <main>
        {children}
      </main>

      <RoleSwitcher currentPath={location} />
    </div>
  );
}
