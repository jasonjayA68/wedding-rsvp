import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "@/lib/auth/session";

/**
 * Data Access Layer for admin auth.
 *
 * `getAdminSession` is memoized per render pass with React `cache` so repeated
 * calls in a single request don't re-verify the token. Use it in Server
 * Components, Server Actions, and Route Handlers.
 */
export const getAdminSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
});

/**
 * Require an authenticated admin. Redirects to the login page when the session
 * is missing or invalid. Returns the session for authorized callers.
 *
 * Use in Server Components and Server Actions. (Route Handlers should use
 * `getAdminSession` and return a 401 instead of redirecting.)
 */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
