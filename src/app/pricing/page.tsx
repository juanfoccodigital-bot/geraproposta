"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Shield } from "lucide-react";

/* ============================================
   PRICING PAGE
   Planos + tabela comparativa + FAQ
   ============================================ */

const faqs = [
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, voce pode cancelar sua assinatura a qualquer momento. Voce continuara tendo acesso ate o final do periodo pago.",
  },
  {
    q: "Como funciona o plano gratuito?",
    a: "O plano Free permite criar 3 propostas por dia (ate 15 por mes) usando templates basicos. Voce tambem pode fazer ate 3 alteracoes por dia nas suas propostas. Nao tem custo e nao precisa de cartao de credito.",
  },
  {
    q: "O que sao 'alteracoes' nas propostas?",
    a: "Cada vez que voce edita e salva uma proposta existente (trocar textos, imagens, blocos, etc), conta como uma alteracao. No plano Free voce tem 3 por dia, no Lite 20 por dia, e nos planos Pro e Plus as alteracoes sao ilimitadas.",
  },
  {
    q: "O que acontece se eu atingir o limite?",
    a: "Quando voce atinge o limite do seu plano, voce sera notificado e podera fazer upgrade para continuar criando ou editando propostas.",
  },
  {
    q: "Como funciona a geracao com IA?",
    a: "A geracao com IA estara disponivel em breve nos planos Pro e Plus. Voce vai descrever seu servico e o cliente, e nossa IA gerara uma proposta completa com textos, blocos e layout profissional. Voce podera editar tudo depois.",
  },
  {
    q: "O que sao GeraLinks e GeraSites?",
    a: "GeraLinks sao paginas de biolink (como Linktree) para voce reunir todos os seus links. GeraSites (em breve) sera o criador de mini sites profissionais para seu negocio. Cada plano tem um limite diferente — o Plus oferece ambos ilimitados.",
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Sim! Voce pode fazer upgrade ou downgrade a qualquer momento. A mudanca e aplicada imediatamente.",
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
        <span className="text-sm font-medium text-white group-hover:text-[#F97316] transition-colors">{q}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "#737373" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "#A3A3A3" }}>{a}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const { user: userProfile } = useAuth();
  const router = useRouter();
  const [checkingOutPlan, setCheckingOutPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    if (!userProfile) {
      router.push("/signup");
      return;
    }
    setCheckingOutPlan(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao processar pagamento");
        setCheckingOutPlan(null);
      }
    } catch {
      alert("Erro ao processar pagamento. Tente novamente.");
      setCheckingOutPlan(null);
    }
  };

  return (
    <main className="relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Background glow — spans header + cards */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.07] pointer-events-none"
        style={{ background: "#F97316" }}
      />

      <Navbar />

      {/* Header */}
      <div className="pt-2 pb-4 px-6 text-center relative z-10">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5"
          style={{ background: "#F9731615", color: "#F97316", border: "1px solid #F9731630" }}
        >
          Planos e Precos
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Escolha o plano ideal<br className="hidden md:block" /> para seu negocio
        </h1>
        <p className="max-w-xl mx-auto text-base" style={{ color: "#A3A3A3" }}>
          Comece gratis. Crie propostas profissionais, edite quantas vezes precisar e faca upgrade quando quiser.
        </p>
      </div>

      {/* Pricing Cards + Comparison Table */}
      <PricingSection
        showComparisonTable
        userPlan={userProfile?.plan}
        onCheckout={handleCheckout}
        checkingOutPlan={checkingOutPlan}
      />

      {/* Trust badges */}
      <section className="py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: <Shield className="w-4 h-4" />, text: "Cancele quando quiser" },
            { icon: <Shield className="w-4 h-4" />, text: "Sem taxa de adesao" },
            { icon: <Shield className="w-4 h-4" />, text: "Upgrade instantaneo" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "#737373" }}>
              <span style={{ color: "#22C55E" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Perguntas frequentes
            </h2>
            <p className="text-sm" style={{ color: "#737373" }}>
              Tire suas duvidas sobre os planos
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
