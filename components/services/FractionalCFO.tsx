'use client';

import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';

interface FractionalCFOProps {
  currentScreen: number;
  onScreenChange?: (screen: number) => void;
}

export default function FractionalCFO({ currentScreen, onScreenChange }: FractionalCFOProps) {
  const screens = [
    {
      id: 0, // Main screen
      title: "Fractional CFO",
      content: "Our Fractional CFO Services help growing businesses access seasoned financial leadership without the full-time cost. From strategy support, cash flow management to supporting Board Governance, we partner with founders, CEOs, and leadership teams to unlock data-driven decision-making, create a culture of compliance and enable to drive sustainable growth.",
      additionalContent: "Whether you are an early-stage startup scaling operations or a SME restructuring for growth, or a nonprofit organization, operating in India, our CFOs step in with the clarity and control needed to thrive.",
      services: []
    },
    {
      id: 1, // Strategy Support
      title: "Fractional CFO",
      subtitle: "Strategy Support",
      content: "Align your financial strategy with long-term business objectives through comprehensive strategic planning and advisory services.",
      services: [
        "Align financial goals with long-term business strategy",
        "Business model validation and scenario planning", 
        "Capital structure advisory and investor readiness"
      ]
    },
    {
      id: 2, // Financial Planning & Analysis (FP&A)
      title: "Fractional CFO", 
      subtitle: "Financial Planning & Analysis (FP&A)",
      content: "Transform your financial data into actionable insights with comprehensive planning, analysis, and reporting solutions.",
      services: [
        "Budgeting, forecasting, and variance analysis",
        "MIS dashboards and board-level reporting",
        "Business intelligence integration and KPI monitoring"
      ]
    },
    {
      id: 3, // Risk Management & Control Processes
      title: "Fractional CFO",
      subtitle: "Risk Management & Control Processes", 
      content: "Establish robust risk management frameworks to protect your business and ensure operational excellence.",
      services: [
        "Designing and monitoring internal control frameworks",
        "Identifying financial and operational risks",
        "Establishing Risk and Control Matrix (RCM) and mitigation mechanisms"
      ]
    },
    {
      id: 4, // Treasury & Cash Flow Management
      title: "Fractional CFO",
      subtitle: "Treasury & Cash Flow Management",
      content: "Optimize your cash position and financial resources through strategic treasury management and cash flow optimization.",
      services: [
        "Real-time cash flow forecasting and optimization",
        "Working capital efficiency",
        "Debt management and banking relationships"
      ]
    },
    {
      id: 5, // Profitability Optimisation
      title: "Fractional CFO",
      subtitle: "Profitability Optimisation", 
      content: "Maximize your business profitability through strategic cost management, pricing optimization, and performance analytics.",
      services: [
        "Cost structure analysis and benchmarking",
        "Pricing models and margin enhancement",
        "Unit economics and ROI diagnostics"
      ]
    },
    {
      id: 6, // Compliance Management
      title: "Fractional CFO",
      subtitle: "Compliance Management",
      content: "Ensure regulatory compliance and build a strong governance framework to support sustainable business growth.",
      services: [
        "Create a culture of compliance",
        "Oversight of statutory financial and regulatory filings",
        "Coordinating with auditors",
        "Ensuring timely compliance with Companies Act, FEMA, GST, and other laws"
      ]
    }
  ];

  const currentScreenData = screens[currentScreen];

  return (
    <div id="fractional-cfo-section" className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cfo.jpg"
          alt="Fractional CFO Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex flex-col justify-center md:mt-16 px-4 sm:px-8 md:px-16 lg:px-16 xl:px-32">
        <div className="text-left max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl  w-full">
          
          {/* Fixed Header Section - Title and Subtitle */}
          <div className="h-32 sm:h-36 md:h-40 flex flex-col justify-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-medium text-orange-500 mb-4 flex items-center gap-2">
              Fractional CFO
              <IconDownload size={24} className="sm:w-8 sm:h-8 text-white bg-gray-500 p-1 sm:p-2 rounded-full" />
            </h1>
            <div className="text-sm sm:text-base md:text-lg flex flex-wrap items-center gap-1 sm:gap-2 mb-4">
              <button 
                onClick={() => onScreenChange?.(1)}
                className={`${currentScreen === 1 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Strategy Support
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(2)}
                className={`${currentScreen === 2 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Financial Planning & Analysis (FP&A)
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(3)}
                className={`${currentScreen === 3 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Risk Management & Control Processes
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(4)}
                className={`${currentScreen === 4 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Treasury & Cash Flow Management
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(5)}
                className={`${currentScreen === 5 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Profitability Optimisation
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(6)}
                className={`${currentScreen === 6 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Compliance Management
              </button>
            </div>
          </div>

          {/* Dynamic Content Area - Fixed Height with Scroll */}
        <div className="h-80 sm:h-96 md:h-112 overflow-y-auto service-content-scroll">
            <div 
              key={currentScreen}
              className="space-y-4 sm:space-y-6 text-slate-200 animate-fade-in-up pr-2"
            >
            {/* Subtitle for specific screens */}
            {/* {currentScreenData.subtitle && (
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-4">
                {currentScreenData.subtitle}
              </h2>
            )} */}

            {/* Main Content */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">
              {currentScreenData.content}
            </p>

            {/* Additional Content for screen 0 */}
            {currentScreenData.additionalContent && (
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {currentScreenData.additionalContent}
              </p>
            )}

            {/* Services List */}
            {currentScreenData.services && currentScreenData.services.length > 0 && (
              <ul className="space-y-2 text-sm sm:text-base">
                {currentScreenData.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
                    <span className="text-slate-300">{service}</span>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}