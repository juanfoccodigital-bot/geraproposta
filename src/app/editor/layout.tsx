/* ============================================
   EDITOR LAYOUT
   Layout raiz do /editor — sub-rotas como
   /editor/[id] possuem seus próprios providers
   ============================================ */

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
