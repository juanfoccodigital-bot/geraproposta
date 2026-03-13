/**
 * Detecta se estamos em uma pagina publica (proposta, biolink, site compartilhado)
 * ou em um subdominio (slug.geraproposta.com).
 */

import { useState, useEffect } from "react";

/**
 * Dominios que sao o app principal (nao subdominio/custom domain).
 * Tudo que NAO estiver aqui e tratado como pagina publica externa.
 */
const MAIN_HOSTS = [
  "geraproposta.com",
  "www.geraproposta.com",
  "localhost",
];

function isMainApp(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return MAIN_HOSTS.includes(host);
}

function isExternalDomain(): boolean {
  if (typeof window === "undefined") return true; // safe default: hide promo
  return !isMainApp();
}

export function isPublicPage(pathname: string): boolean {
  return (
    isExternalDomain() ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/link/") ||
    pathname.startsWith("/site/")
  );
}

/**
 * Paginas onde o banner/popup/botao de promo devem aparecer.
 * Tudo que NAO estiver aqui fica limpo (editores, propostas, biolinks, etc).
 */
const PROMO_ALLOWED_PATHS = [
  "/",
  "/pricing",
  "/promo",
  "/login",
  "/signup",
  "/suporte",
  "/privacidade",
  "/dashboard",
  "/templates",
  "/nicho",
];

export function isPromoPage(pathname: string): boolean {
  if (isExternalDomain()) return false;
  return PROMO_ALLOWED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

/**
 * Hook para promo visibility. Começa false (escondido) e
 * so mostra apos confirmar no client que e pagina de promo.
 */
export function useIsPromoPage(pathname: string): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isPromoPage(pathname));
  }, [pathname]);

  return show;
}

/**
 * Hook que retorna true se estamos em pagina publica.
 * Funciona corretamente com SSR — começa true (escondido) e
 * so mostra apos confirmar que NAO e pagina publica no client.
 */
export function useIsPublicPage(pathname: string): boolean {
  const [isPublic, setIsPublic] = useState(true); // default: escondido (safe)

  useEffect(() => {
    setIsPublic(isPublicPage(pathname));
  }, [pathname]);

  return isPublic;
}
