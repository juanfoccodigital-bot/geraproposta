"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HelpCircle, X, Play, ChevronRight, FileText, Link2, Globe, Sparkles, Palette, Share2, BarChart3, Layers } from "lucide-react";

const lessons = [
  {
    icon: Sparkles,
    title: "Criar proposta com IA",
    duration: "2 min",
    steps: [
      "Na pagina inicial, clique em \"Gerar Proposta com IA\".",
      "Preencha o nome do cliente, seu nicho e os servicos oferecidos.",
      "A IA vai gerar uma proposta completa com textos, precos e escopo.",
      "Revise, personalize e envie pelo link ou WhatsApp.",
    ],
  },
  {
    icon: FileText,
    title: "Criar proposta manual",
    duration: "3 min",
    steps: [
      "Va em \"Templates\" e escolha o modelo ideal para seu nicho.",
      "Clique em \"Usar Template\" para abrir o editor.",
      "Edite textos, precos, cores e adicione sua logo.",
      "Salve e compartilhe o link da proposta com seu cliente.",
    ],
  },
  {
    icon: Palette,
    title: "Personalizar proposta",
    duration: "2 min",
    steps: [
      "No editor, clique nas secoes para editar textos e valores.",
      "Use o painel lateral para trocar cores, fontes e background.",
      "Adicione ou remova secoes conforme sua necessidade.",
      "Faca upload da sua logo para deixar com a identidade da sua marca.",
    ],
  },
  {
    icon: Link2,
    title: "Criar Link na Bio",
    duration: "2 min",
    steps: [
      "Acesse \"Link na Bio\" no menu principal.",
      "Clique em \"Novo Link\" e escolha um template.",
      "Adicione seus links, redes sociais e informacoes.",
      "Copie o link gerado e coloque na bio do Instagram.",
    ],
  },
  {
    icon: Globe,
    title: "Criar um Site",
    duration: "3 min",
    steps: [
      "Acesse \"Sites\" no menu principal.",
      "Escolha um template e clique em \"Criar Site\".",
      "Personalize textos, imagens e cores no editor visual.",
      "Publique e compartilhe o link do seu site.",
    ],
  },
  {
    icon: Share2,
    title: "Enviar proposta ao cliente",
    duration: "1 min",
    steps: [
      "Apos salvar sua proposta, clique em \"Compartilhar\".",
      "Copie o link gerado ou envie direto pelo WhatsApp.",
      "O cliente recebe uma pagina profissional e responsiva.",
      "Acompanhe as visualizacoes no seu painel.",
    ],
  },
  {
    icon: BarChart3,
    title: "Acompanhar resultados",
    duration: "1 min",
    steps: [
      "No painel, veja quantas vezes cada proposta foi visualizada.",
      "Links na Bio e Sites tambem mostram contagem de views.",
      "Use esses dados para fazer follow-up com clientes.",
      "Propostas mais vistas indicam maior interesse do cliente.",
    ],
  },
  {
    icon: Layers,
    title: "Gerenciar projetos",
    duration: "2 min",
    steps: [
      "Todos os seus projetos ficam organizados no painel.",
      "Use os botoes \"Editar\" para voltar ao editor a qualquer momento.",
      "Duplique propostas para reaproveitar em novos clientes.",
      "Exclua projetos antigos para manter tudo organizado.",
    ],
  },
];

export default function HowToUseButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [isSubdomain, setIsSubdomain] = useState(false);

  // Detecta subdominio (slug.geraproposta.com) — rewrite muda path no server mas usePathname retorna "/"
  useEffect(() => {
    const host = window.location.hostname;
    const appDomain = "geraproposta.com";
    const isSub = host.endsWith(`.${appDomain}`) && host !== `www.${appDomain}` && host !== appDomain;
    if (isSub) setIsSubdomain(true);
  }, []);

  // Esconde no editor, preview e paginas publicas (proposta/biolink/site compartilhados)
  const isHidden = isSubdomain || pathname.includes("/editor/") || pathname.includes("/preview/") || pathname.startsWith("/p/") || pathname.startsWith("/link/") || pathname.startsWith("/site/");
  if (isHidden) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" }}
      >
        <HelpCircle size={16} />
        Como usar
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { setOpen(false); setActiveLesson(null); }}>
          <div
            className="bg-[#111] border border-[#1A1A1A] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1A1A1A]">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {activeLesson !== null ? lessons[activeLesson].title : "Como usar o gerapropostas"}
                </h2>
                <p className="text-sm text-white/40 mt-0.5">
                  {activeLesson !== null ? `${lessons[activeLesson].steps.length} passos` : "Mini aulas rapidas para voce dominar a plataforma."}
                </p>
              </div>
              <button
                onClick={() => { if (activeLesson !== null) setActiveLesson(null); else setOpen(false); }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
              >
                {activeLesson !== null ? <ChevronRight size={18} className="rotate-180" /> : <X size={18} />}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeLesson === null ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lessons.map((lesson, i) => {
                    const Icon = lesson.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveLesson(i)}
                        className="flex items-center gap-3 p-4 rounded-xl border border-[#1A1A1A] hover:border-[#F97316]/30 hover:bg-[#F97316]/5 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F9731615" }}>
                          <Icon size={18} style={{ color: "#F97316" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white group-hover:text-[#F97316] transition-colors">{lesson.title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Play size={10} className="text-white/30" />
                            <span className="text-xs text-white/30">{lesson.duration}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-[#F97316] transition-colors" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {lessons[activeLesson].steps.map((step, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: "#F9731620", color: "#F97316" }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-white/70 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
