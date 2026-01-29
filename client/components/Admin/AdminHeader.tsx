"use client";

import { Menu, Search, Bell, User } from "lucide-react";

interface AdminHeaderProps {
  onMobileToggle: () => void;
  title?: string;
  show?: boolean;
  searchEnabled?: boolean;
}

export default function AdminHeader({
  onMobileToggle,
  title = "Dashboard",
  show = true,
  searchEnabled = false,
}: AdminHeaderProps) {
  if (!show) return null;
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl font-bold text-white tracking-tight hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Desktop only */}
        {searchEnabled && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 focus-within:border-orange-500/50 transition-all w-64">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
            />
          </div>
        )}

        {/* User Profile */}
        <button className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white mr-1 hidden sm:block">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
