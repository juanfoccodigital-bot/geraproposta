import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import HowToUseButton from "@/components/ui/HowToUseButton";
import PromoBanner from "@/components/ui/PromoBanner";
import PromoPopup from "@/components/ui/PromoPopup";

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
      <head>
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '974973178237055');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=974973178237055&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <PromoBanner />
          {children}
          <HowToUseButton />
          <PromoPopup />
        </AuthProvider>
      </body>
    </html>
  );
}
