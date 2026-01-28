'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useGlobalScroll } from './GlobalScrollProvider';

interface ScrollablePageContextType {
  isAtBottom: boolean;
  isAtTop: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollablePageContext = createContext<ScrollablePageContextType | undefined>(undefined);

export const useScrollablePage = () => {
  const context = useContext(ScrollablePageContext);
  if (!context) {
    throw new Error('useScrollablePage must be used within a ScrollablePageProvider');
  }
  return context;
};

interface ScrollablePageProviderProps {
  children: ReactNode;
  onScrollToBottom?: () => void;
  onScrollToTop?: () => void;
}

export default function ScrollablePageProvider({ 
  children, 
  onScrollToBottom, 
  onScrollToTop 
}: ScrollablePageProviderProps) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTimeRef = useRef(0);
  const { handleGlobalScroll, isTransitioning } = useGlobalScroll();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position helper
  const checkScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return { atTop: true, atBottom: false, hasScroll: false };

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 10;
    const hasScroll = scrollHeight > clientHeight + threshold;
    const atTop = scrollTop <= threshold;
    const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;

    return { atTop, atBottom, hasScroll };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    const threshold = 10;
    const atTop = scrollTop <= threshold;
    const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    
    setIsAtTop(atTop);
    setIsAtBottom(atBottom);
    
    if (atBottom && onScrollToBottom) {
      onScrollToBottom();
    }
    
    if (atTop && onScrollToTop) {
      onScrollToTop();
    }
  };

  // Handle wheel events for this scrollable page
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      const { atTop, atBottom, hasScroll } = checkScrollPosition();
      const now = Date.now();
      const navigationDelay = 800;

      if (e.deltaY > 0) {
        // Scrolling down
        if (!hasScroll || atBottom) {
          // No scrollable content OR at bottom - navigate to next page
          if (now - lastScrollTimeRef.current >= navigationDelay) {
            e.preventDefault();
            lastScrollTimeRef.current = now;
            handleGlobalScroll('down');
          } else {
            e.preventDefault();
          }
        }
        // Otherwise, let the container scroll naturally (don't prevent default)
      } else {
        // Scrolling up
        if (!hasScroll || atTop) {
          // No scrollable content OR at top - navigate to previous page
          if (now - lastScrollTimeRef.current >= navigationDelay) {
            e.preventDefault();
            lastScrollTimeRef.current = now;
            handleGlobalScroll('up');
          } else {
            e.preventDefault();
          }
        }
        // Otherwise, let the container scroll naturally (don't prevent default)
      }
    };

    // Attach to window to capture all wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile, isTransitioning, handleGlobalScroll, checkScrollPosition]);

  const contextValue: ScrollablePageContextType = {
    isAtBottom,
    isAtTop,
    handleScroll,
    containerRef,
  };

  return (
    <ScrollablePageContext.Provider value={contextValue}>
      {children}
    </ScrollablePageContext.Provider>
  );
}