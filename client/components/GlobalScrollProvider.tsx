"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface GlobalScrollContextType {
  currentPageIndex: number;
  currentScreen: number;
  isTransitioning: boolean;
  totalScreens: number;
  handleGlobalScroll: (direction: "up" | "down") => void;
  setCurrentScreen: (screen: number) => void;
  navigateToPage: (pageIndex: number, screen?: number) => void;
}

const GlobalScrollContext = createContext<GlobalScrollContextType | undefined>(
  undefined
);

export const useGlobalScroll = () => {
  const context = useContext(GlobalScrollContext);
  if (!context) {
    throw new Error(
      "useGlobalScroll must be used within a GlobalScrollProvider"
    );
  }
  return context;
};

interface PageConfig {
  path: string;
  name: string;
  screens: number;
}

const PAGE_CONFIGS: PageConfig[] = [
  { path: "/", name: "Home", screens: 4 },
  { path: "/services", name: "Services", screens: 6 }, // Updated to 6 services: Advisory, Assurance, Support, Tax, Legal, FractionalCFO
  { path: "/crew", name: "Crew", screens: 1 },
  { path: "/life", name: "Life", screens: 1 },
  { path: "/experience", name: "Experience", screens: 1 },
  { path: "/endorsement", name: "Endorsement", screens: 1 },
  { path: "/newsletters", name: "Newsletters", screens: 1 },
  { path: "/contact-us", name: "Contact Us", screens: 1 },
];

// Pages that should handle their own scrolling
const SCROLLABLE_PAGES = [
  "/crew",
  "/experience",
  "/endorsement",
  "/contact-us",
];

// Check if a path should be scrollable (includes dynamic routes)
const isScrollablePath = (path: string): boolean => {
  if (SCROLLABLE_PAGES.includes(path)) return true;
  // Newsletter detail pages (e.g., /newsletters/december-2025)
  if (path.startsWith("/newsletters/")) return true;
  return false;
};

interface GlobalScrollProviderProps {
  children: ReactNode;
}

export default function GlobalScrollProvider({
  children,
}: GlobalScrollProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate total screens across all pages
  const totalScreens = PAGE_CONFIGS.reduce(
    (sum, page) => sum + page.screens,
    0
  );

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update current page index based on pathname
  useEffect(() => {
    const pageIndex = PAGE_CONFIGS.findIndex((page) => page.path === pathname);
    if (pageIndex !== -1) {
      setCurrentPageIndex(pageIndex);
      // Reset to first screen when navigating to a new page
      if (pageIndex !== currentPageIndex) {
        setCurrentScreen(0);
      }
    }
  }, [pathname]);

  const navigateToPage = (pageIndex: number, screen: number = 0) => {
    if (pageIndex < 0 || pageIndex >= PAGE_CONFIGS.length) return;

    const targetPage = PAGE_CONFIGS[pageIndex];
    setCurrentPageIndex(pageIndex);
    setCurrentScreen(screen);
    router.push(targetPage.path);
  };

  const handleGlobalScroll = (direction: "up" | "down") => {
    if (isTransitioning || isMobile) return;

    setIsTransitioning(true);

    const currentPage = PAGE_CONFIGS[currentPageIndex];

    if (direction === "down") {
      // Check if we can scroll within current page
      if (currentScreen < currentPage.screens - 1) {
        setCurrentScreen(currentScreen + 1);
      } else {
        // Move to next page
        if (currentPageIndex < PAGE_CONFIGS.length - 1) {
          navigateToPage(currentPageIndex + 1, 0);
        }
      }
    } else {
      // Check if we can scroll within current page
      if (currentScreen > 0) {
        setCurrentScreen(currentScreen - 1);
      } else {
        // Move to previous page (last screen)
        if (currentPageIndex > 0) {
          const prevPageIndex = currentPageIndex - 1;
          const prevPage = PAGE_CONFIGS[prevPageIndex];
          navigateToPage(prevPageIndex, prevPage.screens - 1);
        }
      }
    }

    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Global scroll handler
  useEffect(() => {
    if (isMobile) return; // Disable on mobile

    // Check if current page should handle its own scrolling
    const isScrollablePage = isScrollablePath(pathname);
    if (isScrollablePage) return; // Let the page handle its own scrolling

    let lastScrollTime = 0;
    const scrollDelay = 1000;

    const handleWheel = (e: WheelEvent) => {
      // Check if scroll is inside chat widget or any scrollable container
      const target = e.target as HTMLElement;
      const isInsideChatWidget = target.closest('[class*="jcss-chat"], [id*="jcss-chat"], iframe, [class*="chat"], [data-chat-widget]');
      
      // Don't prevent default if scrolling inside chat widget
      if (isInsideChatWidget) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < scrollDelay || isTransitioning) return;

      lastScrollTime = now;

      if (e.deltaY > 0) {
        handleGlobalScroll("down");
      } else {
        handleGlobalScroll("up");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          handleGlobalScroll("down");
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          handleGlobalScroll("up");
          break;
        case "Home":
          e.preventDefault();
          navigateToPage(0, 0);
          break;
        case "End":
          e.preventDefault();
          navigateToPage(PAGE_CONFIGS.length - 1, 0);
          break;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPageIndex, currentScreen, isTransitioning, isMobile, pathname]);

  const contextValue: GlobalScrollContextType = {
    currentPageIndex,
    currentScreen,
    isTransitioning,
    totalScreens,
    handleGlobalScroll,
    setCurrentScreen,
    navigateToPage,
  };

  return (
    <GlobalScrollContext.Provider value={contextValue}>
      {children}
    </GlobalScrollContext.Provider>
  );
}
