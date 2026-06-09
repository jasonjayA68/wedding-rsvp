import { logout } from "@/app/admin/actions";
import { LogoutIcon } from "@/components/Icons";
import { siteContent } from "@/data/site-content";
import { requireAdmin } from "@/lib/auth/dal";

/**
 * Protected admin shell. `requireAdmin()` is the authoritative server-side
 * check (the Proxy is only an optimistic gate). Lives in a `(dashboard)` route
 * group so it wraps the dashboard but NOT the public `/admin/login` page.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const { couple } = siteContent;

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="sticky top-0 z-20 border-b border-cream-200 bg-cream-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-script text-3xl leading-none text-sage-700">
              {couple.partnerOne[0]}&amp;{couple.partnerTwo[0]}
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg text-ink-800">Guest Manager</p>
              <p className="hidden text-xs text-ink-400 sm:block">{session.email}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink-500 transition hover:bg-cream-100 hover:text-ink-800"
            >
              <LogoutIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-ink-800">Guest responses</h1>
          <p className="mt-1 text-sm text-ink-500">View, edit, search, and export your wedding RSVPs.</p>
        </div>
        {children}
      </main>
    </div>
  );
}
