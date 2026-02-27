/* ============================================
   VIDEO URL PARSER
   Extrai IDs de YouTube e Vimeo
   ============================================ */

export function parseVideoUrl(url: string): { provider: "youtube" | "vimeo" | null; id: string | null } {
  if (!url) return { provider: null, id: null };

  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return { provider: "youtube", id: ytMatch[1] };

  // Vimeo: vimeo.com/ID, player.vimeo.com/video/ID
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
  );
  if (vimeoMatch) return { provider: "vimeo", id: vimeoMatch[1] };

  return { provider: null, id: null };
}

export function getEmbedUrl(url: string, autoplay: boolean): string | null {
  const { provider, id } = parseVideoUrl(url);
  if (!provider || !id) return null;

  const params = autoplay ? "?autoplay=1&mute=1" : "";

  if (provider === "youtube") return `https://www.youtube.com/embed/${id}${params}`;
  if (provider === "vimeo") return `https://player.vimeo.com/video/${id}${params}`;

  return null;
}
