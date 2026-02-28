import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

/* ============================================
   ROOT LAYOUT
   Layout raiz simplificado — fontes das propostas
   são carregadas dinamicamente pelo ThemeInjector.
   Inter é usada apenas como fonte do sistema/editor.
   ============================================ */

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "gerapropostas — Feche mais contratos com propostas profissionais",
  description: "A maior plataforma de propostas comerciais do Brasil. Crie, envie e feche contratos em minutos com templates prontos e inteligencia artificial.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
