# Dave &amp; Eliza — Wedding RSVP

An elegant, editable wedding/event RSVP website with a public invitation page and a
secure admin dashboard for managing guest responses.

Built with **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** ·
**Supabase** · deploy-ready for **Vercel**.

- 🌿 Beautiful, mobile-first invitation (hero, details, schedule, RSVP form)
- ✍️ All content edited from **one file** (`data/site-content.ts`)
- 🎨 Colors &amp; fonts edited from **one place** (`app/globals.css`)
- 🔐 Secure admin dashboard: view, edit status, change guest count, search, filter,
  delete, and export to CSV
- ⏱️ Live countdown, form validation, loading + success/error states

---

## 1. Project structure

```
wedding-rsvp/
├── app/
│   ├── globals.css                  # Tailwind v4 theme — EDIT COLORS & FONTS HERE
│   ├── layout.tsx                   # Root layout (fonts + metadata)
│   ├── page.tsx                     # Public page: Hero + EventDetails + RSVP + Footer
│   ├── actions/
│   │   ├── rsvp.ts                  # submitRsvp (public Server Action)
│   │   └── admin.ts                 # updateStatus / updateGuestCount / deleteParticipant
│   ├── admin/
│   │   ├── actions.ts               # login / logout Server Actions
│   │   ├── login/page.tsx           # /admin/login
│   │   └── (dashboard)/             # route group → protected, wraps /admin only
│   │       ├── layout.tsx           # auth shell (requireAdmin + header + sign out)
│   │       └── page.tsx             # /admin dashboard (fetches participants)
│   └── api/admin/export/route.ts    # GET CSV export (admin only)
├── components/
│   ├── Hero.tsx                     # ┐
│   ├── EventDetails.tsx             # │ public sections
│   ├── RSVPForm.tsx                 # │ (client form)
│   ├── Countdown.tsx                # │
│   ├── SiteFooter.tsx               # ┘
│   ├── AdminLogin.tsx               # admin login form
│   ├── AdminDashboard.tsx           # stat cards + participant list
│   ├── ParticipantList.tsx         # search / filter / inline edit / delete / export
│   ├── AdminTable.tsx               # reusable data-table component
│   ├── Botanical.tsx / Icons.tsx    # decorative SVGs + icon set
│   └── ui/                          # Button, Field, Badge, Section, SubmitButton, inputs
├── data/
│   └── site-content.ts             # ALL editable text & event info
├── lib/
│   ├── supabase/server.ts          # service-role Supabase client (server only)
│   ├── auth/                        # password (scrypt), session (HMAC), dal (requireAdmin)
│   ├── validation.ts               # zod schemas
│   ├── csv.ts / format.ts / cn.ts  # helpers
│   └── types.ts                    # domain types (mirror the SQL schema)
├── proxy.ts                        # Next.js 16 "Proxy" (renamed middleware) — guards /admin
├── scripts/hash-password.mjs       # generate an admin password hash
├── supabase/schema.sql             # database setup (run in Supabase SQL editor)
└── .env.example                    # required environment variables
```

### How it works (architecture)

- **All database access is server-side** through a Supabase client that uses the
  **service-role key** (`lib/supabase/server.ts`). The public RSVP form and every
  admin action go through Server Actions / Route Handlers.
- **Row Level Security is enabled with no public policies** (see `schema.sql`), so the
  public `publishable`/`anon` key has *zero* access to your data. The service-role key
  (server only) bypasses RLS — security by default.
- **Admin auth** is custom and dependency-free: passwords are hashed with scrypt and
  stored in the `admins` table; sessions are signed HMAC cookies (`node:crypto`). The
  `proxy.ts` file is an optimistic gate; the real check is `requireAdmin()` inside the
  admin layout and every admin action.

---

## 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and **Run**. This creates the
   `events`, `participants`, and `admins` tables, enables RLS, and seeds your event.
3. Get your keys from **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ keep secret, server only)

### Create your admin login

Running `supabase/schema.sql` (or `supabase/seed-admin.sql`) seeds a default admin:

| Username | Password   |
| -------- | ---------- |
| `admin`  | `Pass123!` |

> ⚠️ This is a weak demo password. **Change it before going live.** Generate a
> new hash with `npm run hash-password -- 'your-strong-password'`, then re-run the
> insert in `supabase/seed-admin.sql` with the new hash. (The login accepts any
> username or email — it's just the unique identifier stored in `admins.email`.)

You can now sign in at `/admin/login`.

---

## 3. Local setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   then fill in NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SESSION_SECRET

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/admin> for the
dashboard.

### Environment variables

| Variable                          | Required | Where it's used | Notes |
| --------------------------------- | :------: | --------------- | ----- |
| `NEXT_PUBLIC_SUPABASE_URL`        | ✅       | server          | Project URL (Settings → API). |
| `SUPABASE_SERVICE_ROLE_KEY`       | ✅       | server only     | `service_role` secret. **Never** exposed to the browser. |
| `ADMIN_SESSION_SECRET`            | ✅       | server only     | Signs admin cookies. Generate with `openssl rand -base64 32`. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ⬜  | unused          | Not needed (all access is server-side); kept for reference. |

---

## 4. Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com/new), **Import** the repository (framework auto-detects
   as Next.js — no build settings to change).
3. Under **Settings → Environment Variables**, add the three required variables from the
   table above (for the **Production** and **Preview** environments).
4. **Deploy.** That's it.

> Re-run `supabase/schema.sql` against your production Supabase project (or use the same
> project) and create your admin row there too.

---

## 5. Editing the site later

| I want to change…                         | Edit this file |
| ----------------------------------------- | -------------- |
| Names, dates, venue, copy, schedule, RSVP deadline | `data/site-content.ts` |
| Colors &amp; fonts                        | `app/globals.css` (the `@theme` block) |
| Section order / layout of the public page | `app/page.tsx` |
| Detail cards (add / remove / reorder)     | `data/site-content.ts` → `details.cards` |
| Add a photo to the hero                   | drop it in `public/` and reference it in a component |

Everything in `data/site-content.ts` is strongly typed, so your editor will catch typos.

---

## Available scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |
| `npm run hash-password -- '…'` | Generate an admin password hash |
