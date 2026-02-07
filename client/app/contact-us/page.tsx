"use client";

import Header from "@/components/Header/Header";
import Navigation from "@/components/Header/Navigation";
import ContactUs from "@/components/Contact/ContactUs";
import { useGlobalScroll } from "@/components/GlobalScrollProvider";
import ScrollablePageProvider from "@/components/ScrollablePageProvider";

export default function ContactUsPage() {
  const { currentScreen } = useGlobalScroll();

  return (
    <div className="min-h-screen">
      <ScrollablePageProvider>
        <Header />
        <Navigation />
        <ContactUs />
      </ScrollablePageProvider>
    </div>
  );
}
