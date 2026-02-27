/* ============================================
   GOOGLE FONTS — LOADER DINÂMICO
   Carrega fontes do Google Fonts via <link>
   para suportar troca de tipografia em runtime
   ============================================ */

const loadedFonts = new Set<string>();

/** Carrega uma fonte do Google Fonts dinamicamente */
export function loadGoogleFont(
  fontFamily: string,
  weights: string[] = ["300", "400", "500", "600", "700"]
) {
  if (typeof window === "undefined") return;

  const key = `${fontFamily}-${weights.join(",")}`;
  if (loadedFonts.has(key)) return;

  const formatted = fontFamily.replace(/\s+/g, "+");
  const weightsStr = weights.join(";");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${formatted}:wght@${weightsStr}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(key);
}

/** Opções de fontes para o seletor do editor */
export const fontOptions = [
  // Serifadas (ideais para títulos)
  { label: "Playfair Display", value: "Playfair Display", category: "serif" },
  { label: "Merriweather", value: "Merriweather", category: "serif" },
  { label: "Lora", value: "Lora", category: "serif" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond", category: "serif" },
  { label: "DM Serif Display", value: "DM Serif Display", category: "serif" },
  { label: "Libre Baskerville", value: "Libre Baskerville", category: "serif" },
  // Sans-serif (ideais para corpo)
  { label: "Poppins", value: "Poppins", category: "sans-serif" },
  { label: "Inter", value: "Inter", category: "sans-serif" },
  { label: "Montserrat", value: "Montserrat", category: "sans-serif" },
  { label: "Raleway", value: "Raleway", category: "sans-serif" },
  { label: "DM Sans", value: "DM Sans", category: "sans-serif" },
  { label: "Nunito", value: "Nunito", category: "sans-serif" },
  { label: "Open Sans", value: "Open Sans", category: "sans-serif" },
  { label: "Roboto", value: "Roboto", category: "sans-serif" },
  { label: "Outfit", value: "Outfit", category: "sans-serif" },
  { label: "Space Grotesk", value: "Space Grotesk", category: "sans-serif" },
];

/** Presets de cores para seleção rápida no editor */
export const colorPresets = [
  {
    name: "Dourado Premium",
    colors: {
      gold: "#C9A96E",
      goldLight: "#D4BA88",
      goldDark: "#B8944F",
      background: "#FDFBF8",
      foreground: "#1A1A1A",
      beige: "#F5F0EB",
      nude: "#E8DDD3",
      cream: "#FAF7F4",
    },
  },
  {
    name: "Rosa Clínica",
    colors: {
      gold: "#C4727F",
      goldLight: "#D4919B",
      goldDark: "#A85565",
      background: "#FDF8F9",
      foreground: "#1A1A1A",
      beige: "#F5ECF0",
      nude: "#E8D8DD",
      cream: "#FAF4F6",
    },
  },
  {
    name: "Azul Corporativo",
    colors: {
      gold: "#4A7BC7",
      goldLight: "#6E96D6",
      goldDark: "#3560A8",
      background: "#F8FAFD",
      foreground: "#1A1A1A",
      beige: "#EBF0F5",
      nude: "#D3DEE8",
      cream: "#F4F7FA",
    },
  },
  {
    name: "Verde Saúde",
    colors: {
      gold: "#5BA68A",
      goldLight: "#7DBBA3",
      goldDark: "#458D72",
      background: "#F8FDF9",
      foreground: "#1A1A1A",
      beige: "#EBF5F0",
      nude: "#D3E8DD",
      cream: "#F4FAF7",
    },
  },
  {
    name: "Preto & Dourado",
    colors: {
      gold: "#D4AF37",
      goldLight: "#E0C35C",
      goldDark: "#B8962E",
      background: "#0A0A0A",
      foreground: "#F5F5F5",
      beige: "#1A1A1A",
      nude: "#252525",
      cream: "#111111",
    },
  },
];
