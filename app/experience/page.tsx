'use client';

import Header from '@/components/Header/Header';
import Navigation from '@/components/Header/Navigation';
import Experience from '@/components/Experience/Experience';
import { useGlobalScroll } from '@/components/GlobalScrollProvider';
import ScrollablePageProvider, { useScrollablePage } from '@/components/ScrollablePageProvider';

function ExperienceContent() {
  const { containerRef, handleScroll } = useScrollablePage();
  
  return (
    <div 
      ref={containerRef}
      className="h-screen bg-[#1d4e77] overflow-y-auto"
      onScroll={handleScroll}
    >
      <Navigation />
      <Header />
      <Experience />
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <ScrollablePageProvider>
      <ExperienceContent />
    </ScrollablePageProvider>
  );
}