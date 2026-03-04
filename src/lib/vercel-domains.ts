/**
 * Vercel Domain API — auto-add/remove custom domains from the project.
 *
 * Required env vars:
 *   VERCEL_TOKEN        — Vercel API token (Settings → Tokens)
 *   VERCEL_PROJECT_ID   — Project ID (Settings → General → Project ID)
 *   VERCEL_TEAM_ID      — (optional) Team ID if project is under a team
 */

const VERCEL_API = "https://api.vercel.com";

function getConfig() {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return null;
  }

  return { token, projectId, teamId };
}

function buildUrl(path: string, teamId?: string) {
  const url = new URL(path, VERCEL_API);
  if (teamId) url.searchParams.set("teamId", teamId);
  return url.toString();
}

/**
 * Add a custom domain to the Vercel project.
 * Returns { success, error?, configurationNeeded? }
 */
export async function addDomainToVercel(domain: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const config = getConfig();
  if (!config) {
    console.warn("[vercel-domains] VERCEL_TOKEN or VERCEL_PROJECT_ID not set — skipping domain add");
    return { success: true }; // Don't block the save
  }

  try {
    const res = await fetch(
      buildUrl(`/v10/projects/${config.projectId}/domains`, config.teamId),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: domain }),
      }
    );

    if (res.ok) {
      console.log(`[vercel-domains] Added domain: ${domain}`);
      return { success: true };
    }

    // Domain already exists on this project — that's fine
    if (res.status === 409) {
      return { success: true };
    }

    const body = await res.json().catch(() => ({}));
    const msg = body?.error?.message || `HTTP ${res.status}`;
    console.error(`[vercel-domains] Failed to add ${domain}:`, msg);
    return { success: false, error: msg };
  } catch (err) {
    console.error(`[vercel-domains] Error adding ${domain}:`, err);
    return { success: false, error: "Falha ao conectar com Vercel API" };
  }
}

/**
 * Remove a custom domain from the Vercel project.
 */
export async function removeDomainFromVercel(domain: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const config = getConfig();
  if (!config) {
    return { success: true };
  }

  try {
    const res = await fetch(
      buildUrl(`/v9/projects/${config.projectId}/domains/${domain}`, config.teamId),
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      }
    );

    if (res.ok || res.status === 404) {
      console.log(`[vercel-domains] Removed domain: ${domain}`);
      return { success: true };
    }

    const body = await res.json().catch(() => ({}));
    const msg = body?.error?.message || `HTTP ${res.status}`;
    console.error(`[vercel-domains] Failed to remove ${domain}:`, msg);
    return { success: false, error: msg };
  } catch (err) {
    console.error(`[vercel-domains] Error removing ${domain}:`, err);
    return { success: false, error: "Falha ao conectar com Vercel API" };
  }
}
