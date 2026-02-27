/* ============================================
   RATE LIMITER
   In-memory rate limiting para API routes.
   Usa sliding window por IP/identificador.
   ============================================ */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Limpa entradas expiradas a cada 60s
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 60_000);

interface RateLimitConfig {
  /** Janela de tempo em segundos */
  windowSeconds: number;
  /** Máximo de requisições na janela */
  maxRequests: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Verifica rate limit para um identificador (IP, userId, etc.)
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + config.windowSeconds * 1000,
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowSeconds * 1000 };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt };
}

// ---- Presets de limite por tipo de rota ----

/** Rotas de escrita (POST, PUT, DELETE) - 30 req/min */
export const WRITE_LIMIT: RateLimitConfig = { windowSeconds: 60, maxRequests: 30 };

/** Rotas de leitura (GET) - 60 req/min */
export const READ_LIMIT: RateLimitConfig = { windowSeconds: 60, maxRequests: 60 };

/** Rotas de IA - 5 req/min */
export const AI_LIMIT: RateLimitConfig = { windowSeconds: 60, maxRequests: 5 };

/** Rotas de upload - 15 req/min */
export const UPLOAD_LIMIT: RateLimitConfig = { windowSeconds: 60, maxRequests: 15 };

/** Rotas públicas (views) - 30 req/min por IP */
export const PUBLIC_LIMIT: RateLimitConfig = { windowSeconds: 60, maxRequests: 30 };

/**
 * Extrai IP do request para rate limiting
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}
