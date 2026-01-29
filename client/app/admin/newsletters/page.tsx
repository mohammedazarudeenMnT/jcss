"use client";

import { useState } from "react";
import NewsletterDashboard from "@/components/Admin/NewsletterDashboard";
import AdminHeader from "@/components/Admin/AdminHeader";

export default function NewslettersPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader
        onMobileToggle={() => setIsMobileSidebarOpen(true)}
        title="Newsletters Management"
        searchEnabled={true}
      />
      <NewsletterDashboard />
    </div>
  );
}
