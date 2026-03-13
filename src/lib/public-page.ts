/**
 * Detecta se estamos em uma pagina publica (proposta, biolink, site compartilhado)
 * ou em um subdominio (slug.geraproposta.com).
 */

import { useState, useEffect } from "react";

const APP_DOMAIN = "geraproposta.com";

function isSubdomain(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host.endsWith(`.${APP_DOMAIN}`) &&
    host !== `www.${APP_DOMAIN}` &&
    host !== APP_DOMAIN
  );
}

export function isPublicPage(pathname: string): boolean {
  return (
    isSubdomain() ||
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
  if (isSubdomain()) return false;
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
