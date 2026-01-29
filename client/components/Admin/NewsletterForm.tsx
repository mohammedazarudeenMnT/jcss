"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, X } from "lucide-react";
import type { Newsletter, NewsletterSection } from "@/lib/types/newsletter";
import LexicalEditor from "./lexical/LexicalEditor";

interface NewsletterFormProps {
  newsletter?: Newsletter | null;
  onClose: () => void;
}

export default function NewsletterForm({
  newsletter,
  onClose,
}: NewsletterFormProps) {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<NewsletterSection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsletter) {
      setTitle(newsletter.title);
      setMonth(newsletter.month);
      setYear(newsletter.year);
      setDescription(newsletter.description);
      setSections(newsletter.sections);
    } else {
      setSections([{ id: `sec-${Date.now()}`, title: "", content: "" }]);
    }
  }, [newsletter]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        title,
        month,
        year,
        description,
        sections,
      };

      const response = await fetch(
        newsletter ? `/api/newsletters/${newsletter.id}` : "/api/newsletters",
        {
          method: newsletter ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to save newsletter");
      }
    } catch (error) {
      console.error("Failed to save newsletter:", error);
    } finally {
      setLoading(false);
    }
  }

  function addSection() {
    setSections([
      ...sections,
      { id: `sec-${Date.now()}`, title: "", content: "" },
    ]);
  }

  function removeSection(id: string) {
    setSections(sections.filter((s) => s.id !== id));
  }

  function updateSection(id: string, field: string, value: string) {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-slate-300 block mb-2">
              Newsletter Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg px-4 py-2.5 text-white text-sm transition-all outline-none"
              placeholder="e.g., December 2025 Edition"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg px-4 py-2.5 text-white text-sm transition-all outline-none appearance-none cursor-pointer"
                required
              >
                <option value="">Select</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg px-4 py-2.5 text-white text-sm transition-all outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300 block mb-2">
            Description
          </label>
          <div className="border border-slate-700 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/50 rounded-lg overflow-hidden transition-all">
            <LexicalEditor
              value={description}
              onChange={(value: string) => setDescription(value)}
              placeholder="Brief overview of this edition..."
              minHeight="100px"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Content Sections</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Organize your content into sections
            </p>
          </div>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="border border-slate-700/50 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 bg-slate-900/30 border-b border-slate-700/50">
                <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-400">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, "title", e.target.value)
                  }
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-sm font-medium"
                  placeholder="Section title"
                  required
                />
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="p-4">
                <div className="border border-slate-700 rounded-lg overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/50 transition-all">
                  <LexicalEditor
                    value={section.content}
                    onChange={(value: string) =>
                      updateSection(section.id, "content", value)
                    }
                    placeholder="Write your section content..."
                    minHeight="200px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? "Saving..." : newsletter ? "Update" : "Create Newsletter"}
        </button>
      </div>
    </form>
  );
}
