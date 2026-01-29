'use client';

import Image from 'next/image';
import { IconPhone, IconMail, IconDownload } from '@tabler/icons-react';

interface TaxProps {
  currentScreen: number;
  onScreenChange?: (screen: number) => void;
}

export default function Tax({ currentScreen, onScreenChange }: TaxProps) {

  const screens = [
    {
      id: 0,
      title: "Tax",
      subtitle: "Overview",
      content: "The constant improvement in the rankings of ease of business index by World Bank reflects increasing confidence of entrepreneurs to invest in India. That, coupled with consistent tweaks in tax structures to simplify business is a boon, yet presents a challenge to keep up with the current tax regulations. JCSS, combining its in-depth knowledge of the regulations with insights on the industry, helps businesses to effectively operate within the regulatory scheme of things. JCSS has catered to businesses at every stage of their lifecycle, operating in different industries, and has provided effective solutions in the areas of taxation, litigation and advisory matters.",
      showAllSubtitles: true
    },
    {
      id: 1,
      title: "Tax",
      subtitle: "Indirect Taxes",
      content: "The simplification of indirect tax structure through implementation of Goods and Services Tax (GST) has significantly impacted businesses, reducing the hassles of compliance. Though the measure eases the tax complications, adapting to the new tax regime and complying throws a challenge to businesses, as it requires a significant reconfiguration of operations.",
      additionalContent: "JCSS, with its deep knowledge of cross border trade in various sectors and countries, provides assistance to businesses with their insights on Indian and International taxes helping them identify potential risk areas and plan for a stable future.",
      finalContent: "JCSS has substantial experience in Indian Customs, Transfer Pricing and Export Promotion Schemes"
    },
    {
      id: 2,
      title: "Tax",
      subtitle: "Foreign Trade Policy",
      content: "Foreign Trade Policy services to help businesses navigate international trade regulations and optimize their global operations.",
      services: [
        "Advisory and Consulting",
        "Transaction Cost Minimization", 
        "SEZ & EOU",
        "Compliance & Support"
      ]
    },
    {
      id: 3,
      title: "Tax",
      subtitle: "Customs & International Trade",
      content: "Our customs and international trade services ensure smooth cross-border operations while maintaining full compliance with regulatory requirements.",
      services: [
        "Advisory",
        "Transaction Structuring",
        "Regulatory Compliance",
        "Representation and Legal Support",
        "Valuation and Assessment"
      ]
    },
    {
      id: 4,
      title: "Tax",
      subtitle: "Goods and Service Tax (GST)",
      content: "Comprehensive GST services covering all aspects of goods and services tax compliance, from registration to advanced advisory services.",
      services: [
        "Advisory",
        "Transaction Structuring",
        "Regulatory Compliance",
        "Due Diligence",
        "Review and Adjudication",
        "Refunds / Rebate",
        "Training",
        "Advance Ruling"
      ]
    },
    {
      id: 5,
      title: "Tax",
      subtitle: "Direct Taxes",
      content: "With rapidly transforming tax and regulatory environment, businesses across the world are finding it hard to keep abreast with the changing tax structures. Taxation throw challenges in compliance and litigation, but sometimes provides opportunities in the form of benefits for specific industries. Thus, a system needs to be established to navigate through these complex changes.",
      additionalContent: "JCSS, with its experience in handling tax matters in India, Singapore, Thailand, Japan and other countries, can direct clients in complying with tax computation, returns and handle tax litigation matters in these jurisdictions."
    },
    {
      id: 6,
      title: "Tax",
      subtitle: "International Taxation",
      content: "JCSS, with its deep knowledge of cross border trade in various sectors and countries, provides assistance to businesses with their insights on Indian and International taxes.",
      services: [
        "Cross-border Taxation",
        "Double Taxation Treaties",
        "International Compliance",
        "Global Tax Planning"
      ]
    },
    {
      id: 7,
      title: "Tax",
      subtitle: "Transfer Pricing",
      content: "JCSS has substantial experience in Indian Customs, Transfer Pricing and Export Promotion Schemes, helping businesses identify potential risk areas and plan for a stable future.",
      services: [
        "Transfer Pricing Documentation",
        "Economic Analysis",
        "Benchmarking Studies",
        "Dispute Resolution"
      ]
    },
    {
      id: 8,
      title: "Tax",
      subtitle: "Litigation",
      content: "Expert representation in tax disputes and litigation matters across various forums and jurisdictions.",
      services: [
        "Tax Litigation",
        "Appeals Management",
        "Dispute Resolution",
        "Settlement Negotiations"
      ]
    },
    {
      id: 9,
      title: "Tax",
      subtitle: "Expatriate Taxation",
      content: "Specialized tax services for expatriates and international assignments, ensuring compliance across multiple jurisdictions.",
      services: [
        "Expatriate Tax Planning",
        "International Assignments",
        "Tax Equalization",
        "Compliance Management"
      ]
    },
    {
      id: 10,
      title: "Tax",
      subtitle: "Advisory Services",
      content: "Strategic tax advisory services to optimize business operations and ensure long-term tax efficiency.",
      services: [
        "Tax Strategy Development",
        "Business Restructuring",
        "Mergers & Acquisitions",
        "Tax Optimization"
      ]
    },
    {
      id: 11,
      title: "Tax",
      subtitle: "Corporate Taxes",
      heading: "Expert Corporate Tax Solutions",
      content: "JCSS, with its experience in handling tax matters in India, Singapore, Thailand, Japan and other countries, can direct clients in complying with tax computation, returns and handle tax litigation matters in these jurisdictions.",
      contact: {
        title: "Let's Connect",
        description: "Schedule a complimentary meeting to discuss your corporate tax needs.",
        phone: "+91 80 2334 7000",
        email: "tax@jcssglobal.com"
      }
    }
  ];

  // Remove local scroll handling - now handled by parent

  const currentScreenData = screens[currentScreen];

  return (
    <div id="tax-section" className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/t.jpg"
          alt="Tax Services Background"
          fill
          className="object-cover"
          priority
        />
        {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex flex-col mt-6 justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        <div className="text-left max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full">
          
          {/* Fixed Header Section - Title and Subtitle */}
          <div className="h-40 sm:h-44 md:h-48 flex flex-col justify-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-orange-500 mb-2 flex items-center gap-2">
              Tax
              <IconDownload size={24} className="sm:w-8 sm:h-8 text-white bg-gray-500 p-1 sm:p-2 rounded-full" />
            </h1>
            {/* Active Status Subtitles - Horizontal Layout */}
            <div className="space-y-2 sm:space-y-4 font-medium">
              <div className="flex flex-wrap gap-1 text-xs sm:text-sm md:text-base lg:text-lg border-b border-orange-500 pb-2">
                <button 
                  onClick={() => onScreenChange?.(1)}
                  className={`px-1 sm:px-2 py-1 ${(currentScreen >= 1 && currentScreen <= 4) ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Indirect Taxes
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(2)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 2 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Foreign Trade Policy
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(3)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 3 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Customs & International Trade
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(4)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 4 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Goods and Service Tax (GST)
                </button>
              </div>
              <div className="flex flex-wrap gap-1 text-xs sm:text-sm md:text-base lg:text-lg">
                <button 
                  onClick={() => onScreenChange?.(5)}
                  className={`px-1 sm:px-2 py-1 ${(currentScreen >= 5 && currentScreen <= 11) ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Direct Taxes
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(6)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 6 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  International Taxation
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(7)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 7 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Transfer Pricing
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(8)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 8 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Litigation
                </button>
                <span className="text-slate-500 ">|</span>
                <button 
                  onClick={() => onScreenChange?.(9)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 9 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Expatriate Taxation
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(10)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 10 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Advisory Services
                </button>
                <span className="text-slate-500 inline">|</span>
                <button 
                  onClick={() => onScreenChange?.(11)}
                  className={`px-1 sm:px-2 py-1 ${currentScreen === 11 ? 'text-orange-500' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
                >
                  Corporate Taxes
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content Area - Fixed Height with Scroll */}
          <div className="h-72 sm:h-80 md:h-[120px] overflow-y-auto mt-5 sm:mt-0 service-content-scroll">
            <div 
              key={currentScreen}
              className="space-y-4 sm:space-y-6 text-white animate-fade-in-up pr-2"
            >
            {/* Heading for screen 3 */}
            {currentScreenData.heading && (
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {currentScreenData.heading}
              </h2>
            )}

            {/* Main Content - All Screens */}
            <div className="space-y-3 sm:space-y-4">
              {/* Show subtitle as heading for screens 2-4 and 6+ */}
              {(currentScreen >= 2 && currentScreen <= 4) || currentScreen >= 6 ? (
                <h3 className="text-base sm:text-lg font-semibold text-orange-400">
                  {currentScreenData.subtitle}
                </h3>
              ) : null}

              {/* Main content paragraph */}
              <p className="text-sm sm:text-base leading-relaxed text-white">
                {currentScreenData.content}
              </p>

              {/* Additional content for screens 1 and 5 */}
              {currentScreenData.additionalContent && (
                <p className="text-sm sm:text-base leading-relaxed text-white">
                  {currentScreenData.additionalContent}
                </p>
              )}

              {/* Final content for screen 1 */}
              {currentScreenData.finalContent && (
                <p className="text-sm sm:text-base leading-relaxed text-white">
                  {currentScreenData.finalContent}
                </p>
              )}

              {/* Services List */}
              {currentScreenData.services && (
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

            {/* Contact Info */}
            {currentScreenData.contact && (
              <div className="space-y-3 mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {currentScreenData.contact.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentScreenData.contact.description}
                </p>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <IconPhone size={16} className="text-orange-500 shrink-0" />
                    <span className="text-slate-300">{currentScreenData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMail size={16} className="text-orange-500 shrink-0" />
                    <span className="text-slate-300">{currentScreenData.contact.email}</span>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}