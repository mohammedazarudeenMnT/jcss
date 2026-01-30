"use client";

import { useState } from "react";
import Image from "next/image";
import { IconMessage } from "@tabler/icons-react";
import HomeMobile from "./HomeMobile";

interface HomeScreensProps {
  currentScreen: number;
  onScreenChange: (newScreen: number) => void;
  isTransitioning: boolean;
}

export default function HomeScreens({ currentScreen }: HomeScreensProps) {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const screens = [
    // ==================== SCREEN 1 - Welcome Introduction ====================
    {
      id: 0,
      heading: "Welcome to JCSS.",
      subheading:
        "Here, we navigate the complexities of today's global business environment by offering tailored Accounting and Regulatory Services. Headquartered in Bangalore, with offices across India, Singapore, and Japan, our experienced team delivers practical, transparent solutions to help businesses thrive amidst intense competition, evolving regulations, and shifting consumer demands.",
      showTimeline: false,
      showButton: false,
    },
    // ==================== SCREEN 2 - Welcome with Let's Talk Button ====================
    {
      id: 1,
      heading: "Welcome to JCSS.",
      subheading:
        "Here, we navigate the complexities of today's global business environment by offering tailored Accounting and Regulatory Services. Headquartered in Bangalore, with offices across India, Singapore, and Japan, our experienced team delivers practical, transparent solutions to help businesses thrive amidst intense competition, evolving regulations, and shifting consumer demands.",
      showTimeline: false,
      showButton: true,
    },
    // ==================== SCREEN 3 - Our Journey with Timeline ====================
    {
      id: 2,
      heading: "Our Journey.",
      subheading:
        "Since 2000, we've advised over 450 clients—from start-ups to Fortune 500 companies—across industries like Infrastructure, IT, Manufacturing, and Construction. With offices in Bangalore, Chennai, Delhi, Hyderabad, Pune, Singapore, and Tokyo, we're always close to our clients.",
      showTimeline: true,
      showButton: false,
    },
    // ==================== SCREEN 4 - Our Promise ====================
    {
      id: 3,
      heading: "Our Promise.",
      subheading:
        "JCSS was founded on one core value: Delivering Transparency. We simplify complex regulations, anticipate business needs, and provide clear, effective solutions. Over the years, we've grown globally, but our commitment to transparency remains unchanged, supported by a dedicated team that shares our vision.",
      showTimeline: false,
      showButton: false,
    },
  ];

  const timeline = [
    {
      year: "2000",
      title: "Get Started",
      description: "With a staff of 5, JCSS opens business",
    },
    {
      year: "2001",
      title: "Global Advising",
      description: "Advises its first Global client",
    },
    {
      year: "2002",
      title: "All-round Growth",
      description: "Clients (50), employees (18), New Office",
    },
    {
      year: "2003",
      title: "Spreading Across India",
      description: "Offices at New Delhi, Pune, Chennai and Hyderabad",
    },
    {
      year: "2004",
      title: "Growth Unabated",
      description: "Clients (125), employees (75), New Office",
    },
    {
      year: "2005",
      title: "Exploring the Orient",
      description: "Exploring Japanese market, exclusive Japanese Desk",
    },
    {
      year: "2008",
      title: "Quadruple Century",
      description: "Steadily growing to achieve 400 clients advised",
    },
    {
      year: "2020",
      title: "Exploring East",
      description: "JCSS opens overseas offices in Singapore & Japan",
    },
    {
      year: "2021",
      title: "Strategic Partnership",
      description:
        "Radhika Bali and Associates joins hands with JCSS to form JCSS Law",
    },
    {
      year: "2023",
      title: "Southeast Expansion",
      description: "Indonesia office opens",
    },
    {
      year: "2025",
      title: "The West Beckons",
      description: "Next stop Dubai",
    },
  ];

  // Remove local scroll handling - now handled by parent

  const currentScreenData = screens[currentScreen];

  return (
    <>
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <HomeMobile />
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <main className="fixed inset-0 h-screen w-screen overflow-hidden">
          {/* ========================================================================== */}
          {/* ========================= SHARED BACKGROUND SECTION ==================== */}
          {/* ========================================================================== */}

          <section className="absolute inset-0 z-0 overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                currentScreen === 0
                  ? "scale-175 translate-x-0 rotate-0"
                  : currentScreen === 1
                    ? "scale-150 translate-x-2 rotate-1"
                    : currentScreen === 2
                      ? "scale-125 translate-x-3 rotate-2"
                      : "scale-110 translate-x-3 rotate-3"
              }`}
            >
              <Image
                src="/images/home.jpg"
                alt="Professional Business Environment"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          </section>

          {/* Screen 2 - Let's Talk Button (Left Side) */}
          {currentScreen === 1 && (
            <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-30 opacity-100 translate-x-0 transition-all duration-1000 ease-in-out">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-8 rounded-r-full font-normal text-xl shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <IconMessage size={24} stroke={2} />
                <span>Let&apos;s Talk</span>
              </button>
            </aside>
          )}

          {/* Content Container */}
          <article className="relative z-10 h-screen flex items-center justify-end pr-8 sm:pr-24 lg:pr-32">
            <div className="text-right max-w-4xl flex flex-col justify-center w-full">
              {/* Logo - SVG (Shared across all screens) */}
              <div className="mb-8 animate-fade-in flex flex-col items-end">
                <div className="mb-4 pr-2">
                  <Image
                    src="/svg/logo.svg"
                    alt="JCSS Consulting"
                    width={360}
                    height={180}
                    className="w-auto h-28 md:h-28 rounded-sm"
                    priority
                  />
                </div>
              </div>

              {/* Dynamic Content (Shared across all screens) */}
              <div
                key={currentScreen}
                className="text-slate-200 animate-fade-in-up relative pr-2"
              >
                <h2 className="text-base leading-relaxed">
                  <span className="font-semibold text-white">
                    {currentScreenData.heading}
                  </span>{" "}
                  {currentScreenData.subheading}
                </h2>

                {/* Screen 3 - Timeline Section */}
                {currentScreenData.showTimeline && (
                  <section className="relative mt-4 pt-8 animate-fade-in-up animation-delay-200 mb-12 w-full max-w-7xl">
                    <div className="relative px-6 py-6 max-w-5xl mr-10">
                      {/* Main dotted line */}
                      <div
                        className="absolute top-1/2 transform translate-y-1/2 left-12 right-12 h-0.5"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to right, #64748b 0px, #64748b 4px, transparent 4px, transparent 8px)",
                          height: "2px",
                        }}
                      />

                      {/* Timeline points container */}
                      <div className="flex justify-between items-center relative">
                        {timeline.map((item, index) => (
                          <div
                            key={item.year}
                            className="flex flex-col items-center relative z-10 cursor-pointer group"
                            style={{
                              animation: `fadeIn 0.5s ease-out ${
                                index * 0.1 + 0.3
                              }s both`,
                            }}
                            onMouseEnter={() => setHoveredYear(item.year)}
                            onMouseLeave={() => setHoveredYear(null)}
                          >
                            {/* Year label above the point */}
                            <span
                              className={`text-base font-medium mb-3 transition-all duration-300 ${
                                hoveredYear === item.year
                                  ? "text-orange-300 scale-110"
                                  : "text-white"
                              }`}
                            >
                              {item.year}
                            </span>

                            {/* Timeline point */}
                            <div
                              className={`w-4 h-4 rounded-full border-white border-2 transition-all duration-300 relative ${
                                hoveredYear === item.year
                                  ? "bg-orange-400 scale-150 shadow-lg shadow-orange-400/50"
                                  : "bg-orange-500 shadow-md shadow-orange-500/30"
                              }`}
                            >
                              {/* Outer ring for hover effect */}
                              {hoveredYear === item.year && (
                                <div className="absolute inset-0 rounded-full border-2 border-orange-300 scale-150 animate-pulse" />
                              )}
                            </div>

                            {/* Hover Tooltip - Bottom positioned */}
                            {hoveredYear === item.year && (
                              <aside className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 w-56 bg-slate-800/95 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4 shadow-2xl animate-fade-in-up z-50">
                                <div className="text-center">
                                  <h3 className="text-orange-400 font-bold text-base mb-2">
                                    {item.title}
                                  </h3>
                                  <p className="text-slate-200 text-sm leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                                {/* Arrow pointing up */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-800/95" />
                              </aside>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
