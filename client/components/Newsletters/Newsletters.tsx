"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  IconFileText,
  IconCalendar,
  IconEye,
  IconSearch,
  IconLoader2,
} from "@tabler/icons-react";
import { useInView } from "react-intersection-observer";
import { getNewsletters } from "@/lib/api/newsletter";
import type { Newsletter } from "@/lib/types/newsletter";
import { useScrollablePage } from "../ScrollablePageProvider";

export default function Newsletters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { containerRef, handleScroll } = useScrollablePage();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  const loadInitialNewsletters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getNewsletters("published", 1, 6);
      setNewsletters(res.data);
      setHasMore(res.meta.page < res.meta.pages);
      setPage(1);
    } catch (error) {
      console.error("Failed to fetch newsletters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreNewsletters = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;

    try {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      const res = await getNewsletters("published", nextPage, 6);
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

  const handleViewNewsletter = (newsletter: Newsletter) => {
    if (newsletter.slug) {
      window.location.href = `/newsletters/${newsletter.slug}`;
    }
  };

  const filteredNewsletters = newsletters.filter(
    (newsletter) =>
      newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (newsletter.month &&
        newsletter.month.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (newsletter.year && newsletter.year.toString().includes(searchTerm)),
  );

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#1d4e77]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/newss.jpg"
          alt="Newsletter Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="relative z-10 h-full overflow-y-auto flex flex-col pt-24"
      >
        <div className="flex-1 flex flex-col py-6">
          {/* Header Section */}
          <header className="text-center mb-8 px-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Newsletter
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-base">
              Access our comprehensive newsletter archive featuring detailed
              regulatory updates, compliance guides, and industry insights.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <IconSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </header>

          {/* Newsletters Grid Container */}
          <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <IconLoader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                <p className="text-white text-lg">Loading latest editions...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
                  {filteredNewsletters.length > 0 ? (
                    filteredNewsletters.map((newsletter, index) => (
                      <article
                        key={newsletter.id || newsletter._id}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group flex flex-col"
                      >
                        {/* Newsletter Header */}
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="p-3 bg-orange-500/20 rounded-lg shrink-0">
                            <IconFileText className="w-7 h-7 text-orange-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors leading-tight">
                              {newsletter.title}
                            </h2>
                            <div className="flex items-center space-x-2 mt-2">
                              <IconCalendar className="w-4 h-4 text-gray-400 shrink-0" />
                              <time
                                dateTime={`${newsletter.year}-${newsletter.month}`}
                                className="text-gray-400 text-sm"
                              >
                                {newsletter.month} {newsletter.year}
                              </time>
                            </div>
                          </div>
                        </div>

                        {/* Newsletter Description */}
                        <div
                          className="text-gray-300 leading-relaxed mb-6 text-sm flex-1 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: newsletter.description,
                          }}
                        />

                        {/* Action Button */}
                        <button
                          onClick={() => handleViewNewsletter(newsletter)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                        >
                          <IconEye className="w-5 h-5" />
                          <span>View Details</span>
                        </button>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-1 lg:col-span-2 text-center py-12 px-4">
                      <IconSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No newsletters found
                      </h3>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>

                {/* Sentinel element for infinite scroll */}
                <div ref={ref} className="h-10 mt-8 flex justify-center">
                  {isFetchingMore && (
                    <div className="flex items-center gap-2 text-orange-500">
                      <IconLoader2 className="w-6 h-6 animate-spin" />
                      <span className="font-bold text-sm uppercase tracking-widest">
                        Loading more...
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
