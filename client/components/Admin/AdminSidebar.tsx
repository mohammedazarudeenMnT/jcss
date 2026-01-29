"use client";

import {
  FileText,
  Settings,
  BarChart3,
  Home,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function AdminSidebar({
  isOpen,
  onToggle,
  isMobileOpen,
  onMobileToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Newsletters", href: "/admin/newsletters", icon: FileText },

    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 flex flex-col",
          isOpen ? "w-64" : "w-20",
          // Mobile state
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Branding/Header */}
        <div className="flex items-center justify-between h-32 px-4 border-b border-slate-800 shrink-0 transition-all duration-300">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              isOpen ? "w-full" : "lg:justify-center lg:w-full lg:px-0",
            )}
          >
            <div
              className={cn(
                "relative transition-all duration-300",
                isOpen ? "w-40 h-24" : "w-16 h-16",
              )}
            >
              <Image
                src="/svg/logo.svg"
                alt="JCSS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Collapse Trigger (Desktop) */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* Close Trigger (Mobile) */}
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent",
                )}
                onClick={() => {
                  if (isMobileOpen) onMobileToggle();
                }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-orange-500",
                  )}
                />
                {(isOpen || isMobileOpen) && (
                  <span className="text-sm font-semibold tracking-wide">
                    {item.label}
                  </span>
                )}

                {/* Desktop Tooltip when collapsed */}
                {!isOpen && !isMobileOpen && (
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-slate-700 shadow-xl z-60">
                    {item.label}
                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700" />
                  </div>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer/Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group",
              !isOpen && !isMobileOpen && "justify-center px-0",
            )}
            title="Log out"
          >
            <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" />
            {(isOpen || isMobileOpen) && (
              <span className="text-sm font-semibold">Log Out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
