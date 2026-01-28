'use client';

import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';

interface AuditAssuranceProps {
  currentScreen: number;
  onScreenChange?: (screen: number) => void;
}

export default function AuditAssurance({ currentScreen, onScreenChange }: AuditAssuranceProps) {
  const screens = [
    {
      id: 0, // AD1 - Nothing highlighted
      title: "Assurance",
      content: "Audit and attestation reflects the present and guides in your business endeavours. JCSS ensures that the financial picture is displayed in an accurate and transparent manner, enhancing the opportunities for businesses to negotiate better terms with their investors, in turn helping businesses achieve their financing and growth objectives",
      services: [
        "Statutory Audits",
        "Tax Audit",
        "Quarterly Reviews for Listed Companies",
        "US GAAP & IFRS Restatement and Reporting"
      ]
    },
    {
      id: 1, // AD2 - Enterprise Risk Management
      title: "Assurance",
      content: "Apart from compliance, internal financial controls ensure businesses operate in an orderly and efficient manner, through various inbuilt safeguards and mechanisms to detect frauds / errors. With its expertise in establishing robust financial control frameworks, JCSS helps you meet national and international requirements. To wit:",
      services: [
        "Framework for Listed Companies",
        "IFCFR Framework for other companies",
        "SOX Testing /Implementation (for companies listed in US stock exchanges and their India entities)"
      ]
    },
    {
      id: 2, // AD3 - Corporate Governance
      title: "Assurance",
      content: "In the age of globalization, businesses need to meet transparency norms across various countries, and have to set up internal structures for balancing the interests of all the stakeholders. Considering the far reaching impact of every business action, JCSS understands the importance of Corporate Governance, and helps businesses to establish internal structures for transparency, enhancing stakeholder confidence and provide sustainable results",
      services: [
        "Review Roles & Responsibilities, and compliance thereof",
        "Validity & Taxability of Transactions between Group Companies",
        "Entity Level Controls Framework"
      ]
    },
    {
      id: 3, // AD4 - Audit and Attest
      title: "Assurance",
      content: "The quest for growth, coupled with risks associated with it, presents businesses with a challenge to take decisions, move forward and achieve optimal solutions. JCSS, with its in-depth knowledge in risk assessment, can assist you in your endeavours by mapping risks, developing action plans and establishing metrics to identify key control deficiencies.",
      services: [
        "Risk assessment Studies",
        "Standard Operating Procedures & Desktop Procedures",
        "Statutory Compliances Audit",
        "IT General Controls Review",
        "Cost Optimization Reviews",
        "Special Transactions Reviews",
        "Pre & Post ERP implementation reviews"
      ]
    },
    {
      id: 4, // AD5 - Internal Financial Controls
      title: "Assurance",
      content: "Businesses today are spread across geographies, requiring companies to balance, both, complex and broadening regulatory requirements and at the same time meet stakeholder demands. Transparency is the key word, which helps businesses meet diverse regulatory standards, increasing their credibility in the financial community as well as consumer world.",
      additionalContent: "JCSS, with its experience in working in diverse regulatory environments, can keep your businesses in compliance with the multitude of regulations, without any worries to you. While it takes a lot of time, expertise and resources to comply with multitude of regulators, JCSS can assure you peace of mind, so that you focus on your core business."
    },
    {
      id: 5, // AD6 - Internal Audits
      title: "Assurance",
      content: "The success of any business lies in the strength of its internal controls leading to better corporate governance practices. It not only involves complying with laws, regulations and financial reporting, but also helps maintain operational efficiency by early detection of any lapses in the processes. JCSS helps you streamline your internal processes for smooth business functioning through",
      services: [
        "Internal Audits",
        "Operations Audits",
        "Risk and Control Assurance"
      ]
    }
  ];

  // Remove local scroll handling - now handled by parent
  const currentScreenData = screens[currentScreen];

  return (
    <div id="assurance-section" className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ad.jpg"
          alt="Assurance Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex flex-col justify-center mt-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="text-left max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl w-full">
          
          {/* Fixed Header Section - Title and Subtitle */}
          <div className="h-32 sm:h-36 md:h-40 flex flex-col justify-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-medium text-orange-500 mb-2 flex items-center gap-2">
              Assurance
              <IconDownload size={24} className="sm:w-8 sm:h-8 text-white bg-gray-500 p-1 sm:p-2 rounded-full" />
            </h1>
            <div className="text-sm sm:text-base md:text-lg flex flex-wrap items-center gap-1 sm:gap-2">
              <button 
                onClick={() => onScreenChange?.(1)}
                className={`${currentScreen === 1 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Enterprise Risk Management
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(2)}
                className={`${currentScreen === 2 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Corporate Governance
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(3)}
                className={`${currentScreen === 3 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Audit and Attest
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(4)}
                className={`${currentScreen === 4 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Internal Financial Controls
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(5)}
                className={`${currentScreen === 5 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Internal Audits
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
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">
              {currentScreenData.content}
            </p>

            {/* Additional Content for screen 5 */}
            {currentScreenData.additionalContent && (
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {currentScreenData.additionalContent}
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
          </div>

        </div>
      </div>
    </div>
  );
}
