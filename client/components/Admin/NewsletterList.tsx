import {
  Edit2,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Globe,
  Box,
} from "lucide-react";
import Link from "next/link";
import type { Newsletter } from "@/lib/types/newsletter";
import { cn } from "@/lib/utils";

interface NewsletterListProps {
  newsletters: Newsletter[];
  loading: boolean;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string, currentStatus: string) => void;
}

export default function NewsletterList({
  newsletters,
  loading,
  onDelete,
  onStatusToggle,
}: NewsletterListProps) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16 space-y-4">
        <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading newsletters...</p>
      </div>
    );
  }

  if (newsletters.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-800/20 border border-slate-700/30 rounded-2xl">
        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-white font-bold mb-1">No content here yet</p>
        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
          Start building your next edition
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {newsletters.map((newsletter) => {
        const id = newsletter._id || newsletter.id;
        return (
          <div
            key={id}
            className="group bg-slate-900/40 border border-slate-800 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white truncate tracking-tight group-hover:text-orange-500 transition-colors">
                    {newsletter.title}
                  </h3>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      newsletter.status === "published"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-slate-700/50 text-slate-400 border border-slate-700",
                    )}
                  >
                    {newsletter.status}
                  </span>
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
                  {newsletter.description.replace(/<[^>]*>/g, "")}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {newsletter.month} {newsletter.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-md">
                    <Box className="w-3.5 h-3.5" />
                    <span>{newsletter.sections.length} Sections</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <button
                  onClick={() => onStatusToggle(id, newsletter.status)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all",
                    newsletter.status === "published"
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      : "bg-green-600/10 text-green-500 hover:bg-green-600/20 border border-green-600/20",
                  )}
                  title={
                    newsletter.status === "published"
                      ? "Set to Draft"
                      : "Publish Now"
                  }
                >
                  <Globe className="w-3.5 h-3.5" />
                  {newsletter.status === "published" ? "Unpublish" : "Publish"}
                </button>

                <div className="h-8 w-px bg-slate-800 mx-1 hidden md:block" />

                <div className="flex items-center gap-2">
                  {newsletter.status === "published" && (
                    <Link
                      href={`/newsletters/${newsletter.slug}`}
                      target="_blank"
                    >
                      <button
                        className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                        title="View Public Page"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                    </Link>
                  )}
                  <Link href={`/admin/newsletters/${id}/edit`}>
                    <button
                      className="p-2.5 text-slate-400 hover:text-orange-500 bg-slate-800 hover:bg-orange-500/10 rounded-xl transition-all"
                      title="Edit Content"
                    >
                      <Edit2 className="w-4.5 h-4.5" />
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 bg-slate-800 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Delete Edition"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
