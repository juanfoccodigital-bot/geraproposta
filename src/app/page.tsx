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

/* ============================================
   HOME — Marketplace de Templates
   Página pública estilo Designi
   ============================================ */

function HomeContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

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
        maxItems={12}
      />
      <BiolinkTemplatesPreview />
      <SiteTemplatesPreview />
      <PricingSection showHeader showCompareCta />
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
