"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconFileText,
  IconCalendar,
  IconEye,
  IconSearch,
} from "@tabler/icons-react";



interface NewsletterSection {
  title: string;
  content: string;
  type: "text" | "list" | "highlight";
  items?: string[];
}

interface Newsletter {
  id: string;
  title: string;
  date: string;
  description: string;
  fileName: string;
  fileUrl: string;
  content: NewsletterSection[];
  highlights: string[];
  keyMetrics?: {
    label: string;
    value: string;
  }[];
}

// Generate newsletters from data file
const generateNewslettersFromData = () => {
  const newsletters: Newsletter[] = [
    {
      id: "1",
      title: "Newsletter 2025 - December",
      date: "December 2025",
      description:
        "Our comprehensive December 2025 year-end newsletter featuring exceptional achievements, strategic milestones, client success stories, and our vision for 2026. This edition celebrates record-breaking performance, innovative solutions, and our commitment to delivering transparency and excellence across all service verticals.",
      fileName: "Newsletter December 2025.docx",
      fileUrl: "/Newsletter December 2025.docx",
      highlights: [
        "Record-breaking year-end performance with 180+ projects completed",
        "99.2% client satisfaction rating - our highest achievement",
        "Expansion to 3 new international markets",
        "Launch of 5 innovative digital compliance solutions",
      ],
      keyMetrics: [
        { label: "Projects Completed", value: "180+" },
        { label: "Client Satisfaction", value: "99.2%" },
        { label: "Team Growth", value: "40%" },
        { label: "New Markets", value: "3" },
      ],
      content: [
        {
          title: "Executive Summary",
          type: "text",
          content:
            "December 2025 marks the culmination of an exceptional year for JCSS, characterized by unprecedented growth, strategic innovations, and outstanding client success stories. Our commitment to delivering transparency and excellence has driven remarkable results across all service verticals.",
        },
        {
          title: "Key Achievements",
          type: "list",
          content: "This year brought several transformative milestones:",
          items: [
            "Successfully completed 180+ client projects throughout 2025",
            "Achieved 99.2% client satisfaction rating - our highest ever",
            "Expanded operations to 3 new international markets",
            "Launched 5 innovative digital compliance solutions",
            "Established 25+ strategic partnerships globally",
            "Grew our team by 40% with industry-leading professionals",
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Newsletter 2025 - November",
      date: "November 2025",
      description:
        "Our comprehensive November 2025 newsletter featuring the latest company updates, project milestones, team achievements, and industry insights. This edition covers our recent strategic initiatives, client success stories, and upcoming developments that showcase our commitment to delivering transparency and excellence.",
      fileName: "Newsletter November 2025 (1).docx",
      fileUrl: "/Newsletter November  2025 (1).docx",
      highlights: [
        "Record-breaking quarterly performance",
        "New strategic partnerships established",
        "Team expansion across multiple departments",
        "Enhanced service delivery capabilities",
      ],
      keyMetrics: [
        { label: "Projects Completed", value: "45+" },
        { label: "Client Satisfaction", value: "98%" },
        { label: "Team Growth", value: "25%" },
        { label: "New Partnerships", value: "8" },
      ],
      content: [
        {
          title: "Executive Summary",
          type: "text",
          content:
            "November 2025 has been a transformative month for JCSS, marked by exceptional growth, strategic partnerships, and outstanding client achievements. Our commitment to delivering transparency and excellence continues to drive our success across all service verticals.",
        },
        {
          title: "Key Achievements",
          type: "list",
          content: "This month brought several significant milestones:",
          items: [
            "Successfully completed 45+ client projects across various sectors",
            "Achieved 98% client satisfaction rating through enhanced service delivery",
            "Expanded our team by 25% with top-tier professionals",
            "Established 8 new strategic partnerships to strengthen our market position",
            "Launched innovative digital solutions for audit and compliance services",
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Newsletter 2025 - October",
      date: "October 2025",
      description:
        "Comprehensive GST and regulatory updates for October 2025, featuring critical developments in tax law, customs regulations, and international compliance. This edition covers significant AAR rulings, tribunal decisions, and policy changes affecting businesses across India and Singapore.",
      fileName: "Newsletter October 2025.docx",
      fileUrl: "/Newsletter October  2025.docx",
      highlights: [
        "Critical GST AAR rulings on ITC eligibility",
        "Launch of GST Appellate Tribunal (GSTAT)",
        "Risk-based provisional GST refunds introduced",
        "Singapore MAS guidelines on digital financial content",
      ],
      keyMetrics: [
        { label: "GST Updates", value: "15+" },
        { label: "Court Rulings", value: "8" },
        { label: "Policy Changes", value: "12" },
        { label: "Compliance Alerts", value: "25+" },
      ],
      content: [
        {
          title: "GST Updates",
          type: "text" as const,
          content:
            "Comprehensive GST updates covering latest rulings and policy changes",
        },
        {
          title: "Customs Updates",
          type: "text" as const,
          content: "Latest customs litigation updates and tribunal decisions",
        },
      ],
    },
  ];

  return newsletters;
};

const newsletters = generateNewslettersFromData();

export default function Newsletters() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewNewsletter = (newsletter: Newsletter) => {
    // Convert title to URL-friendly format
    const urlId = newsletter.title
      .toLowerCase()
      .replace("newsletter 2025 - ", "")
      .replace(/\s+/g, "-");

    window.location.href = `/newsletters/${urlId}-2025`;
  };

  // Enhanced search functionality
  const getFilteredContent = () => {
    if (!searchTerm) return newsletters;

    return newsletters.filter(
      (newsletter) =>
        newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        newsletter.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        newsletter.highlights.some((highlight) =>
          highlight.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  const filteredNewsletters = getFilteredContent();

  return (
    <div className="fixed inset-0 min-h-screen w-screen overflow-hidden bg-[#1d4e77]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
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
      <div className="relative z-10 h-full overflow-y-auto flex flex-col pt-24">
      {/* Content Container */}
      <div className="flex-1 flex flex-col py-6">
        {/* Header Section */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Newsletter
          </h2>
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
        </div>

        {/* Newsletters Grid Container */}
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {filteredNewsletters.length > 0 ? (
              filteredNewsletters.map((newsletter, index) => (
                <div
                  key={newsletter.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group flex flex-col"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Newsletter Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg shrink-0">
                      <IconFileText className="w-7 h-7 text-orange-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors leading-tight">
                        {newsletter.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <IconCalendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-gray-400 text-sm">
                          {newsletter.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Newsletter Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm flex-1">
                    {newsletter.description}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewNewsletter(newsletter)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <IconEye className="w-5 h-5" />
                    <span>View Details</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-2 text-center py-12 px-4">
                <IconSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No newsletters found
                </h3>
                <p className="text-gray-400 text-base mb-4">
                  Try adjusting your search terms or browse all available
                  newsletters.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
