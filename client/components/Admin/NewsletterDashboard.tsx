import { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCcw, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";
import type { Newsletter } from "@/lib/types/newsletter";
import {
  getNewsletters,
  deleteNewsletter,
  updateNewsletter,
} from "@/lib/api/newsletter";
import NewsletterList from "./NewsletterList";
import ConfirmationModal from "../ui/ConfirmationModal";

export default function NewsletterDashboard() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
  }>({ isOpen: false, id: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const loadInitialNewsletters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getNewsletters(undefined, 1, 8);
      setNewsletters(res.data);
      setHasMore(res.meta.page < res.meta.pages);
      setPage(1);
    } catch (error) {
      console.error("Failed to load newsletters:", error);
      toast.error("Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreNewsletters = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;

    try {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      const res = await getNewsletters(undefined, nextPage, 8);
      setNewsletters((prev) => {
        const newItems = res.data.filter(
          (newItem) =>
            !prev.some(
              (existingItem) =>
                (existingItem.id || existingItem._id) ===
                (newItem.id || newItem._id),
            ),
        );
        return [...prev, ...newItems];
      });
      setHasMore(res.meta.page < res.meta.pages);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more newsletters:", error);
      toast.error("Failed to load more newsletters");
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, hasMore, isFetchingMore]);

  useEffect(() => {
    loadInitialNewsletters();
  }, [loadInitialNewsletters]);

  useEffect(() => {
    if (inView && hasMore && !loading && !isFetchingMore) {
      loadMoreNewsletters();
    }
  }, [inView, hasMore, loading, isFetchingMore, loadMoreNewsletters]);

  async function handleDeleteConfirm() {
    const { id } = deleteModal;
    if (!id) return;

    try {
      setIsDeleting(true);
      await deleteNewsletter(id);
      setNewsletters((prev) => prev.filter((n) => n.id !== id && n._id !== id));
      toast.success("Newsletter deleted successfully");
      setDeleteModal({ isOpen: false, id: "" });
    } catch (error) {
      console.error("Failed to delete newsletter:", error);
      toast.error("Failed to delete newsletter");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleStatusToggle(id: string, currentStatus: string) {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    const promise = updateNewsletter(id, {
      status: newStatus as "draft" | "published",
    });

    toast.promise(promise, {
      loading: "Updating status...",
      success: () => {
        setNewsletters((news) =>
          news.map((n) =>
            n.id === id || n._id === id
              ? { ...n, status: newStatus as "draft" | "published" }
              : n,
          ),
        );
        return `Newsletter set to ${newStatus}`;
      },
      error: "Failed to update status",
    });
  }

  const published = newsletters.filter((n) => n.status === "published");
  const drafts = newsletters.filter((n) => n.status === "draft");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Newsletter Editions
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage your dynamic newsletter content and publishing status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadInitialNewsletters}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
            title="Refresh"
          >
            <RefreshCcw
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            />
          </button>
          <Link href="/admin/newsletters/new">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-orange-500/20">
              <Plus className="w-5 h-5 stroke-[3px]" />
              New Edition
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Drafts Section */}
        {drafts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">Drafts</h3>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-full">
                {drafts.length}
              </span>
            </div>
            <NewsletterList
              newsletters={drafts}
              loading={loading}
              onDelete={(id) => setDeleteModal({ isOpen: true, id })}
              onStatusToggle={handleStatusToggle}
            />
          </section>
        )}

        {/* Published Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">Published</h3>
            <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full">
              {published.length}
            </span>
          </div>
          <NewsletterList
            newsletters={published}
            loading={loading}
            onDelete={(id) => setDeleteModal({ isOpen: true, id })}
            onStatusToggle={handleStatusToggle}
          />
        </section>

        {newsletters.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800">
            <p className="text-slate-400 font-medium">
              No newsletters found. Create your first edition!
            </p>
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        <div ref={ref} className="h-10 flex items-center justify-center py-8">
          {isFetchingMore && (
            <div className="flex items-center gap-2 text-orange-500">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Loading more editions...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "" })}
        onConfirm={handleDeleteConfirm}
        loading={isDeleting}
        title="Delete Newsletter"
        message="Are you sure you want to delete this newsletter? This action cannot be undone and will remove the edition from both the dashboard and public archive."
        confirmText="Delete Edition"
      />
    </div>
  );
}
