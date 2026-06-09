import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLogin } from "@/components/AdminLogin";
import { getAdminSession } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Sign in · Admin" };

export default async function LoginPage() {
  // Already signed in? Go straight to the dashboard.
  if (await getAdminSession()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <AdminLogin />
    </main>
  );
}
