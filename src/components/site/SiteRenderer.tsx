"use client";

import type { SiteConfig, SiteBlock } from "@/types/site";
import { defaultLayout } from "@/lib/site-defaults";
import SectionWrapper from "./SectionWrapper";

// Site-specific blocks
import SiteNavbarBlock from "./blocks/SiteNavbarBlock";
import SiteHeroBlock from "./blocks/SiteHeroBlock";
import SiteAboutBlock from "./blocks/SiteAboutBlock";
import SiteServicesBlock from "./blocks/SiteServicesBlock";
import SiteContactBlock from "./blocks/SiteContactBlock";
import SiteFooterBlock from "./blocks/SiteFooterBlock";
import SiteFaqBlock from "./blocks/SiteFaqBlock";
import SiteTeamBlock from "./blocks/SiteTeamBlock";
import SiteMapBlock from "./blocks/SiteMapBlock";
import SiteBannerBlock from "./blocks/SiteBannerBlock";
import SiteLogosBlock from "./blocks/SiteLogosBlock";

// Reused proposal blocks
import TextoBlock from "@/components/proposal/blocks/TextoBlock";
import ImagemBlock from "@/components/proposal/blocks/ImagemBlock";
import CardsGridBlock from "@/components/proposal/blocks/CardsGridBlock";
import CtaBlock from "@/components/proposal/blocks/CtaBlock";
import DividerBlock from "@/components/proposal/blocks/DividerBlock";
import GaleriaBlock from "@/components/proposal/blocks/GaleriaBlock";
import DepoimentosBlock from "@/components/proposal/blocks/DepoimentosBlock";
import MarqueeBlock from "@/components/proposal/blocks/MarqueeBlock";
import BackgroundImageBlock from "@/components/proposal/blocks/BackgroundImageBlock";
import SplitContentBlock from "@/components/proposal/blocks/SplitContentBlock";
import VideoBlock from "@/components/proposal/blocks/VideoBlock";
import CounterBlock from "@/components/proposal/blocks/CounterBlock";
import TimelineBlock from "@/components/proposal/blocks/TimelineBlock";
import PricingTableBlock from "@/components/proposal/blocks/PricingTableBlock";
import BeforeAfterBlock from "@/components/proposal/blocks/BeforeAfterBlock";

import type {
  TextoData, ImagemData, CardsGridData, CtaData, DividerData,
  GaleriaData, DepoimentosData, MarqueeData, BackgroundImageData,
  SplitContentData, VideoData, CounterData, TimelineData,
  PricingTableData, BeforeAfterData,
} from "@/types/proposal";

import type {
  SiteNavbarData, SiteHeroData, SiteAboutData, SiteServicesData,
  SiteContactData, SiteFooterData, SiteFaqData, SiteTeamData,
  SiteMapData, SiteBannerData, SiteLogosData,
} from "@/types/site";

interface SiteRendererProps {
  config: SiteConfig;
}

export default function SiteRenderer({ config }: SiteRendererProps) {
  const { theme, blocks } = config;
  const colors = theme.colors || {} as Record<string, string>;
  const themeColors = {
    gold: colors.gold || "#C9A96E",
    goldLight: colors.goldLight || "#D4BA88",
    goldDark: colors.goldDark || "#B8944F",
    background: colors.background || "#FFFFFF",
    foreground: colors.foreground || "#1A1A1A",
    beige: colors.beige || "#F5F0EB",
    nude: colors.nude || "#E8DDD3",
    cream: colors.cream || "#FAF7F4",
  };

  function renderBlock(block: SiteBlock) {
    if (!block.visible) return null;

    const data = block.data;
    const layout = block.layout || defaultLayout;

    switch (block.type) {
      // ── Site-specific blocks ──
      case "site-navbar":
        return <SiteNavbarBlock data={data as unknown as SiteNavbarData} themeColors={themeColors} />;
      case "site-hero":
        return <SiteHeroBlock data={data as unknown as SiteHeroData} themeColors={themeColors} />;
      case "site-about":
        return <SectionWrapper layout={layout} id="sobre"><SiteAboutBlock data={data as unknown as SiteAboutData} themeColors={themeColors} /></SectionWrapper>;
      case "site-services":
        return <SectionWrapper layout={layout} id="servicos"><SiteServicesBlock data={data as unknown as SiteServicesData} themeColors={themeColors} /></SectionWrapper>;
      case "site-contact":
        return <SectionWrapper layout={layout} id="contato"><SiteContactBlock data={data as unknown as SiteContactData} themeColors={themeColors} /></SectionWrapper>;
      case "site-footer":
        return <SectionWrapper layout={layout}><SiteFooterBlock data={data as unknown as SiteFooterData} themeColors={themeColors} /></SectionWrapper>;
      case "site-faq":
        return <SectionWrapper layout={layout}><SiteFaqBlock data={data as unknown as SiteFaqData} themeColors={themeColors} /></SectionWrapper>;
      case "site-team":
        return <SectionWrapper layout={layout}><SiteTeamBlock data={data as unknown as SiteTeamData} themeColors={themeColors} /></SectionWrapper>;
      case "site-map":
        return <SectionWrapper layout={layout}><SiteMapBlock data={data as unknown as SiteMapData} themeColors={themeColors} /></SectionWrapper>;
      case "site-banner":
        return <SiteBannerBlock data={data as unknown as SiteBannerData} themeColors={themeColors} />;
      case "site-logos":
        return <SectionWrapper layout={layout}><SiteLogosBlock data={data as unknown as SiteLogosData} themeColors={themeColors} /></SectionWrapper>;

      // ── Reused proposal blocks ──
      case "texto":
        return <SectionWrapper layout={layout}><TextoBlock config={data as unknown as TextoData} /></SectionWrapper>;
      case "imagem":
        return <SectionWrapper layout={layout}><ImagemBlock config={data as unknown as ImagemData} /></SectionWrapper>;
      case "cards-grid":
        return <SectionWrapper layout={layout}><CardsGridBlock config={data as unknown as CardsGridData} /></SectionWrapper>;
      case "cta":
        return <SectionWrapper layout={layout}><CtaBlock config={data as unknown as CtaData} /></SectionWrapper>;
      case "divider":
        return <SectionWrapper layout={layout}><DividerBlock config={data as unknown as DividerData} /></SectionWrapper>;
      case "galeria":
        return <SectionWrapper layout={layout}><GaleriaBlock config={data as unknown as GaleriaData} /></SectionWrapper>;
      case "depoimentos":
        return <SectionWrapper layout={layout}><DepoimentosBlock config={data as unknown as DepoimentosData} /></SectionWrapper>;
      case "marquee":
        return <MarqueeBlock config={data as unknown as MarqueeData} />;
      case "background-image":
        return <BackgroundImageBlock config={data as unknown as BackgroundImageData} />;
      case "split-content":
        return <SectionWrapper layout={layout}><SplitContentBlock config={data as unknown as SplitContentData} /></SectionWrapper>;
      case "video":
        return <SectionWrapper layout={layout}><VideoBlock config={data as unknown as VideoData} /></SectionWrapper>;
      case "counter":
        return <SectionWrapper layout={layout}><CounterBlock config={data as unknown as CounterData} /></SectionWrapper>;
      case "timeline":
        return <SectionWrapper layout={layout}><TimelineBlock config={data as unknown as TimelineData} /></SectionWrapper>;
      case "pricing-table":
        return <SectionWrapper layout={layout}><PricingTableBlock config={data as unknown as PricingTableData} /></SectionWrapper>;
      case "before-after":
        return <SectionWrapper layout={layout}><BeforeAfterBlock config={data as unknown as BeforeAfterData} /></SectionWrapper>;

      default:
        return null;
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: themeColors.background,
        color: themeColors.foreground,
        fontFamily: theme.fonts?.heading ? `"${theme.fonts.heading}", "${theme.fonts?.body || "Inter"}", sans-serif` : undefined,
      }}
    >
      {blocks.map((block) => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
