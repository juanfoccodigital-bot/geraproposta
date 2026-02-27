import type { ProposalConfig, Block, SectionEntry, BlockType } from "@/types/proposal";

/* ============================================
   MIGRATE CONFIG V1 → V2
   Converte sections[] em blocks[] adicionando
   id único a cada bloco
   ============================================ */

let counter = 0;
function generateId(): string {
  counter++;
  return `block-${Date.now()}-${counter}-${Math.random().toString(36).slice(2, 8)}`;
}

function sectionToBlock(section: SectionEntry): Block {
  return {
    id: generateId(),
    type: section.type as BlockType,
    visible: section.visible,
    data: section.data,
  };
}

export function migrateConfig(config: ProposalConfig): ProposalConfig {
  // Already V2 with blocks
  if (config.version === 2 && config.blocks && config.blocks.length > 0) {
    return config;
  }

  // Convert V1 sections to V2 blocks
  const blocks: Block[] = (config.sections || []).map(sectionToBlock);

  return {
    ...config,
    version: 2,
    blocks,
  };
}
