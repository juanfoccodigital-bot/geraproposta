import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { checkRateLimit, UPLOAD_LIMIT } from "@/lib/rate-limit";

// ============================================
// POST /api/upload
// Upload de imagem para Supabase Storage
// Namespaced por user_id
// ============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const rl = checkRateLimit(`upload:${user.id}`, UPLOAD_LIMIT);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Muitas requisições de upload. Aguarde um momento." }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const proposalId = (formData.get("proposalId") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "Campo 'file' é obrigatório" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "O arquivo deve ser uma imagem" },
        { status: 400 }
      );
    }

    // Limite de 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Imagem deve ter no máximo 5MB" },
        { status: 413 }
      );
    }

    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${user.id}/${proposalId}/${timestamp}-${sanitizedFilename}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("proposal-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("proposal-images")
      .getPublicUrl(data.path);

    return NextResponse.json(
      { url: publicUrlData.publicUrl, path: data.path },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
