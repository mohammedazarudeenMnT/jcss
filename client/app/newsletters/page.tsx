'use client';

import Newsletters from '@/components/Newsletters/Newsletters';
import Header from '@/components/Header/Header';
import { useGlobalScroll } from '@/components/GlobalScrollProvider';
import Navigation from '@/components/Header/Navigation';
export default function NewslettersPage() {
  const { currentScreen } = useGlobalScroll();
  
  return (
    <div className="min-h-screen bg-[#1d4e77]">
      <Navigation />
      <Header />
      <Newsletters />
    </div>
  );
}