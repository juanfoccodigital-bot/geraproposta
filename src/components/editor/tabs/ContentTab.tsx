"use client";

import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";
import {
  BlockType,
  blockLabels,
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
  MarqueeData,
  BackgroundImageData,
  SplitContentData,
  VideoData,
  CounterData,
  TimelineData,
  PricingTableData,
  BeforeAfterData,
} from "@/types/proposal";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import IconPicker from "../controls/IconPicker";
import ImageUpload from "../controls/ImageUpload";

/* ============================================
   ABA: CONTEÚDO V2
   Accordion por bloco com campos de edição
   ============================================ */

/** Input de texto reutilizável */
function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5 focus:outline-none focus:border-[#F97316]/50 transition-colors";
  return (
    <div>
      <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </div>
  );
}

export default function ContentTab() {
  const { state, dispatch } = useEditor();
  const [openBlockId, setOpenBlockId] = useState<string | "meta" | null>("meta");

  const blocks = state.config.blocks || [];

  const updateBlock = (blockId: string, payload: Record<string, unknown>) => {
    dispatch({ type: "UPDATE_BLOCK_DATA", blockId, payload });
  };

  return (
    <div className="p-3 space-y-1">
      {/* Meta / Logos */}
      <div className="rounded-xl border border-white/10 overflow-hidden mb-1">
        <button
          onClick={() => setOpenBlockId(openBlockId === "meta" ? null : "meta")}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium text-white">Logos & Meta</span>
          <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${openBlockId === "meta" ? "rotate-180" : ""}`} />
        </button>
        {openBlockId === "meta" && (
          <div className="p-3 pt-0 space-y-3 border-t border-white/10">
            <Field label="Título da Proposta" value={state.config.meta.title} onChange={(v) => dispatch({ type: "UPDATE_META", payload: { title: v } })} />
            <Field label="Descrição" value={state.config.meta.description} onChange={(v) => dispatch({ type: "UPDATE_META", payload: { description: v } })} multiline />
            <div>
              <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Logo do Cliente</label>
              <ImageUpload value={state.config.meta.clientLogo || ""} onChange={(v) => dispatch({ type: "UPDATE_META", payload: { clientLogo: v } })} />
            </div>
            <div>
              <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Logo da Empresa</label>
              <ImageUpload value={state.config.meta.companyLogo || ""} onChange={(v) => dispatch({ type: "UPDATE_META", payload: { companyLogo: v } })} />
            </div>
          </div>
        )}
      </div>

      {blocks
        .filter((b) => b.visible)
        .map((block) => {
          const isOpen = openBlockId === block.id;
          return (
            <div key={block.id} className="rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setOpenBlockId(isOpen ? null : block.id)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-white">
                  {blockLabels[block.type]}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="p-3 pt-0 space-y-3 border-t border-white/10">
                  <BlockFields
                    type={block.type}
                    data={block.data}
                    blockId={block.id}
                    updateBlock={updateBlock}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

/* ============================================
   CAMPOS POR TIPO DE BLOCO
   ============================================ */

function BlockFields({
  type,
  data,
  blockId,
  updateBlock,
}: {
  type: BlockType;
  data: unknown;
  blockId: string;
  updateBlock: (blockId: string, payload: Record<string, unknown>) => void;
}) {
  const update = (payload: Record<string, unknown>) => updateBlock(blockId, payload);

  switch (type) {
    case "hero":
      return <HeroFields data={data as HeroConfig} update={update} />;
    case "diagnostico":
      return <DiagnosticoFields data={data as DiagnosticoConfig} update={update} />;
    case "estrategia":
      return <EstrategiaFields data={data as EstrategiaConfig} update={update} />;
    case "diferenciais":
      return <DiferenciaisFields data={data as DiferenciaisConfig} update={update} />;
    case "investimento":
      return <InvestimentoFields data={data as InvestimentoConfig} update={update} />;
    case "visao":
      return <VisaoFields data={data as VisaoConfig} update={update} />;
    case "texto":
      return <TextoFields data={data as TextoData} update={update} />;
    case "imagem":
      return <ImagemFields data={data as ImagemData} update={update} />;
    case "cards-grid":
      return <CardsGridFields data={data as CardsGridData} update={update} />;
    case "cta":
      return <CtaFields data={data as CtaData} update={update} />;
    case "divider":
      return <DividerFields data={data as DividerData} update={update} />;
    case "galeria":
      return <GaleriaFields data={data as GaleriaData} update={update} />;
    case "depoimentos":
      return <DepoimentosFields data={data as DepoimentosData} update={update} />;
    case "marquee":
      return <MarqueeFields data={data as MarqueeData} update={update} />;
    case "background-image":
      return <BackgroundImageFields data={data as BackgroundImageData} update={update} />;
    case "split-content":
      return <SplitContentFields data={data as SplitContentData} update={update} />;
    case "video":
      return <VideoFields data={data as VideoData} update={update} />;
    case "counter":
      return <CounterFields data={data as CounterData} update={update} />;
    case "timeline":
      return <TimelineFields data={data as TimelineData} update={update} />;
    case "pricing-table":
      return <PricingTableFields data={data as PricingTableData} update={update} />;
    case "before-after":
      return <BeforeAfterFields data={data as BeforeAfterData} update={update} />;
    default:
      return null;
  }
}

/* ── Hero ── */
function HeroFields({ data, update }: { data: HeroConfig; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <Field label="Badge" value={data.badge} onChange={(v) => update({ badge: v })} />
      <Field label="Título (linha 1)" value={data.titleLine1} onChange={(v) => update({ titleLine1: v })} />
      <Field label="Título (destaque)" value={data.titleHighlight} onChange={(v) => update({ titleHighlight: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <Field label="Nome do Cliente" value={data.clientName} onChange={(v) => update({ clientName: v })} />
      <Field label="Botão Principal" value={data.ctaPrimary.label} onChange={(v) => update({ ctaPrimary: { ...data.ctaPrimary, label: v } })} />
      <Field label="Botão WhatsApp" value={data.ctaSecondary.label} onChange={(v) => update({ ctaSecondary: { ...data.ctaSecondary, label: v } })} />
      <Field label="URL WhatsApp" value={data.ctaSecondary.url} onChange={(v) => update({ ctaSecondary: { ...data.ctaSecondary, url: v } })} />
    </>
  );
}

/* ── Diagnóstico ── */
function DiagnosticoFields({ data, update }: { data: DiagnosticoConfig; update: (p: Record<string, unknown>) => void }) {
  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...data.cards];
    cards[index] = { ...cards[index], [field]: value };
    update({ cards });
  };

  const addCard = () => {
    update({
      cards: [
        ...data.cards,
        { icon: "AlertCircle", title: "Novo ponto", description: "Descrição", severity: "medio" },
      ],
    });
  };

  const removeCard = (index: number) => {
    update({ cards: data.cards.filter((_: unknown, i: number) => i !== index) });
  };

  const updateImage = (index: number, url: string) => {
    const images = [...data.images];
    images[index] = { ...images[index], src: url };
    update({ images });
  };

  const addImage = () => {
    update({ images: [...data.images, { src: "", alt: "Nova imagem" }] });
  };

  const removeImage = (index: number) => {
    update({ images: data.images.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Label da seção" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />

      <div className="flex items-center justify-between py-2">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Mostrar Imagens</span>
        <button
          onClick={() => update({ showImages: !data.showImages })}
          className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${data.showImages ? "bg-[#F97316]" : "bg-white/20"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${data.showImages ? "translate-x-[18px]" : "translate-x-[2px]"}`} />
        </button>
      </div>

      {data.showImages && (
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Imagens</span>
            <button onClick={addImage} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
              <Plus className="w-3 h-3" /> Adicionar
            </button>
          </div>
          {data.images.map((img: { src: string; alt: string }, i: number) => (
            <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/10 mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-white/30">Imagem {i + 1}</span>
                <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <ImageUpload value={img.src} onChange={(url) => updateImage(i, url)} />
            </div>
          ))}
        </div>
      )}

      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Cards</span>
          <button onClick={addCard} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
            <Plus className="w-3 h-3" /> Adicionar
          </button>
        </div>
        {data.cards.map((card, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
            <div className="flex items-center justify-between">
              <IconPicker value={card.icon} onChange={(v) => updateCard(i, "icon", v)} />
              <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Field label="Título" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
            <Field label="Descrição" value={card.description} onChange={(v) => updateCard(i, "description", v)} multiline />
            <div>
              <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Severidade</label>
              <select
                value={card.severity}
                onChange={(e) => updateCard(i, "severity", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
              >
                <option value="alto" className="bg-[#111]">Prioridade Alta</option>
                <option value="medio" className="bg-[#111]">Prioridade Média</option>
                <option value="positivo" className="bg-[#111]">Oportunidade</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Estratégia ── */
function EstrategiaFields({ data, update }: { data: EstrategiaConfig; update: (p: Record<string, unknown>) => void }) {
  const updateCard = (index: number, field: string, value: unknown) => {
    const cards = [...data.cards];
    cards[index] = { ...cards[index], [field]: value };
    update({ cards });
  };

  const updateItem = (cardIndex: number, itemIndex: number, value: string) => {
    const cards = [...data.cards];
    const items = [...cards[cardIndex].items];
    items[itemIndex] = value;
    cards[cardIndex] = { ...cards[cardIndex], items };
    update({ cards });
  };

  const addItem = (cardIndex: number) => {
    const cards = [...data.cards];
    cards[cardIndex] = { ...cards[cardIndex], items: [...cards[cardIndex].items, "Novo item"] };
    update({ cards });
  };

  const removeItem = (cardIndex: number, itemIndex: number) => {
    const cards = [...data.cards];
    cards[cardIndex] = {
      ...cards[cardIndex],
      items: cards[cardIndex].items.filter((_: unknown, i: number) => i !== itemIndex),
    };
    update({ cards });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />

      {data.cards.map((card, ci) => (
        <div key={ci} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <IconPicker value={card.icon} onChange={(v) => updateCard(ci, "icon", v)} />
            <span className="text-xs text-white/30 font-medium">Pilar {ci + 1}</span>
          </div>
          <Field label="Título" value={card.title} onChange={(v) => updateCard(ci, "title", v)} />
          <Field label="Descrição" value={card.description} onChange={(v) => updateCard(ci, "description", v)} multiline />
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Itens</span>
              <button onClick={() => addItem(ci)} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
            {card.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-1 mb-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(ci, ii, e.target.value)}
                  className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs text-white bg-white/5"
                />
                <button onClick={() => removeItem(ci, ii)} className="text-red-400 hover:text-red-500 p-1 cursor-pointer">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ── Diferenciais ── */
function DiferenciaisFields({ data, update }: { data: DiferenciaisConfig; update: (p: Record<string, unknown>) => void }) {
  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...data.cards];
    cards[index] = { ...cards[index], [field]: value };
    update({ cards });
  };

  const addCard = () => {
    update({
      cards: [...data.cards, { icon: "Star", title: "Novo diferencial", description: "Descrição" }],
    });
  };

  const removeCard = (index: number) => {
    update({ cards: data.cards.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Cards</span>
        <button onClick={addCard} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.cards.map((card, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <IconPicker value={card.icon} onChange={(v) => updateCard(i, "icon", v)} />
            <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <Field label="Título" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
          <Field label="Descrição" value={card.description} onChange={(v) => updateCard(i, "description", v)} multiline />
        </div>
      ))}
    </>
  );
}

/* ── Investimento ── */
function InvestimentoFields({ data, update }: { data: InvestimentoConfig; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, value: string) => {
    const items = [...data.includedItems];
    items[index] = value;
    update({ includedItems: items });
  };

  const addItem = () => {
    update({ includedItems: [...data.includedItems, "Novo item incluso"] });
  };

  const removeItem = (index: number) => {
    update({ includedItems: data.includedItems.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} />
      <Field label="Badge" value={data.badge} onChange={(v) => update({ badge: v })} />
      <Field label="Preço Original (riscado)" value={data.priceOriginal} onChange={(v) => update({ priceOriginal: v })} />
      <div className="grid grid-cols-3 gap-2">
        <Field label="Moeda" value={data.priceCurrency} onChange={(v) => update({ priceCurrency: v })} />
        <Field label="Valor" value={data.priceCurrent} onChange={(v) => update({ priceCurrent: v })} />
        <Field label="Período" value={data.pricePeriod} onChange={(v) => update({ pricePeriod: v })} />
      </div>
      <Field label="Descrição" value={data.description} onChange={(v) => update({ description: v })} multiline />
      <Field label="Texto do CTA" value={data.ctaLabel} onChange={(v) => update({ ctaLabel: v })} />
      <Field label="URL do CTA" value={data.ctaUrl} onChange={(v) => update({ ctaUrl: v })} />
      <Field label="Garantia" value={data.guarantee} onChange={(v) => update({ guarantee: v })} />

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Itens Inclusos</span>
          <button onClick={addItem} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
            <Plus className="w-3 h-3" /> Adicionar
          </button>
        </div>
        {data.includedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-1 mb-1">
            <input type="text" value={item} onChange={(e) => updateItem(i, e.target.value)} className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs text-white bg-white/5" />
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-500 p-1 cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Visão ── */
function VisaoFields({ data, update }: { data: VisaoConfig; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, field: string, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    update({ items });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <Field label="Frase (parte 1)" value={data.quote} onChange={(v) => update({ quote: v })} />
      <Field label="Frase (destaque dourado)" value={data.quoteHighlight} onChange={(v) => update({ quoteHighlight: v })} />
      <Field label="Nome no footer" value={data.footerClientName} onChange={(v) => update({ footerClientName: v })} />
      <Field label="Nota do footer" value={data.footerNote} onChange={(v) => update({ footerNote: v })} />

      <div className="pt-2">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider block mb-2">Itens Futuros</span>
        {data.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <IconPicker value={item.icon} onChange={(v) => updateItem(i, "icon", v)} />
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(i, "label", e.target.value)}
              className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs text-white bg-white/5"
            />
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Texto ── */
function TextoFields({ data, update }: { data: TextoData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Texto" value={data.body} onChange={(v) => update({ body: v })} multiline />
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Alinhamento</label>
        <select
          value={data.alignment}
          onChange={(e) => update({ alignment: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
        >
          <option value="left" className="bg-[#111]">Esquerda</option>
          <option value="center" className="bg-[#111]">Centro</option>
          <option value="right" className="bg-[#111]">Direita</option>
        </select>
      </div>
    </>
  );
}

/* ── Imagem ── */
function ImagemFields({ data, update }: { data: ImagemData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Imagem</label>
        <ImageUpload value={data.src} onChange={(v) => update({ src: v })} />
      </div>
      <Field label="Texto alternativo" value={data.alt} onChange={(v) => update({ alt: v })} />
      <Field label="Legenda" value={data.caption} onChange={(v) => update({ caption: v })} />
      <div className="flex items-center justify-between py-2">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Largura total</span>
        <button
          onClick={() => update({ fullWidth: !data.fullWidth })}
          className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${data.fullWidth ? "bg-[#F97316]" : "bg-white/20"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${data.fullWidth ? "translate-x-[18px]" : "translate-x-[2px]"}`} />
        </button>
      </div>
    </>
  );
}

/* ── Cards Grid ── */
function CardsGridFields({ data, update }: { data: CardsGridData; update: (p: Record<string, unknown>) => void }) {
  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...data.cards];
    cards[index] = { ...cards[index], [field]: value };
    update({ cards });
  };

  const addCard = () => {
    update({ cards: [...data.cards, { icon: "Star", title: "Novo card", description: "Descrição" }] });
  };

  const removeCard = (index: number) => {
    update({ cards: data.cards.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Colunas</label>
        <select
          value={data.columns}
          onChange={(e) => update({ columns: Number(e.target.value) })}
          className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
        >
          <option value={2} className="bg-[#111]">2 colunas</option>
          <option value={3} className="bg-[#111]">3 colunas</option>
          <option value={4} className="bg-[#111]">4 colunas</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Cards</span>
        <button onClick={addCard} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.cards.map((card, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <IconPicker value={card.icon} onChange={(v) => updateCard(i, "icon", v)} />
            <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <Field label="Título" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
          <Field label="Descrição" value={card.description} onChange={(v) => updateCard(i, "description", v)} multiline />
        </div>
      ))}
    </>
  );
}

/* ── CTA ── */
function CtaFields({ data, update }: { data: CtaData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <Field label="Texto do Botão" value={data.buttonLabel} onChange={(v) => update({ buttonLabel: v })} />
      <Field label="URL do Botão" value={data.buttonUrl} onChange={(v) => update({ buttonUrl: v })} />
    </>
  );
}

/* ── Divider ── */
function DividerFields({ data, update }: { data: DividerData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Estilo</label>
        <select
          value={data.style}
          onChange={(e) => update({ style: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
        >
          <option value="line" className="bg-[#111]">Linha</option>
          <option value="dots" className="bg-[#111]">Pontos</option>
          <option value="space" className="bg-[#111]">Espaço</option>
        </select>
      </div>
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Espaçamento</label>
        <select
          value={data.spacing}
          onChange={(e) => update({ spacing: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
        >
          <option value="sm" className="bg-[#111]">Pequeno</option>
          <option value="md" className="bg-[#111]">Médio</option>
          <option value="lg" className="bg-[#111]">Grande</option>
        </select>
      </div>
    </>
  );
}

/* ── Galeria ── */
function GaleriaFields({ data, update }: { data: GaleriaData; update: (p: Record<string, unknown>) => void }) {
  const updateImage = (index: number, url: string) => {
    const images = [...data.images];
    images[index] = { ...images[index], src: url };
    update({ images });
  };

  const addImage = () => {
    update({ images: [...data.images, { src: "", alt: "Imagem" }] });
  };

  const removeImage = (index: number) => {
    update({ images: data.images.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Colunas</label>
        <select
          value={data.columns}
          onChange={(e) => update({ columns: Number(e.target.value) })}
          className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5"
        >
          <option value={2} className="bg-[#111]">2 colunas</option>
          <option value={3} className="bg-[#111]">3 colunas</option>
          <option value={4} className="bg-[#111]">4 colunas</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Imagens</span>
        <button onClick={addImage} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.images.map((img: { src: string; alt: string }, i: number) => (
        <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/10 mb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/30">Imagem {i + 1}</span>
            <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <ImageUpload value={img.src} onChange={(url) => updateImage(i, url)} />
        </div>
      ))}
    </>
  );
}

/* ── Depoimentos ── */
function DepoimentosFields({ data, update }: { data: DepoimentosData; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, field: string, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    update({ items });
  };

  const addItem = () => {
    update({
      items: [...data.items, { name: "Nome", role: "Cargo", text: "Depoimento aqui.", avatar: "" }],
    });
  };

  const removeItem = (index: number) => {
    update({ items: data.items.filter((_: unknown, i: number) => i !== index) });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Depoimentos</span>
        <button onClick={addItem} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30">Depoimento {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-500 cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <Field label="Nome" value={item.name} onChange={(v) => updateItem(i, "name", v)} />
          <Field label="Cargo" value={item.role} onChange={(v) => updateItem(i, "role", v)} />
          <Field label="Texto" value={item.text} onChange={(v) => updateItem(i, "text", v)} multiline />
          <div>
            <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Avatar</label>
            <ImageUpload value={item.avatar} onChange={(v) => updateItem(i, "avatar", v)} />
          </div>
        </div>
      ))}
    </>
  );
}

/* ============================================
   BLOCOS PREMIUM — CAMPOS DE EDIÇÃO
   ============================================ */

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white bg-white/5 focus:outline-none focus:border-[#F97316]/50"
      >
        {options.map((o) => <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>)}
      </select>
    </div>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${value ? "bg-[#F97316]" : "bg-white/20"}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function RangeField({ label, value, onChange, min = 0, max = 100 }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">{label}</label>
        <span className="text-xs text-white/50">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#F97316]"
      />
    </div>
  );
}

/* ── Marquee ── */
function MarqueeFields({ data, update }: { data: MarqueeData; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, value: string) => {
    const items = [...data.items];
    items[index] = value;
    update({ items });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Textos</span>
        <button onClick={() => update({ items: [...data.items, "Novo texto"] })} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-white/10 text-sm"
          />
          <button onClick={() => update({ items: data.items.filter((_: string, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <SelectField label="Velocidade" value={data.speed} onChange={(v) => update({ speed: v })} options={[{ value: "slow", label: "Lenta" }, { value: "normal", label: "Normal" }, { value: "fast", label: "Rápida" }]} />
      <SelectField label="Direção" value={data.direction} onChange={(v) => update({ direction: v })} options={[{ value: "left", label: "Esquerda" }, { value: "right", label: "Direita" }]} />
      <SelectField label="Estilo" value={data.variant} onChange={(v) => update({ variant: v })} options={[{ value: "solid", label: "Sólido" }, { value: "outline", label: "Contorno" }, { value: "gradient", label: "Gradiente" }]} />
      <SelectField label="Separador" value={data.separator} onChange={(v) => update({ separator: v })} options={[{ value: "star", label: "★ Estrela" }, { value: "dot", label: "● Ponto" }, { value: "diamond", label: "◆ Diamante" }, { value: "slash", label: "/ Barra" }]} />
      <SelectField label="Tamanho" value={data.size} onChange={(v) => update({ size: v })} options={[{ value: "sm", label: "Pequeno" }, { value: "md", label: "Médio" }, { value: "lg", label: "Grande" }]} />
      <ToggleField label="Pausar ao passar mouse" value={data.pauseOnHover} onChange={(v) => update({ pauseOnHover: v })} />
    </>
  );
}

/* ── Background Image ── */
function BackgroundImageFields({ data, update }: { data: BackgroundImageData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Imagem de Fundo</label>
        <ImageUpload value={data.src} onChange={(v) => update({ src: v })} />
      </div>
      <RangeField label="Opacidade do Overlay" value={data.overlayOpacity} onChange={(v) => update({ overlayOpacity: v })} />
      <SelectField label="Cor do Overlay" value={data.overlayColor} onChange={(v) => update({ overlayColor: v })} options={[{ value: "dark", label: "Escuro" }, { value: "light", label: "Claro" }, { value: "gold", label: "Dourado" }]} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <SelectField label="Alinhamento" value={data.alignment} onChange={(v) => update({ alignment: v })} options={[{ value: "left", label: "Esquerda" }, { value: "center", label: "Centro" }, { value: "right", label: "Direita" }]} />
      <SelectField label="Cor do Texto" value={data.textColor} onChange={(v) => update({ textColor: v })} options={[{ value: "white", label: "Branco" }, { value: "dark", label: "Escuro" }, { value: "gold", label: "Dourado" }]} />
      <SelectField label="Altura" value={data.minHeight} onChange={(v) => update({ minHeight: v })} options={[{ value: "sm", label: "Pequena" }, { value: "md", label: "Média" }, { value: "lg", label: "Grande" }, { value: "xl", label: "Tela Cheia" }]} />
      <ToggleField label="Efeito Parallax" value={data.parallax} onChange={(v) => update({ parallax: v })} />
      <Field label="Texto do Botão" value={data.buttonLabel} onChange={(v) => update({ buttonLabel: v })} />
      <Field label="URL do Botão" value={data.buttonUrl} onChange={(v) => update({ buttonUrl: v })} />
    </>
  );
}

/* ── Split Content ── */
function SplitContentFields({ data, update }: { data: SplitContentData; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, value: string) => {
    const items = [...data.items];
    items[index] = value;
    update({ items });
  };

  return (
    <>
      <SelectField label="Layout" value={data.layout} onChange={(v) => update({ layout: v })} options={[{ value: "image-left", label: "Imagem à Esquerda" }, { value: "image-right", label: "Imagem à Direita" }]} />
      <div>
        <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Imagem</label>
        <ImageUpload value={data.image} onChange={(v) => update({ image: v })} />
      </div>
      <ToggleField label="Bordas arredondadas" value={data.imageRounded} onChange={(v) => update({ imageRounded: v })} />
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Texto" value={data.body} onChange={(v) => update({ body: v })} multiline />
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Itens</span>
        <button onClick={() => update({ items: [...data.items, "Novo item"] })} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <input type="text" value={item} onChange={(e) => updateItem(i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-white/10 text-sm" />
          <button onClick={() => update({ items: data.items.filter((_: string, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <Field label="Texto do Botão" value={data.buttonLabel} onChange={(v) => update({ buttonLabel: v })} />
      <Field label="URL do Botão" value={data.buttonUrl} onChange={(v) => update({ buttonUrl: v })} />
    </>
  );
}

/* ── Video ── */
function VideoFields({ data, update }: { data: VideoData; update: (p: Record<string, unknown>) => void }) {
  return (
    <>
      <Field label="URL do Vídeo (YouTube/Vimeo)" value={data.url} onChange={(v) => update({ url: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <SelectField label="Proporção" value={data.aspectRatio} onChange={(v) => update({ aspectRatio: v })} options={[{ value: "16:9", label: "16:9 (Widescreen)" }, { value: "4:3", label: "4:3 (Clássico)" }, { value: "1:1", label: "1:1 (Quadrado)" }]} />
      <SelectField label="Largura Máxima" value={data.maxWidth} onChange={(v) => update({ maxWidth: v })} options={[{ value: "sm", label: "Pequena" }, { value: "md", label: "Média" }, { value: "lg", label: "Grande" }, { value: "full", label: "Total" }]} />
      <ToggleField label="Bordas arredondadas" value={data.rounded} onChange={(v) => update({ rounded: v })} />
      <ToggleField label="Sombra" value={data.shadow} onChange={(v) => update({ shadow: v })} />
      <ToggleField label="Autoplay (mudo)" value={data.autoplay} onChange={(v) => update({ autoplay: v })} />
    </>
  );
}

/* ── Counter ── */
function CounterFields({ data, update }: { data: CounterData; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, field: string, value: string | number) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    update({ items });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <SelectField label="Colunas" value={String(data.columns)} onChange={(v) => update({ columns: Number(v) })} options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }]} />
      <SelectField label="Estilo" value={data.style} onChange={(v) => update({ style: v })} options={[{ value: "simple", label: "Simples" }, { value: "card", label: "Card" }, { value: "bordered", label: "Com Bordas" }]} />
      <SelectField label="Velocidade" value={String(data.duration)} onChange={(v) => update({ duration: Number(v) })} options={[{ value: "1000", label: "Rápido" }, { value: "2000", label: "Normal" }, { value: "3000", label: "Lento" }]} />

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Contadores</span>
        <button onClick={() => update({ items: [...data.items, { value: 100, prefix: "", suffix: "", label: "Novo" }] })} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30">Contador {i + 1}</span>
            <button onClick={() => update({ items: data.items.filter((_: unknown, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <div>
            <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Valor</label>
            <input type="number" value={item.value} onChange={(e) => updateItem(i, "value", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm" />
          </div>
          <Field label="Prefixo" value={item.prefix} onChange={(v) => updateItem(i, "prefix", v)} />
          <Field label="Sufixo" value={item.suffix} onChange={(v) => updateItem(i, "suffix", v)} />
          <Field label="Descrição" value={item.label} onChange={(v) => updateItem(i, "label", v)} />
        </div>
      ))}
    </>
  );
}

/* ── Timeline ── */
function TimelineFields({ data, update }: { data: TimelineData; update: (p: Record<string, unknown>) => void }) {
  const updateItem = (index: number, field: string, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    update({ items });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <SelectField label="Layout" value={data.layout} onChange={(v) => update({ layout: v })} options={[{ value: "vertical", label: "Vertical" }, { value: "alternating", label: "Alternado" }]} />
      <SelectField label="Linha" value={data.connectorStyle} onChange={(v) => update({ connectorStyle: v })} options={[{ value: "solid", label: "Sólida" }, { value: "dashed", label: "Tracejada" }, { value: "dots", label: "Pontilhada" }]} />

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Etapas</span>
        <button onClick={() => update({ items: [...data.items, { icon: "Circle", title: "Nova Etapa", description: "Descrição", period: "Semana X" }] })} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30">Etapa {i + 1}</span>
            <button onClick={() => update({ items: data.items.filter((_: unknown, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <IconPicker value={item.icon} onChange={(v) => updateItem(i, "icon", v)} />
          <Field label="Período" value={item.period} onChange={(v) => updateItem(i, "period", v)} />
          <Field label="Título" value={item.title} onChange={(v) => updateItem(i, "title", v)} />
          <Field label="Descrição" value={item.description} onChange={(v) => updateItem(i, "description", v)} multiline />
        </div>
      ))}
    </>
  );
}

/* ── Pricing Table ── */
function PricingTableFields({ data, update }: { data: PricingTableData; update: (p: Record<string, unknown>) => void }) {
  const updatePlan = (index: number, field: string, value: unknown) => {
    const plans = [...data.plans];
    plans[index] = { ...plans[index], [field]: value };
    update({ plans });
  };

  const updateFeature = (planIndex: number, featIndex: number, value: string) => {
    const plans = [...data.plans];
    const features = [...plans[planIndex].features];
    features[featIndex] = value;
    plans[planIndex] = { ...plans[planIndex], features };
    update({ plans });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />

      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/40 font-medium uppercase tracking-wider">Planos</span>
        <button onClick={() => update({ plans: [...data.plans, { name: "Novo Plano", badge: "", highlighted: false, price: "0", currency: "R$", period: "/mês", description: "", features: ["Recurso 1"], ctaLabel: "Escolher", ctaUrl: "" }] })} className="text-[11px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
          <Plus className="w-3 h-3" /> Adicionar
        </button>
      </div>
      {data.plans.map((plan, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 mb-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/30">Plano {i + 1}</span>
            <button onClick={() => update({ plans: data.plans.filter((_: unknown, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <Field label="Nome" value={plan.name} onChange={(v) => updatePlan(i, "name", v)} />
          <Field label="Badge" value={plan.badge} onChange={(v) => updatePlan(i, "badge", v)} />
          <ToggleField label="Destacado" value={plan.highlighted} onChange={(v) => updatePlan(i, "highlighted", v)} />
          <div className="grid grid-cols-3 gap-2">
            <Field label="Moeda" value={plan.currency} onChange={(v) => updatePlan(i, "currency", v)} />
            <Field label="Preço" value={plan.price} onChange={(v) => updatePlan(i, "price", v)} />
            <Field label="Período" value={plan.period} onChange={(v) => updatePlan(i, "period", v)} />
          </div>
          <Field label="Descrição" value={plan.description} onChange={(v) => updatePlan(i, "description", v)} />
          <Field label="Botão" value={plan.ctaLabel} onChange={(v) => updatePlan(i, "ctaLabel", v)} />
          <Field label="URL" value={plan.ctaUrl} onChange={(v) => updatePlan(i, "ctaUrl", v)} />

          <div className="flex items-center justify-between mb-1 mt-2">
            <span className="text-[10px] text-white/30">Recursos</span>
            <button onClick={() => updatePlan(i, "features", [...plan.features, "Novo recurso"])} className="text-[10px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {plan.features.map((feat, j) => (
            <div key={j} className="flex items-center gap-2">
              <input type="text" value={feat} onChange={(e) => updateFeature(i, j, e.target.value)} className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs" />
              <button onClick={() => updatePlan(i, "features", plan.features.filter((_: string, idx: number) => idx !== j))} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

/* ── Before/After ── */
function BeforeAfterFields({ data, update }: { data: BeforeAfterData; update: (p: Record<string, unknown>) => void }) {
  const updateBeforeItem = (index: number, value: string) => {
    const items = [...data.beforeItems];
    items[index] = value;
    update({ beforeItems: items });
  };

  const updateAfterItem = (index: number, value: string) => {
    const items = [...data.afterItems];
    items[index] = value;
    update({ afterItems: items });
  };

  return (
    <>
      <Field label="Label" value={data.sectionLabel} onChange={(v) => update({ sectionLabel: v })} />
      <Field label="Título" value={data.title} onChange={(v) => update({ title: v })} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => update({ subtitle: v })} multiline />
      <SelectField label="Layout" value={data.layout} onChange={(v) => update({ layout: v })} options={[{ value: "side-by-side", label: "Lado a Lado" }, { value: "slider", label: "Slider Arrastável" }]} />

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-2">
        <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Antes</span>
        <div>
          <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Imagem</label>
          <ImageUpload value={data.beforeImage} onChange={(v) => update({ beforeImage: v })} />
        </div>
        <Field label="Label" value={data.beforeLabel} onChange={(v) => update({ beforeLabel: v })} />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/30">Itens</span>
          <button onClick={() => update({ beforeItems: [...data.beforeItems, "Novo item"] })} className="text-[10px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"><Plus className="w-3 h-3" /> Add</button>
        </div>
        {data.beforeItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="text" value={item} onChange={(e) => updateBeforeItem(i, e.target.value)} className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs" />
            <button onClick={() => update({ beforeItems: data.beforeItems.filter((_: string, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-2">
        <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Depois</span>
        <div>
          <label className="text-[11px] text-white/40 mb-1 block font-medium uppercase tracking-wider">Imagem</label>
          <ImageUpload value={data.afterImage} onChange={(v) => update({ afterImage: v })} />
        </div>
        <Field label="Label" value={data.afterLabel} onChange={(v) => update({ afterLabel: v })} />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/30">Itens</span>
          <button onClick={() => update({ afterItems: [...data.afterItems, "Novo item"] })} className="text-[10px] text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"><Plus className="w-3 h-3" /> Add</button>
        </div>
        {data.afterItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="text" value={item} onChange={(e) => updateAfterItem(i, e.target.value)} className="flex-1 px-2 py-1.5 rounded border border-white/10 text-xs" />
            <button onClick={() => update({ afterItems: data.afterItems.filter((_: string, idx: number) => idx !== i) })} className="text-red-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
      </div>
    </>
  );
}
