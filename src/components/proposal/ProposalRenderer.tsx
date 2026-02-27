"use client";

import {
  ProposalConfig,
  BlockType,
  HeroConfig,
  DiagnosticoConfig,
  EstrategiaConfig,
  DiferenciaisConfig,
  InvestimentoConfig,
  VisaoConfig,
  TextoData,
  ImagemData,
  CardsGridData,
  CtaData,
  DividerData,
  GaleriaData,
  DepoimentosData,
} from "@/types/proposal";
import { migrateConfig } from "@/lib/migrate-config";
import ThemeInjector from "./ThemeInjector";
import HeroSection from "./sections/HeroSection";
import DiagnosticoSection from "./sections/DiagnosticoSection";
import EstrategiaSection from "./sections/EstrategiaSection";
import DiferenciaisSection from "./sections/DiferenciaisSection";
import InvestimentoSection from "./sections/InvestimentoSection";
import VisaoSection from "./sections/VisaoSection";
import TextoBlock from "./blocks/TextoBlock";
import ImagemBlock from "./blocks/ImagemBlock";
import CardsGridBlock from "./blocks/CardsGridBlock";
import CtaBlock from "./blocks/CtaBlock";
import DividerBlock from "./blocks/DividerBlock";
import GaleriaBlock from "./blocks/GaleriaBlock";
import DepoimentosBlock from "./blocks/DepoimentosBlock";
import MarqueeBlock from "./blocks/MarqueeBlock";
import BackgroundImageBlock from "./blocks/BackgroundImageBlock";
import SplitContentBlock from "./blocks/SplitContentBlock";
import VideoBlock from "./blocks/VideoBlock";
import CounterBlock from "./blocks/CounterBlock";
import TimelineBlock from "./blocks/TimelineBlock";
import PricingTableBlock from "./blocks/PricingTableBlock";
import BeforeAfterBlock from "./blocks/BeforeAfterBlock";

/* ============================================
   PROPOSAL RENDERER V2
   Renderiza blocos (V2) ou seções (V1 migrado)
   ============================================ */

/* eslint-disable @typescript-eslint/no-explicit-any */
const blockComponents: Record<BlockType, React.ComponentType<{ config: any; meta?: any }>> = {
  hero: HeroSection,
  diagnostico: DiagnosticoSection,
  estrategia: EstrategiaSection,
  diferenciais: DiferenciaisSection,
  investimento: InvestimentoSection,
  visao: VisaoSection,
  texto: TextoBlock,
  imagem: ImagemBlock,
  "cards-grid": CardsGridBlock,
  cta: CtaBlock,
  divider: DividerBlock,
  galeria: GaleriaBlock,
  depoimentos: DepoimentosBlock,
  marquee: MarqueeBlock,
  "background-image": BackgroundImageBlock,
  "split-content": SplitContentBlock,
  video: VideoBlock,
  counter: CounterBlock,
  timeline: TimelineBlock,
  "pricing-table": PricingTableBlock,
  "before-after": BeforeAfterBlock,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface ProposalRendererProps {
  config: ProposalConfig;
  targetRef?: React.RefObject<HTMLElement | null>;
}

export default function ProposalRenderer({ config: rawConfig, targetRef }: ProposalRendererProps) {
  const config = migrateConfig(rawConfig);
  const blocks = config.blocks || [];

  return (
    <>
      <ThemeInjector theme={config.theme} targetRef={targetRef} />
      <main
        style={{
          fontFamily: `"${config.theme.fonts.body}", sans-serif`,
          background: config.theme.colors.background,
          color: config.theme.colors.foreground,
        }}
      >
        {blocks
          .filter((b) => b.visible)
          .map((block) => {
            const Component = blockComponents[block.type];
            if (!Component) return null;
            const extraProps = (block.type === "hero" || block.type === "visao")
              ? { meta: { clientLogo: config.meta.clientLogo, companyLogo: config.meta.companyLogo } }
              : {};
            return <Component key={block.id} config={block.data} {...extraProps} />;
          })}
      </main>
    </>
  );
}
