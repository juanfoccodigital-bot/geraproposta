"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TemplatesPreview from "@/components/landing/TemplatesPreview";
import ProductsShowcase from "@/components/landing/ProductsShowcase";
import BiolinkTemplatesPreview from "@/components/landing/BiolinkTemplatesPreview";
import SiteTemplatesPreview from "@/components/landing/SiteTemplatesPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import ProofOfImpact from "@/components/landing/ProofOfImpact";
import CtaSection from "@/components/landing/CtaSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import LazySection from "@/components/ui/LazySection";

/* ============================================
   HOME — Marketplace de Templates
   Página pública estilo Designi
   ============================================ */

function HomeContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Read category from URL param (e.g. /?category=social-media)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryFilter = (cat: string) => {
    setActiveCategory(cat);
    document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ background: "#0A0A0A" }}>
      <Navbar
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        activeCategory={activeCategory}
        onCategoryFilter={handleCategoryFilter}
      />
      <HeroSection />
      <HowItWorks />
      <ProductsShowcase />
      <ProofOfImpact />
      <TemplatesPreview
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        maxItems={isMobile ? 6 : 12}
      />
      <LazySection rootMargin="300px" minHeight={400}>
        <BiolinkTemplatesPreview />
      </LazySection>
      <LazySection rootMargin="300px" minHeight={400}>
        <SiteTemplatesPreview />
      </LazySection>
      <LazySection rootMargin="200px" minHeight={300}>
        <PricingSection showHeader showCompareCta />
      </LazySection>
      <CtaSection />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
