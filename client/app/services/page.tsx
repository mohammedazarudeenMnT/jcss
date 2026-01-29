"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CorporateAdvisory from "@/components/services/CorporateAdvisory";
import AuditAssurance from "@/components/services/AuditAssurance";
import EnterpriseSupport from "@/components/services/EnterpriseSupport";
import Tax from "@/components/services/Tax";
import Legal from "@/components/services/Legal";
import FractionalCFO from "@/components/services/FractionalCFO";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Header/Navigation";
import { useGlobalScroll } from "@/components/GlobalScrollProvider";

function ServicesContent() {
  const searchParams = useSearchParams();
  const { currentScreen, setCurrentScreen, isTransitioning } =
    useGlobalScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(0);
  const [desktopSubScreen, setDesktopSubScreen] = useState(0);

  const servicesRef = useRef<HTMLDivElement>(null);

  // Service order for the 6 screens
  const serviceOrder = [
    "Advisory",
    "Assurance",
    "Support",
    "Tax",
    "Legal",
    "FractionalCFO",
  ];

  // Get current service based on current screen (0-5)
  const activeService = serviceOrder[currentScreen] || "Advisory";

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle URL parameters for service navigation
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && serviceOrder.includes(serviceParam)) {
      const newServiceIndex = serviceOrder.indexOf(serviceParam);
      setCurrentScreen(newServiceIndex);
      setMobileScreen(0);
    }
  }, [searchParams, setCurrentScreen]);

  // Handle mobile screen changes
  const handleMobileScreenChange = (screen: number) => {
    setMobileScreen(screen);
  };

  // Handle desktop sub-screen changes
  const handleDesktopSubScreenChange = (screen: number) => {
    setDesktopSubScreen(screen);
  };

  // Reset mobile screens when service changes
  useEffect(() => {
    setMobileScreen(0);
  }, [activeService]);

  // Reset desktop sub-screens when service changes
  useEffect(() => {
    setDesktopSubScreen(0);
  }, [activeService]);

  if (isMobile) {
    // Mobile Layout - Simple scrollable sections
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <Header />
        <Navigation
          activeService={activeService}
          onServiceChange={(service) => {
            const serviceIndex = serviceOrder.indexOf(service);
            if (serviceIndex !== -1) {
              setCurrentScreen(serviceIndex);
            }
            setMobileScreen(0);
          }}
        />
        {/* Mobile Service Navigation */}
        <div className="pt-20 pb-6 px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-gray-300 text-base">
              Comprehensive solutions for your business needs
            </p>
          </div>

          {/* Service Selection Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {serviceOrder.map((service, index) => (
              <button
                key={service}
                onClick={() => setCurrentScreen(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeService === service
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Service Content */}
        <div className="px-4 pb-20">
          {activeService === "Advisory" && (
            <CorporateAdvisory
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
          {activeService === "Assurance" && (
            <AuditAssurance
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
          {activeService === "Support" && (
            <EnterpriseSupport
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
          {activeService === "Tax" && (
            <Tax
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
          {activeService === "Legal" && (
            <Legal
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
          {activeService === "FractionalCFO" && (
            <FractionalCFO
              currentScreen={mobileScreen}
              onScreenChange={handleMobileScreenChange}
            />
          )}
        </div>

        {/* Mobile Floating Action Button */}
        {/* <button className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center w-16 h-16">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button> */}
      </div>
    );
  }

  // Desktop Layout - Global scroll controlled
  return (
    <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <Navigation
        activeService={activeService}
        onServiceChange={(service) => {
          const serviceIndex = serviceOrder.indexOf(service);
          if (serviceIndex !== -1) {
            setCurrentScreen(serviceIndex);
          }
        }}
      />
      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Services Section */}
        <div ref={servicesRef} className="relative min-h-screen">
          <main className="relative">
            {activeService === "Advisory" && (
              <CorporateAdvisory
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
            {activeService === "Assurance" && (
              <AuditAssurance
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
            {activeService === "Support" && (
              <EnterpriseSupport
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
            {activeService === "Tax" && (
              <Tax
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
            {activeService === "Legal" && (
              <Legal
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
            {activeService === "FractionalCFO" && (
              <FractionalCFO
                currentScreen={desktopSubScreen}
                onScreenChange={handleDesktopSubScreenChange}
              />
            )}
          </main>
        </div>

        {/* Desktop Floating Action Button */}
        {/* <button className="fixed bottom-8 right-32 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center w-24 h-24 animate-pulse-slow">
        <div className="flex flex-col items-center">
          <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs font-semibold">Let&apos;s Talk</span>
        </div>
      </button> */}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Services...</p>
          </div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
