'use client';

import Header from '@/components/Header/Header';
import Navigation from '@/components/Header/Navigation';
import ContactUs from '@/components/Contact/ContactUs';
import { useGlobalScroll } from '@/components/GlobalScrollProvider';

export default function ContactUsPage() {
  const { currentScreen } = useGlobalScroll();
  
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      <ContactUs />
    </div>
  );
}