"use client";

import { useEffect } from "react";
import { ThemeConfig } from "@/types/proposal";
import { loadGoogleFont } from "@/lib/fonts";

/* ============================================
   THEME INJECTOR
   Injeta CSS variables e carrega fontes
   dinamicamente com base no ThemeConfig
   ============================================ */

interface ThemeInjectorProps {
  theme: ThemeConfig;
  targetRef?: React.RefObject<HTMLElement | null>;
}

const CSS_VARS = [
  "--gold", "--gold-light", "--gold-dark",
  "--background", "--foreground", "--beige", "--nude", "--cream",
  "--color-foreground", "--color-gold", "--color-gold-light", "--color-gold-dark",
  "--color-background", "--color-beige", "--color-nude", "--color-cream",
  "--font-heading", "--font-body", "--font-sans", "--font-serif",
] as const;

export default function ThemeInjector({ theme, targetRef }: ThemeInjectorProps) {
  useEffect(() => {
    const root = targetRef?.current || document.documentElement;

    // Injetar cores como CSS variables (base + Tailwind v4 --color-* aliases)
    root.style.setProperty("--gold", theme.colors.gold);
    root.style.setProperty("--gold-light", theme.colors.goldLight);
    root.style.setProperty("--gold-dark", theme.colors.goldDark);
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--foreground", theme.colors.foreground);
    root.style.setProperty("--beige", theme.colors.beige);
    root.style.setProperty("--nude", theme.colors.nude);
    root.style.setProperty("--cream", theme.colors.cream);

    // Tailwind v4 @theme aliases — needed so utility classes like
    // text-foreground / bg-gold resolve correctly when scoped to a
    // non-root element (e.g. TemplatePreviewThumbnail)
    root.style.setProperty("--color-foreground", theme.colors.foreground);
    root.style.setProperty("--color-gold", theme.colors.gold);
    root.style.setProperty("--color-gold-light", theme.colors.goldLight);
    root.style.setProperty("--color-gold-dark", theme.colors.goldDark);
    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-beige", theme.colors.beige);
    root.style.setProperty("--color-nude", theme.colors.nude);
    root.style.setProperty("--color-cream", theme.colors.cream);

    // Injetar fontes
    root.style.setProperty("--font-heading", `"${theme.fonts.heading}", serif`);
    root.style.setProperty("--font-body", `"${theme.fonts.body}", sans-serif`);
    root.style.setProperty("--font-sans", `"${theme.fonts.body}", sans-serif`);
    root.style.setProperty("--font-serif", `"${theme.fonts.heading}", serif`);

    // Carregar Google Fonts
    loadGoogleFont(theme.fonts.heading);
    loadGoogleFont(theme.fonts.body);

    // Cleanup: remove CSS variables when unmounting so they don't
    // leak into other pages (e.g. navigating from /p/slug back to home)
    return () => {
      for (const v of CSS_VARS) {
        root.style.removeProperty(v);
      }
    };
  }, [theme, targetRef]);

  return null;
}
