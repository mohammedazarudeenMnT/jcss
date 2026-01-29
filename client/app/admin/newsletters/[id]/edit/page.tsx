"use client";

import { useState, useEffect } from "react";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { useRouter } from "next/navigation";
import type { Newsletter } from "@/lib/types/newsletter";
import AdminFormHeader from "@/components/Admin/AdminFormHeader";

export default function EditNewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      loadNewsletter(p.id);
    });
  }, [params]);

  async function loadNewsletter(newsletterId: string) {
    try {
      const response = await fetch(`/api/newsletters/${newsletterId}`);
      if (response.ok) {
        const data = await response.json();
        setNewsletter(data);
      }
    } catch (error) {
      console.error("Failed to load newsletter:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    router.push("/admin/newsletters");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-slate-400">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Newsletter not found</p>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all"
          >
            Back to Newsletters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <AdminFormHeader
          title="Edit Newsletter"
          subtitle="Update your newsletter details below"
        />

        {/* Form Container */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
          <NewsletterForm newsletter={newsletter} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
