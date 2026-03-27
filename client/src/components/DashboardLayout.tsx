/**
 * DashboardLayout — Operational Design System
 * Source: cfo-dashboard.html, sustainability-dashboard.html etc.
 * - White sticky header with logo + pill nav + user avatar
 * - Sage light background (#E8EDE4)
 * - No sidebar — horizontal nav matching the source HTML
 * - RoleSwitcher floating bottom-right for demo navigation
 */
import { useLocation } from "wouter";
import RoleSwitcher from "./RoleSwitcher";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;        // "CFO" | "Sustainability" | "Portfolio" | "FM" | "Building" | "Tenant"
  user: string;        // Full name
  initials: string;    // 2-letter initials
}

const navLinks = [
  { label: "CFO", path: "/dashboard/cfo" },
  { label: "Sustainability", path: "/dashboard/sustainability" },
  { label: "Portfolio", path: "/dashboard/portfolio" },
  { label: "Building", path: "/dashboard/building" },
  { label: "Facilities", path: "/dashboard/fm" },
  { label: "Tenant", path: "/dashboard/tenant" },
];

const C = {
  sageBg: "#E8EDE4",
  white: "#FFFFFF",
  green: "#5A9A6E",
  text: "#2D3A2D",
  textSec: "#5A6B5A",
  border: "#D8E0D5",
};

export default function DashboardLayout({ children, role, user, initials }: DashboardLayoutProps) {
  const [location, navigate] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: C.sageBg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      {/* Header */}
      <header style={{ background: C.white, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 100, height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit", cursor: "pointer" }} onClick={() => navigate("/hub")}>
          <div style={{ width: 42, height: 42, background: C.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 700 }}>G</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>GreenBDG</div>
            <div style={{ fontSize: 11, color: C.textSec, letterSpacing: "0.15em", textTransform: "uppercase" }}>Africa</div>
          </div>
        </div>

        {/* Pill nav */}
        <nav style={{ display: "flex", gap: 6 }}>
          {navLinks.map(n => {
            const active = location === n.path;
            return (
              <button
                key={n.label}
                onClick={() => navigate(n.path)}
                style={{
                  padding: "8px 20px", borderRadius: 24, fontSize: 13, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.15s ease", border: "none",
                  background: active ? C.green : "transparent",
                  color: active ? "#fff" : C.textSec,
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.sageBg; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* User avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user}</div>
            <div style={{ fontSize: 11, color: C.textSec }}>{role}</div>
          </div>
          <div style={{ width: 38, height: 38, background: "#D4E0D1", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>{initials}</div>
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
