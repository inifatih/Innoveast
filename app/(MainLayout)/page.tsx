"use client";

import About from "@/components/About";
import { CarouselComponent } from "@/components/Carousel";
import InnovationSection from "@/components/InnovationSection";
import NewsSection from "@/components/NewsSection";

// LANDING PAGE FOR ALL ROLES
export default function HomePage() {
  return (
    <main className="flex-1 min-h-screen">
      <CarouselComponent />
      <About />
      <InnovationSection />
      <NewsSection />
    </main>
  );
}