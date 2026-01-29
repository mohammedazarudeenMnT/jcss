"use client";

import { useState } from "react";
import { Save, Bell, Moon, Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminHeader from "@/components/Admin/AdminHeader";

export default function SettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "JCSS",
    adminEmail: "admin@jcss.com",
    notificationsEnabled: true,
    darkMode: true,
  });

  const [saved, setSaved] = useState(false);

  async function handleSave() {
    try {
      console.log("Saving settings:", settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-200">
      <AdminHeader
        onMobileToggle={() => setIsMobileSidebarOpen(true)}
        title="System Settings"
      />
      <div className="flex-1 p-4 sm:p-8">
        <div className=" mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400">
              Manage your system configuration and preferences
            </p>
          </div>

          {/* General Settings Section */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              General Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Site Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg px-4 py-2.5 text-white text-sm transition-all outline-none"
                />
              </div>

              {/* Admin Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, adminEmail: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg px-4 py-2.5 text-white text-sm transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Preferences
            </h2>

            <div className="space-y-4">
              {/* Notifications Toggle */}
              <div
                className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer"
                onClick={() =>
                  setSettings({
                    ...settings,
                    notificationsEnabled: !settings.notificationsEnabled,
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <Bell
                    className={cn(
                      "w-5 h-5",
                      settings.notificationsEnabled
                        ? "text-orange-500"
                        : "text-slate-500",
                    )}
                  />
                  <div>
                    <p className="text-white font-medium text-sm">
                      Enable Notifications
                    </p>
                    <p className="text-xs text-slate-400">
                      Receive system and event alerts
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative",
                    settings.notificationsEnabled
                      ? "bg-orange-500"
                      : "bg-slate-700",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all",
                      settings.notificationsEnabled ? "right-0.5" : "left-0.5",
                    )}
                  />
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div
                className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700/50 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer"
                onClick={() =>
                  setSettings({ ...settings, darkMode: !settings.darkMode })
                }
              >
                <div className="flex items-center gap-3">
                  <Moon
                    className={cn(
                      "w-5 h-5",
                      settings.darkMode ? "text-orange-500" : "text-slate-500",
                    )}
                  />
                  <div>
                    <p className="text-white font-medium text-sm">Dark Mode</p>
                    <p className="text-xs text-slate-400">
                      Use dark theme in the interface
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative",
                    settings.darkMode ? "bg-orange-500" : "bg-slate-700",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all",
                      settings.darkMode ? "right-0.5" : "left-0.5",
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {saved && (
              <span className="text-green-500 text-sm font-medium">
                ✓ Settings saved successfully
              </span>
            )}
            {!saved && <div />}
            <button
              onClick={handleSave}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
