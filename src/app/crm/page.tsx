"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/landing/Navbar";
import RevenueCards from "@/components/crm/RevenueCards";
import KanbanBoard from "@/components/crm/KanbanBoard";
import DealModal from "@/components/crm/DealModal";
import type { DealFormData } from "@/components/crm/DealModal";
import CloseDealModal from "@/components/crm/CloseDealModal";
import ContactsModal from "@/components/crm/ContactsModal";
import { Search, Users, Plus, Loader2, Kanban, TrendingUp, ArrowRight } from "lucide-react";
import type { Deal, DealStage, Contact, RevenueStats } from "@/types/crm";

/* ============================================
   CRM — Kanban Pipeline
   Disponível apenas para Pro e Plus
   ============================================ */

interface SimpleProposal {
  id: string;
  title: string;
  client_name: string;
}

export default function CrmPage() {
  const { user, loading: authLoading } = useAuth();

  // Data
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [proposals, setProposals] = useState<SimpleProposal[]>([]);
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modals
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [defaultStage, setDefaultStage] = useState<DealStage>("lead");
  const [closeDealModalOpen, setCloseDealModalOpen] = useState(false);
  const [closingDeal, setClosingDeal] = useState<Deal | null>(null);
  const [contactsModalOpen, setContactsModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  // ============================================
  // FETCH DATA
  // ============================================
  const fetchDeals = useCallback(async () => {
    try {
      const res = await fetch("/api/crm/deals");
      if (!res.ok) throw new Error();
      setDeals(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/crm/contacts");
      if (!res.ok) throw new Error();
      setContacts(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchProposals = useCallback(async () => {
    try {
      const res = await fetch("/api/proposals");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProposals(data.map((p: { id: string; title: string; client_name: string }) => ({
        id: p.id, title: p.title, client_name: p.client_name,
      })));
    } catch { /* silent */ }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/crm/stats");
      if (!res.ok) throw new Error();
      setStats(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchDeals(), fetchContacts(), fetchProposals(), fetchStats()]);
    setLoading(false);
  }, [fetchDeals, fetchContacts, fetchProposals, fetchStats]);

  useEffect(() => {
    if (authLoading || !user) return;
    fetchAll();
  }, [authLoading, user, fetchAll]);

  // ============================================
  // DEAL CRUD
  // ============================================
  const handleSaveDeal = async (data: DealFormData) => {
    if (editingDeal) {
      // Update
      const res = await fetch(`/api/crm/deals/${editingDeal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao atualizar negócio");
      showToast("Negócio atualizado!");
    } else {
      // Create
      const res = await fetch("/api/crm/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, stage: data.stage || defaultStage }),
      });
      if (!res.ok) throw new Error("Erro ao criar negócio");
      showToast("Negócio criado!");
    }
    await Promise.all([fetchDeals(), fetchStats()]);
  };

  const handleDeleteDeal = async (id: string) => {
    const res = await fetch(`/api/crm/deals/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir negócio");
    showToast("Negócio excluído!");
    await Promise.all([fetchDeals(), fetchStats()]);
  };

  // ============================================
  // KANBAN INTERACTIONS
  // ============================================
  const handleDealClick = (deal: Deal) => {
    setEditingDeal(deal);
    setDealModalOpen(true);
  };

  const handleAddDeal = (stage: DealStage) => {
    setEditingDeal(null);
    setDefaultStage(stage);
    setDealModalOpen(true);
  };

  const handleReorder = async (updates: { dealId: string; stage: string; position: number }[]) => {
    try {
      await fetch("/api/crm/deals/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      await fetchStats();
    } catch { /* revert handled by optimistic update */ }
  };

  const handleStageChange = (deal: Deal, newStage: DealStage) => {
    if (newStage === "fechado_ganho") {
      setClosingDeal(deal);
      setCloseDealModalOpen(true);
    }
  };

  const handleCloseDeal = async (dealId: string, closedValue: number) => {
    const res = await fetch(`/api/crm/deals/${dealId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: "fechado_ganho", closed_value: closedValue }),
    });
    if (!res.ok) throw new Error("Erro ao fechar negócio");
    showToast("Negócio fechado! Receita atualizada.");
    await Promise.all([fetchDeals(), fetchStats()]);
  };

  // ============================================
  // FILTERED DEALS
  // ============================================
  const filteredDeals = search.trim()
    ? deals.filter((d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        (d.contact?.name && d.contact.name.toLowerCase().includes(search.toLowerCase()))
      )
    : deals;

  // ============================================
  // LOADING STATE
  // ============================================
  if (authLoading || loading) {
    return (
      <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
        <Navbar />
        <div className="flex items-center justify-center" style={{ height: "calc(100vh - 64px)" }}>
          <Loader2 size={28} className="animate-spin text-orange-500" />
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-4 pt-24 pb-8">
        {/* Banner CRM */}
        <div
          className="rounded-2xl p-6 mb-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1A1A1A 0%, #111111 50%, #1A0F00 100%)",
            border: "1px solid #262626",
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5" style={{ background: "radial-gradient(circle, #F97316, transparent 70%)" }} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl" style={{ background: "#F9731620" }}>
                <Kanban size={24} style={{ color: "#F97316" }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  CRM Pipeline
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#F9731630", color: "#F97316" }}>PRO</span>
                </h1>
                <p className="text-xs mt-0.5" style={{ color: "#A3A3A3" }}>
                  Gerencie seus negócios, contatos e acompanhe sua receita em tempo real
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "#0A0A0A80", border: "1px solid #262626" }}
              >
                <Search size={14} style={{ color: "#737373" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar negócio..."
                  className="bg-transparent text-xs text-white outline-none placeholder:text-neutral-500 w-40"
                />
              </div>
              {/* Contacts */}
              <button
                onClick={() => setContactsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-colors hover:bg-white/5"
                style={{ background: "#0A0A0A80", border: "1px solid #262626" }}
              >
                <Users size={14} />
                Contatos
              </button>
              {/* New */}
              <button
                onClick={() => handleAddDeal("lead")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white transition-colors hover:opacity-90"
                style={{ background: "#F97316" }}
              >
                <Plus size={14} />
                Novo Negócio
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Cards */}
        <div className="mb-6">
          <RevenueCards stats={stats} loading={loading} />
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          deals={filteredDeals}
          setDeals={setDeals}
          onDealClick={handleDealClick}
          onAddDeal={handleAddDeal}
          onReorder={handleReorder}
          onStageChange={handleStageChange}
        />
      </div>

      {/* Modals */}
      <DealModal
        open={dealModalOpen}
        deal={editingDeal}
        contacts={contacts}
        proposals={proposals}
        onClose={() => { setDealModalOpen(false); setEditingDeal(null); }}
        onSave={handleSaveDeal}
        onDelete={handleDeleteDeal}
      />

      <CloseDealModal
        open={closeDealModalOpen}
        deal={closingDeal}
        onClose={() => { setCloseDealModalOpen(false); setClosingDeal(null); }}
        onConfirm={handleCloseDeal}
      />

      <ContactsModal
        open={contactsModalOpen}
        onClose={() => setContactsModalOpen(false)}
        onUpdate={() => fetchContacts()}
      />

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-xs font-medium text-white shadow-lg"
          style={{ background: "#F97316", animation: "slideUp 0.3s ease-out" }}
        >
          {toast}
        </div>
      )}
    </main>
  );
}
