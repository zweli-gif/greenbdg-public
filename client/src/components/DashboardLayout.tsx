/**
 * DashboardLayout — GreenBDG Africa
 * Crisp Plush Design System:
 * - Fixed left sidebar: deep forest green (#002117) with white text
 * - Main content: crisp white canvas
 * - 1px green border separating sidebar from content
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Bell, ChevronDown, LogOut, Menu, X } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";

interface NavItem {
  label: string;
  icon: string;
  path?: string;
  active?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userInitials: string;
  userRole: string;
  navItems: NavItem[];
  activeNav: string;
  onNavChange: (label: string) => void;
  notificationCount?: number;
}

const roleColors: Record<string, string> = {
  "FM": "bg-[#2DAF85]",
  "CFO": "bg-[#E8A838]",
  "Sustainability": "bg-[#1A8C6A]",
  "Portfolio": "bg-[#0A6B4F]",
  "Building": "bg-[#064E3B]",
  "Tenant": "bg-[#2DAF85]",
};

export default function DashboardLayout({
  children,
  userName,
  userInitials,
  userRole,
  navItems,
  activeNav,
  onNavChange,
  notificationCount = 0,
}: DashboardLayoutProps) {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleKey = userRole.split(" ")[0];
  const avatarColor = roleColors[roleKey] || "bg-[#064E3B]";

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9F8]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-60 flex flex-col
          bg-[#002117] text-white
          border-r border-[#1A3D2E]
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1A3D2E]">
          <div className="w-7 h-7 rounded bg-[#2DAF85] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="white" opacity="0.9"/>
              <path d="M12 2v20M4 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-wide text-white" style={{fontFamily:"'Work Sans',sans-serif"}}>GreenBDG</div>
            <div className="text-[10px] text-[#6BAF8A] tracking-widest uppercase">Africa</div>
          </div>
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* User profile */}
        <div className="px-4 py-4 border-b border-[#1A3D2E]">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
              {userInitials}
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-white truncate" style={{fontFamily:"'Work Sans',sans-serif"}}>{userName}</div>
              <div className="text-[10px] text-[#6BAF8A] truncate">{userRole}</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavChange(item.label)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-sm mb-0.5
                text-[12px] font-medium transition-all duration-150
                ${activeNav === item.label
                  ? "bg-[#003527] text-white border-l-2 border-[#2DAF85]"
                  : "text-[#8BBFA0] hover:bg-[#003527] hover:text-white"
                }
              `}
              style={{fontFamily:"'Work Sans',sans-serif"}}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-2 py-3 border-t border-[#1A3D2E]">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[12px] text-[#8BBFA0] hover:bg-[#003527] hover:text-white transition-all duration-150"
            style={{fontFamily:"'Work Sans',sans-serif"}}
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-[#E8F0EC] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-[#003527] hover:text-[#064E3B]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-[13px] font-semibold text-[#002117]" style={{fontFamily:"'Work Sans',sans-serif"}}>
                {activeNav}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-[#F0F7F4] transition-colors">
              <Bell size={16} className="text-[#003527]" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#DF795F] rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
                  {notificationCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-white text-[10px] font-semibold`}>
                {userInitials}
              </div>
              <ChevronDown size={12} className="text-[#6BAF8A]" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
      <RoleSwitcher currentPath={typeof window !== 'undefined' ? window.location.pathname : ''} />
    </div>
  );
}
