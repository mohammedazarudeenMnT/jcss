"use client";

import Endorsement from "@/components/Endorsement/Endorsement";
import Header from "@/components/Header/Header";
import { useGlobalScroll } from "@/components/GlobalScrollProvider";
import ScrollablePageProvider, {
  useScrollablePage,
} from "@/components/ScrollablePageProvider";
import Navigation from '@/components/Header/Navigation';
function EndorsementContent() {
  const { containerRef, handleScroll } = useScrollablePage();

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col bg-[#1d4e77] overflow-y-auto"
      onScroll={handleScroll}
    >
      <Navigation />
      <Header />
      <Endorsement />
    </div>
  );
}

export default function EndorsementPage() {
  return (
    <ScrollablePageProvider>
      <EndorsementContent />
    </ScrollablePageProvider>
  );
}
