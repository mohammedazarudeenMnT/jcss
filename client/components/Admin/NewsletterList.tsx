import { Edit2, Trash2, Eye, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import type { Newsletter } from "@/lib/types/newsletter";
import { cn } from "@/lib/utils";

interface NewsletterListProps {
  newsletters: Newsletter[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function NewsletterList({
  newsletters,
  loading,
  onDelete,
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
      <div className="p-12 text-center bg-slate-800/30 border border-slate-700/50 rounded-lg">
        <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-white font-semibold mb-2">No newsletters yet</p>
        <p className="text-slate-400 text-sm">
          Create your first newsletter edition to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {newsletters.map((newsletter) => (
        <div
          key={newsletter.id}
          className="bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/70 rounded-lg p-5 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-white truncate">
                  {newsletter.title}
                </h3>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap",
                    newsletter.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400",
                  )}
                >
                  {newsletter.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                {newsletter.description.replace(/<[^>]*>/g, "")}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {newsletter.month} {newsletter.year}
                  </span>
                </div>
                <span>•</span>
                <span>{newsletter.sections.length} sections</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-700/50">
              {newsletter.status === "published" && (
                <Link href={`/newsletters/${newsletter.slug}`} target="_blank">
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                </Link>
              )}
              <Link href={`/admin/newsletters/${newsletter.id}/edit`}>
                <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 rounded transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={() => onDelete(newsletter.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
