"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation";

export type LoginState = { error?: string };

/**
 * Admin login. Looks up the admin by email, verifies the scrypt password hash,
 * and on success sets a signed, httpOnly session cookie. Errors are
 * intentionally generic to avoid leaking which emails exist.
 */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Please enter your email and password." };
  }

  const email = parsed.data.email.toLowerCase();
  const supabase = getSupabaseAdmin();
  const { data: admin } = await supabase
    .from("admins")
    .select("id, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  const ok = admin ? await verifyPassword(parsed.data.password, admin.password_hash) : false;
  if (!admin || !ok) {
    return { error: "Invalid email or password." };
  }

  const token = createSessionToken({ id: admin.id, email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
