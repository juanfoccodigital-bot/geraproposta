import { redirect } from "next/navigation";

/* Redireciona para o dashboard — o editor agora exige um ID de proposta */
export default function EditorPage() {
  redirect("/dashboard");
}
