import React, { useState, useEffect } from "react";
import { Trash2, Plus, Globe, Save, X } from "lucide-react";
import { toast } from "sonner";
import type { Newsletter, NewsletterSection } from "@/lib/types/newsletter";
import { createNewsletter, updateNewsletter } from "@/lib/api/newsletter";
import LexicalEditor from "./lexical/LexicalEditor";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  newsletter?: Newsletter | null;
  onClose: () => void;
}

// Internal type for form state, using tempId for React keys
interface FormSection extends NewsletterSection {
  tempId: string;
}

export default function NewsletterForm({
  newsletter,
  onClose,
}: NewsletterFormProps) {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<FormSection[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsletter) {
      setTitle(newsletter.title);
      setMonth(newsletter.month);
      setYear(newsletter.year);
      setDescription(newsletter.description);
      // Map existing sections to include tempId (using _id or generating one if missing)
      setSections(
        newsletter.sections.map((s) => ({
          ...s,
          tempId: s._id || `temp-${Date.now()}-${Math.random()}`,
        })),
      );
      setStatus(newsletter.status);
    } else {
      setSections([
        {
          _id: undefined,
          tempId: `sec-${Date.now()}`,
          title: "",
          content: "",
        },
      ]);
    }
  }, [newsletter]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare sections for API: remove tempId, ensures _id is undefined for new sections
      const apiSections = sections.map(({ tempId, ...rest }) => {
        // If _id is a temp string (starts with sec- or temp-), remove it
        if (
          rest._id &&
          (rest._id.startsWith("sec-") || rest._id.startsWith("temp-"))
        ) {
          return { ...rest, _id: undefined };
        }
        return rest;
      });

      const data = {
        title,
        month,
        year,
        description,
        sections: apiSections,
        status,
      };

      if (newsletter) {
        const id = newsletter._id || newsletter.id;
        await updateNewsletter(id, data);
        toast.success("Newsletter updated successfully");
      } else {
        await createNewsletter(data);
        toast.success("Newsletter created successfully");
      }
      onClose();
    } catch (error) {
      console.error("Failed to save newsletter:", error);
      toast.error("Failed to save newsletter. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function addSection() {
    setSections([
      ...sections,
      {
        _id: undefined,
        tempId: `sec-${Date.now()}`,
        title: "",
        content: "",
      },
    ]);
  }

  function removeSection(tempId: string) {
    if (sections.length <= 1) return;
    setSections(sections.filter((s) => s.tempId !== tempId));
  }

  function updateSection(tempId: string, field: string, value: string) {
    setSections(
      sections.map((s) => (s.tempId === tempId ? { ...s, [field]: value } : s)),
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">
              Newsletter Master Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-5 py-3 text-white text-base transition-all outline-none font-medium"
              placeholder="e.g., Strategic Insights - Q4 2025"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">
                Publication Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-white text-base transition-all outline-none appearance-none cursor-pointer font-medium"
                required
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">
                Edition Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-900 border-2 border-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-5 py-3 text-white text-base transition-all outline-none font-medium"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">
            Executive Summary / Description
          </label>
          <div className="border-2 border-slate-800 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 rounded-xl overflow-hidden transition-all bg-slate-900">
            <LexicalEditor
              value={description}
              onChange={(value: string) => setDescription(value)}
              placeholder="Provide a high-level overview of this edition..."
              minHeight="120px"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Content Modules
            </h3>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">
              Build your newsletter with rich content sections
            </p>
          </div>
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 border border-slate-700"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.tempId}
              className="bg-slate-900/30 border-2 border-slate-800/50 rounded-2xl overflow-hidden group/sec"
            >
              <div className="flex items-center gap-4 p-4 bg-slate-900/80 border-b-2 border-slate-800/50">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-xs font-black text-orange-500 border border-orange-500/20">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.tempId, "title", e.target.value)
                  }
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 text-base font-bold tracking-tight"
                  placeholder="Module Heading"
                  required
                />
                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(section.tempId)}
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover/sec:opacity-100"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>

              <div className="p-4">
                <div className="border-2 border-slate-800 rounded-xl overflow-hidden focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all bg-slate-900">
                  <LexicalEditor
                    value={section.content}
                    onChange={(value: string) =>
                      updateSection(section.tempId, "content", value)
                    }
                    placeholder="Compose module content here..."
                    minHeight="250px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t-2 border-slate-800">
        <div className="flex items-center gap-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Publication Status
          </label>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                status === "draft"
                  ? "bg-slate-800 text-white"
                  : "text-slate-500 hover:text-slate-300",
              )}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2",
                status === "published"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-slate-500 hover:text-slate-300",
              )}
            >
              <Globe className="w-3 h-3" />
              Published
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-black uppercase tracking-widest transition-all"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none px-12 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-orange-500/10"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                {newsletter ? "Save Changes" : "Commit Edition"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
