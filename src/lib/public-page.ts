/**
 * Detecta se estamos em uma pagina publica (proposta, biolink, site compartilhado)
 * ou em um subdominio (slug.geraproposta.com).
 * Funciona tanto no server quanto no client.
 */

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
