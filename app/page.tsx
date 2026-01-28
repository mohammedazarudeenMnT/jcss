'use client';

import { useState, useEffect } from 'react';
import HomeScreens from '@/components/Home/HomeScreens';
import Navigation from '@/components/Header/Navigation';
import Header from '@/components/Header/Header';
import { useGlobalScroll } from '@/components/GlobalScrollProvider';

export default function Home() {
  const { currentScreen, setCurrentScreen, isTransitioning } = useGlobalScroll();
  const homeScreens = 4;

  const handleScreenChange = (newScreen: number) => {
    if (newScreen < 0 || newScreen >= homeScreens || isTransitioning) return;
    setCurrentScreen(newScreen);
  };

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header - Show on all home screens */}
      <Header/>

      {/* Navigation Component - Always visible */}
      <Navigation />

      {/* Home Screens Section - Full Screen */}
      <HomeScreens 
        currentScreen={currentScreen} 
        onScreenChange={handleScreenChange}
        isTransitioning={isTransitioning}
      />
    </div>
  );
}
