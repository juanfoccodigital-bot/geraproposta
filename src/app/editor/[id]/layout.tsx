import { EditorProvider } from "@/contexts/EditorContext";

/* ============================================
   EDITOR [ID] LAYOUT
   Wrapper com EditorProvider para o contexto
   ============================================ */

export default function EditorIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EditorProvider>{children}</EditorProvider>;
}
