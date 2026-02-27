/* ============================================
   LOGO — gerapropostas
   Usa imagem PNG em fundos escuros,
   texto fallback em fundos claros.
   ============================================ */

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

const imageHeights = {
  sm: 20,
  md: 28,
  lg: 40,
};

export default function Logo({ size = "md", dark = true }: LogoProps) {
  const h = imageHeights[size];
  const w = Math.round(h * (1198 / 174));

  if (dark) {
    return (
      <Image
        src="/logo.png"
        alt="gerapropostas"
        width={w}
        height={h}
        style={{ height: h, width: "auto" }}
        priority
      />
    );
  }

  /* Fundo claro: texto estilizado (imagem tem texto branco, invisível em bg claro) */
  const textSizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };
  return (
    <span className={`${textSizes[size]} font-bold tracking-tight`}>
      <span style={{ color: "#F97316" }}>gera</span>
      <span style={{ color: "#1A1A1A" }}>propostas</span>
    </span>
  );
}
