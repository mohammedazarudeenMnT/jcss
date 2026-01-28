'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconBrandLinkedin } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="bg-[#042d4d] text-white max-h-[420px] overflow-hidden">
      <div className="container mx-auto px-6 py-12">
       

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          
          {/* JCSS Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
            <Image
              src="/svg/logo.svg"
              alt="JCSS Logo"
              width={80}
              height={40}
              className="w-auto h-12"
            />
          </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/crew" className="hover:text-orange-400 transition-colors">Crew</Link></li>
              <li><Link href="/life" className="hover:text-orange-400 transition-colors">Life</Link></li>
              <li><Link href="/experience" className="hover:text-orange-400 transition-colors">Experience</Link></li>
              <li><Link href="/newsletters" className="hover:text-orange-400 transition-colors">Newsletters</Link></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4 flex items-center gap-2">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services?service=Advisory" className="hover:text-orange-400 transition-colors">Corporate Advisory</Link></li>
              <li><Link href="/services?service=Advisory" className="hover:text-orange-400 transition-colors">Business Modelling and Valuation</Link></li>
              <li><Link href="/services?service=Advisory" className="hover:text-orange-400 transition-colors">Due Diligence</Link></li>
              <li><Link href="/services?service=Advisory" className="hover:text-orange-400 transition-colors">Structuring & Restructuring</Link></li>
            </ul>
          </div>

          {/* Audit & Assurance Section */}
          <div className="lg:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4 flex items-center gap-2">
              Audit & Assurance
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services?service=Assurance" className="hover:text-orange-400 transition-colors">Enterprise Risk Management</Link></li>
              <li><Link href="/services?service=Assurance" className="hover:text-orange-400 transition-colors">Corporate Governance</Link></li>
              <li><Link href="/services?service=Assurance" className="hover:text-orange-400 transition-colors">Audit and Attest</Link></li>
              <li><Link href="/services?service=Assurance" className="hover:text-orange-400 transition-colors">Internal Financial Controls</Link></li>
              <li><Link href="/services?service=Assurance" className="hover:text-orange-400 transition-colors">Internal Audits</Link></li>
            </ul>
          </div>

          {/* Enterprise Support Section */}
          <div className="lg:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4 flex items-center gap-2">
              Enterprise Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Agreed-upon Procedures</Link></li>
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Corporate Reporting</Link></li>
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Statutory Compliance</Link></li>
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Payroll Services</Link></li>
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Financial Accounting</Link></li>
              <li><Link href="/services?service=Support" className="hover:text-orange-400 transition-colors">Clergy Services</Link></li>
            </ul>
          </div>

          {/* Tax Section */}
          <div className="lg:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4 flex items-center gap-2">
              Tax
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Indirect Taxes</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>Foreign Trade Policy</li>
                  <li>Customs & International Trade</li>
                  <li>Goods and Service Tax (GST)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Direct Taxes</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>International Taxation</li>
                  <li>Transfer Pricing</li>
                  <li>Litigation</li>
                  <li>Expatriate Taxation</li>
                  <li>Advisory Services</li>
                  <li>Corporate Taxes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="lg:col-span-1">
            <h3 className="text-orange-500 font-semibold mb-4 flex items-center gap-2">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services?service=Legal" className="hover:text-orange-400 transition-colors">Litigation</Link></li>
              <li><Link href="/services?service=Legal" className="hover:text-orange-400 transition-colors">Litigation Support</Link></li>
              <li><Link href="/services?service=Legal" className="hover:text-orange-400 transition-colors">Commercial Agreements</Link></li>
              <li><Link href="/services?service=Legal" className="hover:text-orange-400 transition-colors">Legal Due Diligence</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left Side - Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policies & Cookies</Link>
              <span className="text-gray-600">|</span>
              <Link href="/legal" className="hover:text-orange-400 transition-colors">Legal</Link>
              <span className="text-gray-600">|</span>
              <span>All Content Copyright 2021</span>
              <span className="text-gray-600">|</span>
              <span>All Rights Reserved</span>
              <span className="text-gray-600">|</span>
              <Link href="/sitemap" className="hover:text-orange-400 transition-colors">Sitemap</Link>
            </div>

            {/* Right Side - Social Media */}
            <div className="flex items-center gap-4">
              <Link 
                href="https://linkedin.com/company/jcss" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-4 h-4 **:text-white hover:text-orange-400 transition-colors"
              >
                <IconBrandLinkedin size={32} className='bg-blue-500 p-2 rounded-full' />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}