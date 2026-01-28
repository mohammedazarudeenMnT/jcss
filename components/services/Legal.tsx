'use client';

import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';

interface LegalProps {
  currentScreen: number;
  onScreenChange?: (screen: number) => void;
}

export default function Legal({ currentScreen, onScreenChange }: LegalProps) {
  const screens = [
    {
      id: 0,
      title: "Legal",
      subtitle: "Litigation | Litigation Support | Commercial Agreements | Legal Due Diligence",
      content: "Our legal services cover a broad spectrum of activities, at various stages of business. Before the commencement of the deal (due diligence) or during the finalization of the deal (drafting agreements), resolving issues (litigation support) or legal support (litigation services). JCSS will be with you to actively advise on issues for optimal results.",
      services: []
    },
    {
      id: 1,
      title: "Legal",
      subtitle: "Litigation | Litigation Support | Commercial Agreements | Legal Due Diligence",
      content: "With a premium placed on accuracy and time, litigation process is a challenging undertaking. Businesses require specialists who can assist in litigation support in order to save time, money, and drive efficiency. JCSS with its litigation support services helps you at various stages of your case and assist you in drafting documents and correspondence.",
      services: [
        "Preparation & Analysis of Chronologies",
        "Drafting Documents & Correspondence"
      ]
    },
    {
      id: 2,
      title: "Legal",
      subtitle: "Litigation | Litigation Support | Commercial Agreements | Legal Due Diligence",
      content: "During the process of litigation, it is crucial to document the proceedings and prepare the client for the upcoming legal procedures. JCSS helps businesses in daily management of the legal proceedings and provides systematized documentary support.",
      services: [
        "Contract Paralegal",
        "Trial Presentation",
        "Court Reporting"
      ]
    },
    {
      id: 3,
      title: "Legal",
      subtitle: "Litigation | Litigation Support | Commercial Agreements | Legal Due Diligence",
      content: "While drafting commercial agreements, apart from being clear and transparent, it requires great insight on contingencies, and an in-depth understanding of the nature of business. JCSS, with its experience and expertise across years has provided straightforward, clear and realistic advice. We help businesses in drafting relevant agreements during",
      services: [
        "Private Equity (PE) or Venture Funding",
        "Mergers and Acquisitions",
        "Initial Public Offering / Follow on Offer"
      ]
    },
    {
      id: 4,
      title: "Legal",
      subtitle: "Litigation | Litigation Support | Commercial Agreements | Legal Due Diligence",
      content: "Businesses, during the course of mergers and acquisitions, need to take care of many responsibilities. JCSS provides businesses with comprehensive assessment of the target company concerned, and assists in drafting crucial documents.",
      services: [
        "Comprehensive Assessment of the Transaction",
        "Drafting Crucial Documents"
      ]
    }
  ];

  const currentScreenData = screens[currentScreen];

  return (
    <div id="legal-section" className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/l.jpg"
          alt="Legal Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex flex-col mt-6 justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        <div className="text-right max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full ml-auto">
          
          {/* Fixed Header Section - Title and Subtitle */}
          <div className="h-32 sm:h-36 md:h-40 flex flex-col justify-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-orange-500 mb-2 flex items-center justify-end gap-2">
              Legal
              <IconDownload size={24} className="sm:w-8 sm:h-8 text-white bg-gray-500 p-1 sm:p-2 rounded-full" />
            </h1>
            <div className="text-sm sm:text-base md:text-lg flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              <button 
                onClick={() => onScreenChange?.(1)}
                className={`${currentScreen === 1 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Litigation
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(2)}
                className={`${currentScreen === 2 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Litigation Support
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(3)}
                className={`${currentScreen === 3 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Commercial Agreements
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(4)}
                className={`${currentScreen === 4 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Legal Due Diligence
              </button>
            </div>
          </div>

          {/* Dynamic Content Area - Fixed Height with Scroll */}
          <div className="h-80 sm:h-96 md:h-112 overflow-y-auto service-content-scroll">
            <div 
              key={currentScreen}
              className="space-y-4 sm:space-y-6 text-slate-200 animate-fade-in-up pr-2"
            >
            {/* Main Content */}
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {currentScreenData.content}
            </p>

            {/* Services List */}
            {currentScreenData.services && currentScreenData.services.length > 0 && (
              <ul className="space-y-2 text-sm sm:text-base">
                {currentScreenData.services.map((service, index) => (
                  <li key={index} className="flex items-center justify-end gap-2">
                    <span className="text-slate-300 text-right">{service}</span>
                    <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></span>
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
