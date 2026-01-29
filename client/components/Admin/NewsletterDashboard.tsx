"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Newsletter } from "@/lib/types/newsletter";
import NewsletterList from "./NewsletterList";

export default function NewsletterDashboard() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewsletters();
  }, []);

  async function loadNewsletters() {
    try {
      setLoading(true);
      const response = await fetch("/api/newsletters");
      const data = await response.json();
      setNewsletters(data);
    } catch (error) {
      console.error("Failed to load newsletters:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this newsletter?")) return;

    try {
      await fetch(`/api/newsletters/${id}`, { method: "DELETE" });
      setNewsletters(newsletters.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete newsletter:", error);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Newsletter Editions</h2>
          <p className="text-slate-400 text-sm mt-1">
            {newsletters.length} newsletter{newsletters.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        <Link href="/admin/newsletters/new">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95">
            <Plus className="w-4 h-4" />
            Create Newsletter
          </button>
        </Link>
      </div>

      {/* Newsletters List */}
      <NewsletterList
        newsletters={newsletters}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
