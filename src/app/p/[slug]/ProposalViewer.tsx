"use client";

import { useEffect } from "react";
import { ProposalRecord } from "@/types/proposal";
import { loadGoogleFont } from "@/lib/fonts";
import ProposalRenderer from "@/components/proposal/ProposalRenderer";

/* ============================================
   CLIENT WRAPPER — ProposalViewer
   Recebe os dados da proposta do server component,
   carrega fontes dinamicamente, registra a view
   e renderiza o ProposalRenderer (V2 compat).
   ============================================ */

export default function ProposalViewer({
  proposal,
}: {
  proposal: ProposalRecord;
}) {
  useEffect(() => {
    loadGoogleFont(proposal.config.theme.fonts.heading);
    loadGoogleFont(proposal.config.theme.fonts.body);
    fetch(`/api/proposals/${proposal.id}/view`, { method: "POST" }).catch(() => {});
  }, [
    proposal.id,
    proposal.config.theme.fonts.heading,
    proposal.config.theme.fonts.body,
  ]);

  return <ProposalRenderer config={proposal.config} />;
}
