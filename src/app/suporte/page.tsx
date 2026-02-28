"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { MessageCircle, ChevronDown, Mail, Clock, Zap } from "lucide-react";

/* ============================================
   PAGINA DE SUPORTE
   WhatsApp + FAQ
   ============================================ */

const faqs = [
  {
    q: "Como faco upgrade do meu plano?",
    a: "Acesse a pagina de Precos ou clique em 'Fazer Upgrade' no Dashboard. Escolha o plano desejado e realize o pagamento via PIX. O upgrade e aplicado imediatamente apos a confirmacao.",
  },
  {
    q: "Esqueci minha senha, como recupero?",
    a: "Na tela de login, clique em 'Esqueceu sua senha?'. Digite seu email cadastrado e enviaremos um link para redefinir sua senha. O link expira em 1 hora.",
  },
  {
    q: "Como compartilho minha proposta?",
    a: "Abra a proposta no editor e clique no botao 'Compartilhar' no canto superior direito. Voce recebera um link unico que pode ser enviado por WhatsApp, email ou qualquer outro canal.",
  },
  {
    q: "Posso cancelar minha assinatura?",
    a: "Sim! Acesse 'Minha Assinatura' no menu do usuario e clique em 'Cancelar'. Voce continuara com acesso ao plano pago ate o final do periodo. Apos isso, seu plano volta para Free.",
  },
  {
    q: "Como funciona o pagamento via PIX?",
    a: "Ao escolher um plano pago, voce sera redirecionado para a pagina de pagamento do AbacatePay. La, voce pode pagar via PIX (QR Code ou copia-e-cola). A confirmacao e instantanea.",
  },
  {
    q: "Meu pagamento foi confirmado mas o plano nao mudou",
    a: "Em casos raros, pode haver um atraso de alguns minutos na confirmacao. Tente fazer logout e login novamente. Se o problema persistir, entre em contato pelo WhatsApp informando seu email e data do pagamento.",
  },
  {
    q: "Quantas propostas posso criar por dia?",
    a: "Depende do seu plano: Free permite 3 por dia (15/mes), Lite permite 10 por dia (30/mes), Pro tem propostas ilimitadas por dia (100/mes), e Plus e totalmente ilimitado.",
  },
  {
    q: "Como usar os GeraLinks (biolinks)?",
    a: "No Dashboard, acesse 'GeraLinks' no menu lateral. La voce pode criar sua pagina de biolink personalizada com todos os seus links importantes. Compartilhe o link unico nas suas redes sociais.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#1F1F1F" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-white group-hover:text-[#F97316] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "#737373" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "#A3A3A3" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function SuportePage() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background glow — spans header + cards */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[700px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ background: "#22C55E" }}
      />

      <Navbar />

      {/* Hero */}
      <div className="pt-2 pb-4 px-6 text-center relative z-10">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
          style={{ background: "#22C55E15", color: "#22C55E", border: "1px solid #22C55E30" }}
        >
          Suporte
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Central de Suporte
        </h1>
        <p className="max-w-lg mx-auto text-base" style={{ color: "#A3A3A3" }}>
          Estamos aqui para ajudar. Confira as perguntas frequentes ou fale diretamente conosco.
        </p>
      </div>

      {/* Contact cards */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5541997038671"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border p-6 flex items-start gap-4 transition-all hover:border-green-500/30 hover:bg-green-500/5 group"
            style={{ background: "#111111", borderColor: "#262626" }}
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">WhatsApp</h3>
              <p className="text-sm text-white/50 mb-3">
                Fale diretamente com nossa equipe. Resposta rapida em horario comercial.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-400">
                Abrir conversa
                <Zap className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:suporte@gerapropostas.com"
            className="rounded-2xl border p-6 flex items-start gap-4 transition-all hover:border-blue-500/30 hover:bg-blue-500/5 group"
            style={{ background: "#111111", borderColor: "#262626" }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Email</h3>
              <p className="text-sm text-white/50 mb-3">
                Para questoes detalhadas ou envio de comprovantes.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/40">
                <Clock className="w-3.5 h-3.5" />
                Resposta em ate 24h
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 px-6" style={{ borderTop: "1px solid #1F1F1F" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Perguntas frequentes
            </h2>
            <p className="text-sm" style={{ color: "#737373" }}>
              Encontre respostas para as duvidas mais comuns
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 px-6 text-center">
        <p className="text-sm text-white/40 mb-4">
          Nao encontrou o que procurava?
        </p>
        <a
          href="https://wa.me/5541997038671"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-green-600 transition-all hover:bg-green-500"
        >
          <MessageCircle className="w-4 h-4" />
          Falar pelo WhatsApp
        </a>
      </section>

      <Footer />
    </main>
  );
}
