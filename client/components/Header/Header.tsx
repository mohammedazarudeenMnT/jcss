"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconX } from "@tabler/icons-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isTaxDropdownOpen, setIsTaxDropdownOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    "Home",
    "Services",
    "Crew",
    "Life",
    "Experience",
    // "Endorsement",
    "Newsletters",
    "Contact Us",
    "JCSS Advisory",
    "JCSS Law",
  ];

  const serviceItems = [
    "Advisory",
    "Support",
    "Assurance",
    "Tax ",
    "Legal",
    "Fractional CFO",
  ];

  const taxServices = ["Direct Tax", "Indirect Tax"];

  // Pages that should always have the dark background
  const darkBackgroundPages = [
    "/case-studies",
    "/testimonials",
    "/experience",
    "/endorsement",
    "/newsletters",
    "/contact-us",
  ];
  const shouldHaveDarkBackground =
    darkBackgroundPages.includes(pathname) ||
    pathname.startsWith("/newsletters/");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for custom header background from CSS custom property
  const [customHeaderBg, setCustomHeaderBg] = useState<string | null>(null);
  
  useEffect(() => {
    const checkCustomBg = () => {
      const crewHeaderBg = getComputedStyle(document.documentElement).getPropertyValue('--crew-header-bg').trim();
      setCustomHeaderBg(crewHeaderBg || null);
    };

    // Check initially
    checkCustomBg();

    // Set up a MutationObserver to watch for style changes
    const observer = new MutationObserver(checkCustomBg);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsServicesDropdownOpen(false);
    setIsTaxDropdownOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
    setIsTaxDropdownOpen(false);
  };

  const toggleTaxDropdown = () => {
    setIsTaxDropdownOpen(!isTaxDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsTaxDropdownOpen(false);
  };

  /*
   * HEADER LAYOUT STRUCTURE:
   * - DESKTOP VIEW (hidden xl:flex): Horizontal navigation bar with Services dropdown & external links
   * - MOBILE VIEW (xl:hidden): Hamburger menu button + Sidebar overlay with collapsible navigation
   * Responsive breakpoint: xl = 1280px. Uses Tailwind's conditional rendering for each view.
   */
  return (
    <header
      className={`fixed top-0 left-0 right-0 md:right-13 z-50 transition-all duration-300`}
      style={{
        backgroundColor: customHeaderBg || (shouldHaveDarkBackground || isScrolled ? '#042d4d' : 'transparent'),
        boxShadow: (customHeaderBg && customHeaderBg !== 'transparent') || shouldHaveDarkBackground || isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Left Corner */}
        <div className="logo-container flex flex-col items-end">
          <div className="mb-1">
            <Image
              src="/svg/logo.svg"
              alt="JCSS Logo"
              width={120}
              height={60}
              className="w-auto h-16 rounded-sm"
              priority
            />
          </div>
        </div>

        {/* Right Side Container - Navigation */}
        <div className="flex items-center gap-8">
          {/* Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item, index) => {
              const isHome = item === "Home";
              const isServices = item === "Services";
              const isExternalLink = item === "JCSS Advisory" || item === "JCSS Law";
              
              const getHref = (itemName: string) => {
                if (itemName === "Crew") return "/crew";
                if (itemName === "Life") return "/life";
                if (itemName === "Experience") return "/experience";
                if (itemName === "Endorsement") return "/endorsement";
                if (itemName === "JCSS Advisory") return "https://www.jcssadvisory.com/";
                if (itemName === "JCSS Law") return "https://jcsslaw.com/home/";
                return `/${itemName.toLowerCase().replace(" ", "-")}`;
              };
              const href = isHome
                ? "/"
                : isServices
                ? "/services"
                : getHref(item);
              const isActive = pathname === href;

              return (
                <div key={item} className="flex items-center gap-6">
                  {isExternalLink ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-item relative text-lg font-medium transition-all duration-300 hover:text-orange-500 bg-white/30 border-2 border-white p-2 text-white
                       rounded-full"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {item}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`nav-item relative text-lg font-medium transition-all duration-300 hover:text-orange-500 ${
                        isActive ? "text-orange-500" : "text-white"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {item}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white mobile-menu-button z-50 relative"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <IconX className="w-6 h-6" />
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`xl:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        ></div>

        {/* Sidebar */}
        <div
          className={`mobile-menu absolute right-0 top-0 h-full w-80 bg-orange-400 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between bg-[#042d4d] p-6 border-b border-white/30">
            <Image
              src="/svg/logo.svg"
              alt="JCSS Logo"
              width={120}
              height={60}
              className="w-auto h-10 rounded-sm"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="py-6">
            {navItems.map((item, index) => {
              const isHome = item === "Home";
              const isServices = item === "Services";
              const isExternalLink = item === "JCSS Advisory" || item === "JCSS Law";
              
              const getHref = (itemName: string) => {
                if (itemName === "Crew") return "/crew";
                if (itemName === "Life") return "/life";
                if (itemName === "Experience") return "/experience";
                if (itemName === "Endorsement") return "/endorsement";
                if (itemName === "JCSS Advisory") return "https://www.jcssadvisory.com/";
                if (itemName === "JCSS Law") return "https://jcsslaw.com/home/";
                return `/${itemName.toLowerCase().replace(" ", "-")}`;
              };
              const href = isHome
                ? "/"
                : isServices
                ? "/services"
                : getHref(item);
              const isLastItem = index === navItems.length - 1;

              if (isServices) {
                return (
                  <div
                    key={item}
                    className={`px-6 ${
                      !isLastItem ? "border-b border-white/30" : ""
                    }`}
                  >
                    <button
                      onClick={toggleServicesDropdown}
                      className="w-full flex items-center justify-between py-3 text-white hover:text-gray-200 transition-colors text-lg font-medium"
                    >
                      <span>Services</span>
                      <IconChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isServicesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Services Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isServicesDropdownOpen
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 py-2 space-y-2">
                        {serviceItems.map((service, serviceIndex) => {
                          if (service === "Tax Services") {
                            return (
                              <div
                                key={service}
                                className={`${
                                  serviceIndex !== serviceItems.length - 1
                                    ? "border-b border-white/20 pb-2"
                                    : ""
                                }`}
                              >
                                <button
                                  onClick={toggleTaxDropdown}
                                  className="w-full flex items-center justify-between py-2 text-white hover:text-gray-200 transition-colors text-base"
                                >
                                  <span>{service}</span>
                                  <IconChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                      isTaxDropdownOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {/* Tax Services Sub-dropdown */}
                                <div
                                  className={`overflow-hidden transition-all duration-300 ${
                                    isTaxDropdownOpen
                                      ? "max-h-32 opacity-100"
                                      : "max-h-0 opacity-0"
                                  }`}
                                >
                                  <div className="pl-4 py-1 space-y-1">
                                    {taxServices.map((taxService, taxIndex) => (
                                      <Link
                                        key={taxService}
                                        href="/services?service=Tax"
                                        onClick={closeMobileMenu}
                                        className={`block py-1 text-white/80 hover:text-white transition-colors text-sm ${
                                          taxIndex !== taxServices.length - 1
                                            ? "border-b border-white/10 pb-1"
                                            : ""
                                        }`}
                                      >
                                        {taxService}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Map service names to URL parameters
                          const getServiceParam = (serviceName: string) => {
                            switch (serviceName) {
                              case "Audit & Assurance":
                                return "Assurance";
                              case "Corporate Advisory":
                                return "Advisory";
                              case "Legal Services":
                                return "Legal";
                              case "Enterprise Support":
                                return "Support";
                              default:
                                return serviceName;
                            }
                          };

                          return (
                            <Link
                              key={service}
                              href={`/services?service=${getServiceParam(
                                service
                              )}`}
                              onClick={closeMobileMenu}
                              className={`block py-2 text-white hover:text-gray-200 transition-colors text-base ${
                                serviceIndex !== serviceItems.length - 1
                                  ? "border-b border-white/20 pb-2"
                                  : ""
                              }`}
                            >
                              {service}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === href;

              return (
                <div key={item}>
                  {isExternalLink ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className={`block px-6 py-3 transition-colors text-lg font-medium hover:bg-white/10 text-white hover:text-gray-200 ${
                        !isLastItem ? "border-b border-white/30" : ""
                      }`}
                    >
                      {item}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className={`block px-6 py-3 transition-colors text-lg font-medium hover:bg-white/10 ${
                        isActive
                          ? "text-orange-500 bg-white/10"
                          : "text-white hover:text-gray-200"
                      } ${!isLastItem ? "border-b border-white/30" : ""}`}
                    >
                      {item}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
