"use client";

import Image from "next/image";
import { IconCalendar, IconArrowLeft, IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import { november2025Newsletter } from "@/components/Newsletters/november2025";
import { october2025Newsletter } from "@/components/Newsletters/october2025";
import { december2025Newsletter } from "@/components/Newsletters/december2025";

interface ContentItem {
  heading: string;
  subheading: string;
  content: string;
}

interface Section {
  title: string;
  content: ContentItem[];
}

interface Newsletter {
  title: string;
  date: string;
  sections?: Record<string, Section>;
  content?: string; // For HTML content format
}

interface NewsletterDetailProps {
  id: string;
}

const newsletterData: Record<string, Newsletter> = {
  "december-2025": december2025Newsletter,
  "november-2025": november2025Newsletter,
  "october-2025": october2025Newsletter,
};

export default function NewsletterDetail({ id }: NewsletterDetailProps) {
  const newsletter = newsletterData[id];

  if (!newsletter) {
    return (
      <div className="fixed inset-0 min-h-screen w-screen bg-[#1d4e77]">
        {/* Background Image - Fixed */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/newss.jpg"
            alt="Newsletter Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Newsletter Not Found
            </h1>
            <Link
              href="/newsletters"
              className="text-orange-500 hover:text-orange-400 transition-colors text-sm sm:text-base"
            >
              ← Back to Newsletters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Function to render HTML content safely
  const renderHTMLContent = (htmlContent: string) => {
    // Clean and format the HTML content
    let cleanContent = htmlContent
      // Fix malformed tags first
      .replace(/<\/>/g, '') // Remove empty closing tags
      .replace(/<h3>([^<]*)<\/>/g, '<h3>$1</h3>') // Fix malformed h3 tags
      // Add proper table structure
      .replace(/<tr>/g, '<tr class="border-b border-gray-600">')
      .replace(/<th>/g, '<th class="border border-gray-600 px-3 py-2 bg-orange-500/20 text-orange-400 font-semibold text-left">')
      .replace(/<td>/g, '<td class="border border-gray-600 px-3 py-2 text-gray-300">')
      // Style other elements
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-orange-500 my-4 border-b border-orange-500/30 pb-2">')
      .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-white my-3">')
      .replace(/<h4>/g, '<h4 class="text-lg font-medium text-orange-400 my-2">')
      .replace(/<h5>/g, '<h5 class="text-base font-medium text-orange-300 my-2">')
      .replace(/<p>/g, '<p class="text-gray-300 mb-3 leading-relaxed">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside text-gray-300 mb-3 space-y-1">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside text-gray-300 mb-3 space-y-1">')
      .replace(/<li>/g, '<li class="mb-1">')
      .replace(/<a(\s|>)/g, '<a$1')
      .replace(/<a([^>]*)>/g, '<a$1 class="text-blue-300 hover:text-blue-400 transition-colors">')
      .replace(/<dl>/g, '<dl class="text-gray-300 mb-3">')
      .replace(/<dt>/g, '<dt class="font-semibold text-orange-400 mb-1">')
      .replace(/<dd>/g, '<dd class="mb-2 ml-4">');

    // Handle tables - wrap orphaned tr elements in proper table structure
    if (cleanContent.includes('<tr') && !cleanContent.includes('<table')) {
      // Find all tr elements and wrap them in a table
      cleanContent = cleanContent.replace(
        /(<tr[^>]*>[\s\S]*?<\/tr>)/g,
        (match, trContent) => {
          if (!match.includes('<table')) {
            return `<table class="w-full border-collapse border border-gray-600 mb-4 mt-4">
              <tbody>${trContent}</tbody>
            </table>`;
          }
          return match;
        }
      );
    }

    // If we have multiple consecutive tr elements, group them in one table
    cleanContent = cleanContent.replace(
      /(<table[^>]*><tbody>)(<tr[\s\S]*?<\/tr>)(<\/tbody><\/table>)(\s*)(<table[^>]*><tbody>)(<tr[\s\S]*?<\/tr>)(<\/tbody><\/table>)/g,
      '$1$2$6$3'
    );

    return (
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    );
  };

  return (
    <div className="fixed inset-0 min-h-screen w-screen bg-[#1d4e77]">
      {/* Background Image - Fixed */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/newss.jpg"
          alt="Newsletter Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container - Scrollable */}
      <div className="relative z-10 h-full overflow-y-auto pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Back Button */}
          <div className="my-10 sm:my-8 pt-5">
            <Link
              href="/newsletters"
              className="inline-flex items-center font-medium p-2 border border-white/30 bg-white/10 backdrop-blur-sm rounded-xl space-x-2 text-orange-500 hover:text-orange-400 transition-colors text-sm sm:text-base"
            >
              <IconArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Back to Newsletters</span>
            </Link>
          </div>

          {/* Newsletter Header */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 lg:p-4 bg-orange-500/20 rounded-lg shrink-0">
                  <IconFileText className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-500" />
                </div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {newsletter.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 mt-3 sm:mt-4">
              <IconCalendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="text-base sm:text-lg">{newsletter.date}</span>
            </div>
          </div>

          {/* Newsletter Content */}
          <div className="space-y-6 sm:space-y-8">
            {newsletter.sections ? (
              // Structured content format (December)
              Object.entries(newsletter.sections).map(
                ([sectionKey, section]) => (
                  <div
                    key={sectionKey}
                    className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 border-b border-orange-500/30 pb-2 sm:pb-3">
                      {section.title}
                    </h2>

                    <div className="space-y-4 sm:space-y-6">
                      {section.content.map((item, index) => (
                        <div key={index} className="space-y-3 sm:space-y-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                            {item.heading}
                          </h3>

                          {item.subheading && (
                            <h4 className="text-base sm:text-lg font-medium text-orange-400">
                              {item.subheading}
                            </h4>
                          )}

                          <div className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            {item.content
                              .split("\n\n")
                              .map((paragraph, pIndex) => (
                                <div key={pIndex} className="mb-3 sm:mb-4">
                                  {paragraph.split("\n").map((line, lIndex) => {
                                    // Handle bullet points
                                    if (line.startsWith("• ")) {
                                      return (
                                        <div
                                          key={lIndex}
                                          className="flex items-start space-x-2 mb-2"
                                        >
                                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                                          <span className="text-sm sm:text-base">
                                            {line.substring(2)}
                                          </span>
                                        </div>
                                      );
                                    }
                                    // Handle numbered lists
                                    if (/^\d+\./.test(line)) {
                                      return (
                                        <div
                                          key={lIndex}
                                          className="mb-2 ml-3 sm:ml-4"
                                        >
                                          <span className="text-orange-400 font-medium text-sm sm:text-base">
                                            {line}
                                          </span>
                                        </div>
                                      );
                                    }
                                    // Regular paragraphs
                                    return line ? (
                                      <p
                                        key={lIndex}
                                        className="mb-2 text-sm sm:text-base"
                                      >
                                        {line}
                                      </p>
                                    ) : null;
                                  })}
                                </div>
                              ))}
                          </div>

                          {index < section.content.length - 1 && (
                            <hr className="border-gray-600/30 my-4 sm:my-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )
            ) : newsletter.content ? (
              // HTML content format (October/November)
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <style jsx>{`
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                  }
                  th, td {
                    border: 1px solid #4b5563;
                    padding: 0.75rem;
                    text-align: left;
                  }
                  th {
                    background-color: rgba(249, 115, 22, 0.2);
                    color: #fb923c;
                    font-weight: 600;
                  }
                  td {
                    color: #d1d5db;
                  }
                  tbody tr:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                  }
                `}</style>
                {renderHTMLContent(newsletter.content)}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <p className="text-gray-300">No content available for this newsletter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}