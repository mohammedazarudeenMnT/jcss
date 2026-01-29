"use client";

import Header from "@/components/Header/Header";
import Life from "@/components/Life/Life";
import { useGlobalScroll } from "@/components/GlobalScrollProvider";
import Navigation from '@/components/Header/Navigation';
export default function LifePage() {
  const { currentScreen } = useGlobalScroll();
  
  return (
    <>
    <Navigation />
      <Header />
      <Life />
    </>
  );
}
