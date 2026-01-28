'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, Suspense } from 'react';

const serviceItems = [
  'Advisory',
  'Assurance',
  'Support',
  'Tax',
  'Legal',
  'FractionalCFO',
  'Contact Us'
];

// Map service items to their corresponding pages
const servicePageMap: { [key: string]: string } = {
  'Advisory': '/services?service=Advisory',
  'Assurance': '/services?service=Assurance',
  'Support': '/services?service=Support',
  'Tax': '/services?service=Tax',
  'Legal': '/services?service=Legal',
  'FractionalCFO': '/services?service=FractionalCFO',
  'Contact Us': '/contact-us'
};

// Map service items to their section IDs for scroll detection
const serviceSectionMap: { [key: string]: string } = {
  'Advisory': 'advisory-section',
  'Assurance': 'assurance-section',
  'Support': 'support-section',
  'Tax': 'tax-section',
  'Legal': 'legal-section',
  'FractionalCFO': 'fractional-cfo-section',
  'Contact Us': 'contact-section'
};

interface NavigationProps {
  activeService?: string;
  onServiceChange?: (service: string) => void;
}

function NavigationContent({ activeService, onServiceChange }: NavigationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentActiveService, setCurrentActiveService] = useState<string>('');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Scroll-based section detection using Intersection Observer
  useEffect(() => {
    // Only enable scroll detection on services page
    if (pathname !== '/services') return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Trigger when section is 10% visible
      threshold: 0.5
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const serviceName = Object.keys(serviceSectionMap).find(
          key => serviceSectionMap[key] === sectionId
        );

        if (serviceName) {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(serviceName);
            } else {
              newSet.delete(serviceName);
            }
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Wait for DOM to be ready, then observe sections
    const observeSections = () => {
      Object.values(serviceSectionMap).forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Try to observe immediately, then retry after a delay
    observeSections();
    const timeoutId = setTimeout(observeSections, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Determine active service based on scroll position, URL, or props
  useEffect(() => {
    if (pathname === '/services') {
      // On services page, prioritize activeService prop (from parent component)
      if (activeService && serviceItems.includes(activeService)) {
        setCurrentActiveService(activeService);
        return;
      }
      
      // Fallback to scroll-based detection if available
      if (visibleSections.size > 0) {
        const firstVisible = serviceItems.find(service => visibleSections.has(service));
        if (firstVisible) {
          setCurrentActiveService(firstVisible);
          return;
        }
      }
      
      // Final fallback to URL parameter
      const serviceParam = searchParams.get('service');
      if (serviceParam && serviceItems.includes(serviceParam)) {
        setCurrentActiveService(serviceParam);
      } else {
        setCurrentActiveService('Advisory'); // Default
      }
    } else if (pathname === '/contact-us') {
      setCurrentActiveService('Contact Us');
    } else {
      setCurrentActiveService('');
    }
  }, [pathname, searchParams, activeService, visibleSections]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleServiceClick = (service: string) => {
    const targetUrl = servicePageMap[service];
    const sectionId = serviceSectionMap[service];
    
    if (service === 'Contact Us') {
      // Navigate to contact us page
      router.push('/contact-us');
    } else if (pathname === '/services') {
      // If on services page, scroll to section or use callback
      if (sectionId) {
        scrollToSection(sectionId);
      }
      if (onServiceChange) {
        onServiceChange(service);
      }
    } else {
      // If on other pages, navigate to the target URL
      router.push(targetUrl);
    }
  };
  return (
    <>
      {/* Desktop & Laptop - Right Side Vertical Service Menu */}
      <div className="hidden md:flex fixed right-2 md:right-3 lg:right-4 xl:right-5 top-0 min-h-screen z-40 flex-col justify-center space-y-1 md:space-y-1.5 lg:space-y-2">
        {serviceItems.map((service, index) => {
          const isActive = currentActiveService === service;
          return (
            <button
              key={service}
              onClick={() => handleServiceClick(service)}
              className={`service-tab group relative text-white py-2 md:py-2.5 lg:py-3 xl:py-4 px-1.5 md:px-2 lg:px-2.5 xl:px-3 text-xs md:text-xs lg:text-sm rounded-r-xl md:rounded-r-xl lg:rounded-r-2xl font-medium transition-all duration-500 hover:px-2 md:hover:px-2.5 lg:hover:px-3 xl:hover:px-3.5 ${
                isActive 
                  ? 'bg-orange-500 hover:bg-orange-600 px-2 md:px-2.5 lg:px-3 xl:px-3.5 shadow-lg shadow-orange-500/30' 
                  : 'bg-slate-700/80 hover:bg-slate-600'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              title={service}
            >
              <span className={`block writing-mode-vertical transform transition-all duration-300 group-hover:scale-105 tracking-tight md:tracking-wide ${
                isActive ? 'scale-105 font-semibold' : ''
              }`}>
                {service}
              </span>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 md:h-5 lg:h-6 bg-white rounded-r-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tablet - Horizontal Menu at Bottom */}
      {/* <div className="hidden md:flex lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {serviceItems.map((service, index) => (
            <button
              key={service}
              className="service-tab group relative text-white py-2 px-3 text-sm rounded-full font-medium transition-all duration-500 whitespace-nowrap bg-slate-700/80 hover:bg-slate-600"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="transform transition-all duration-300 group-hover:scale-105">
                {service}
              </span>
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default function Navigation(props: NavigationProps) {
  return (
    <Suspense fallback={<div className="hidden md:flex fixed right-3 xl:right-5 top-0 min-h-screen z-40 flex-col justify-center space-y-1">
      <div className="animate-pulse bg-slate-700/80 py-4 xl:py-6 px-2 xl:px-2.5 text-xs xl:text-sm rounded-r-2xl">
        <div className="w-16 h-4 bg-slate-600 rounded"></div>
      </div>
    </div>}>
      <NavigationContent {...props} />
    </Suspense>
  );
}