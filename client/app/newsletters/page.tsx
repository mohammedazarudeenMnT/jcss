import type { Metadata } from "next";
import Newsletters from "@/components/Newsletters/Newsletters";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Header/Navigation";

export const metadata: Metadata = {
  title: "Newsletter Archive",
  description:
    "Explore our full archive of newsletters, featuring expert insights on global regulatory changes, compliance updates, and business strategy.",
};

export default function NewslettersPage() {
  return (
    <main className="min-h-screen bg-[#1d4e77]">
      <Navigation />
      <Header />
      <Newsletters />
    </main>
  );
}
