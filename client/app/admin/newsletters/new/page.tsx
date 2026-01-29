"use client";

import AdminFormHeader from "@/components/Admin/AdminFormHeader";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { useRouter } from "next/navigation";

export default function NewNewsletterPage() {
  const router = useRouter();

  function handleClose() {
    router.push("/admin/newsletters");
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto">
        {/* Header */}
        <AdminFormHeader
          title="Create Newsletter"
          subtitle="Create a new newsletter edition"
        />

        {/* Form Container */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
          <NewsletterForm newsletter={null} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
