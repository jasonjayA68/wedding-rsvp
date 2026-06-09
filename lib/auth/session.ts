/**
 * Stateless, signed session tokens (a minimal JWS) built on `node:crypto`.
 *
 * This file is intentionally free of any `next/*` imports so it can be used in
 * both the Proxy (`proxy.ts`) and the server-side Data Access Layer
 * (`lib/auth/dal.ts`). The token is an HMAC-SHA256 signed payload:
 *
 *     base64url(payloadJSON).base64url(hmac)
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "wr_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  /** Admin id. */
  sub: string;
  email: string;
  /** Issued-at (seconds). */
  iat: number;
  /** Expiry (seconds). */
  exp: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "Missing or too-short ADMIN_SESSION_SECRET. Generate one with `openssl rand -base64 32` and add it to your env.",
    );
  }
  return secret;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string): string {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

/** Create a signed token for the given admin. `nowSeconds` is injectable for tests. */
export function createSessionToken(
  admin: { id: string; email: string },
  nowSeconds: number = Math.floor(Date.now() / 1000),
): string {
  const payload: SessionPayload = {
    sub: admin.id,
    email: admin.email,
    iat: nowSeconds,
    exp: nowSeconds + SESSION_MAX_AGE_SECONDS,
  };
  const encoded = base64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

/** Verify a token's signature + expiry. Returns the payload or null. */
export function verifySessionToken(
  token: string | undefined | null,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): SessionPayload | null {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  // Fail closed: any error (e.g. a missing secret) is treated as "no session".
  try {
    // Constant-time signature comparison.
    const expected = sign(encoded);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    );

    if (typeof payload.exp !== "number" || payload.exp < nowSeconds) return null;

    return payload;
  } catch {
    return null;
  }
}
