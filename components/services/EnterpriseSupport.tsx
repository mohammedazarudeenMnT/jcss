'use client';

import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';

interface EnterpriseProps {
  currentScreen: number;
  onScreenChange?: (screen: number) => void;
}

export default function EnterpriseSupport({ currentScreen, onScreenChange }: EnterpriseProps) {

  const screens = [
    {
      id: 0,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "For businesses it is a challenge to maintain all the functions within the organization, especially if it involves a credible amount of compliance and know-how. Further, it might cost more for businesses to maintain the operations in-house, than to outsource it to specialists in the field.",
      content2: "JCSS supports businesses in running their business smoothly, by providing assistance in activities impacting day-to-day operations. Be it cash management or book-keeping, pay-roll management or compliance, we provide comprehensive services as well as agreed-upon procedures to enable businesses unravel their potential in their area of operation."
    },
    {
      id: 1,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "Our agreed-upon procedures services provide independent verification and testing of specific financial or operational matters as defined by you and other specified parties. These engagements are tailored to meet your unique business requirements.",
      services: [
        "Indian GAAP",
        "US-GAAP / IFRS", 
        "ERP Upload Statements",
        "Remote Access Upload"
      ]
    },
    {
      id: 2,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "Our corporate reporting services ensure your financial communications meet the highest standards of accuracy, transparency, and regulatory compliance. We assist in preparing comprehensive reports that effectively communicate your organization's financial position and performance.",
      services: [
        "Banking & Trust Account Services",
        "Facility Fit-out",
        "Representative Duties"
      ]
    },
    {
      id: 3,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "Navigate the complex landscape of regulatory requirements with our comprehensive statutory compliance services. We ensure your organization meets all applicable laws, regulations, and industry standards while minimizing compliance risks.",
      services: [
        "Cash Forecasting",
        "Purchase Order Management",
        "Asset(s) Control"
      ]
    },
    {
      id: 4,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "Streamline your payroll operations with our comprehensive payroll services. We handle all aspects of employee compensation, from salary calculations and tax withholdings to benefits administration and regulatory reporting.",
      services: [
        "Book-keeping",
        "Depreciation & Asset Management",
        "Intra-Group Accounting"
      ]
    },
    {
      id: 5,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "Our financial accounting services provide the foundation for sound business decision-making. We maintain accurate books and records, prepare financial statements, and provide insights into your organization's financial performance.",
      services: [
        "C&B Administration",
        "Retirement Administration"
      ]
    },
    {
      id: 6,
      title: "Enterprise Support",
      subtitle: "Agreed-upon Procedures | Corporate Reporting | Statutory Compliance | Payroll Services | Financial Accounting | Clergy Services",
      content: "We understand the unique financial and administrative needs of religious organizations and clergy. Our specialized services address the specific requirements of churches, ministries, and religious institutions while ensuring compliance with applicable regulations.",
      services: [
        "Corporate Tax",
        "Withholding Tax",
        "Payroll & Benefits Compliance"
      ]
    }
  ];

  const currentScreenData = screens[currentScreen];

  return (
    <div id="support-section" className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/es.jpg"
          alt="Enterprise Support Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex flex-col mt-6 justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        <div className="text-right max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full ml-auto">
          
          {/* Fixed Header Section - Title and Subtitle */}
          <div className="h-32 sm:h-36 md:h-40 flex flex-col justify-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-medium text-orange-500 mb-2 flex items-center justify-end gap-2">
              Enterprise Support
              <IconDownload size={24} className="sm:w-8 sm:h-8 text-white bg-gray-500 p-1 sm:p-2 rounded-full" />
            </h1>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              <button 
                onClick={() => onScreenChange?.(1)}
                className={`${currentScreen === 1 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Agreed-upon Procedures
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(2)}
                className={`${currentScreen === 2 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Corporate Reporting
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(3)}
                className={`${currentScreen === 3 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Statutory Compliance
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(4)}
                className={`${currentScreen === 4 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Payroll Services
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(5)}
                className={`${currentScreen === 5 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Financial Accounting
              </button>
              <span className="text-slate-500 inline">|</span>
              <button 
                onClick={() => onScreenChange?.(6)}
                className={`${currentScreen === 6 ? 'text-orange-400 font-semibold' : 'text-orange-200'} hover:text-orange-300 transition-colors duration-200 cursor-pointer`}
              >
                Clergy Services
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

            {/* Additional content for screen 0 */}
            {currentScreenData.content2 && (
              <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                {currentScreenData.content2}
              </p>
            )}

            {/* Services List */}
            {currentScreenData.services && (
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
