# PhorLearn SHS — Auth System

A **Next.js 15 (App Router) + Supabase** authentication system with role-based
dashboards, styled with **Tailwind CSS**. Built from the PhorLearn SHS prototype.

Users sign up by choosing a **role** (Student, Teacher, Parent, Admin) and — for
students — an **SHS class** (SHS1/2/3) and **programme** (General Science, General
Arts, Business, etc.). Role and class are stored in a Supabase `profiles` table,
and users are redirected to a **role-specific dashboard** after login.

---

## Features

- Email/password **sign up** and **login** via Supabase Auth
- Role selection on signup → stored in `profiles.role`
- SHS class + programme stored in `profiles.shs_class` / `profiles.programme`
- Automatic profile creation on signup (Postgres trigger)
- **Role-based redirect** after login (`/dashboard/student`, `/teacher`, `/parent`, `/admin`)
- Route protection + session refresh via Next.js **middleware**
- Row Level Security so users can only read/write their own profile
- Tailwind UI matching the PhorLearn dark/blue/gold theme

---

## Tech stack

| Layer    | Choice                              |
| -------- | ----------------------------------- |
| Framework| Next.js 15 (App Router, TypeScript) |
| Auth/DB  | Supabase (`@supabase/ssr`)          |
| Styling  | Tailwind CSS 3                      |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
   This creates the `profiles` table, RLS policies, and the signup trigger.
3. (Recommended for demos) **Authentication → Providers → Email** and turn
   **"Confirm email" OFF** so signups log in instantly. Otherwise users must
   confirm via email before they can log in.

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in from **Supabase → Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How the auth flow works

```
/ (splash) → /signup → pick role + details → Supabase signUp
                                               │
                          trigger creates profiles row
                                               │
        session? ── yes ──► /dashboard/<role>
                └─ no ───► /login?registered=1 (email confirm on)

/login → signInWithPassword → read profiles.role → /dashboard/<role>
```

- **`middleware.ts`** refreshes the session on every request, blocks
  unauthenticated access to `/dashboard/*`, and bounces logged-in users away
  from `/login` and `/signup`.
- **`requireProfile(role)`** in `lib/auth.ts` guards each dashboard: a logged-in
  user visiting the wrong role's dashboard is redirected to their own.

---

## Project structure

```
phorlearn-app/
├─ app/
│  ├─ page.tsx                 # Splash / welcome
│  ├─ signup/page.tsx          # Role + class + programme signup
│  ├─ login/page.tsx           # Login
│  ├─ auth/actions.ts          # signUp / login / signOut server actions
│  └─ dashboard/
│     ├─ page.tsx              # Redirects to role dashboard
│     ├─ student/page.tsx
│     ├─ teacher/page.tsx
│     ├─ parent/page.tsx
│     └─ admin/page.tsx
├─ components/
│  ├─ Logo.tsx
│  └─ DashboardShell.tsx       # Shared topbar + widgets
├─ lib/
│  ├─ roles.ts                 # Role/class/programme definitions + redirect map
│  ├─ auth.ts                  # requireProfile() guard
│  └─ supabase/
│     ├─ client.ts             # Browser client
│     ├─ server.ts             # Server-component / action client
│     └─ middleware.ts         # Session refresh + route protection
├─ middleware.ts
└─ supabase/schema.sql         # profiles table, RLS, signup trigger
```

---

## Notes

- The anon key is safe to expose in the browser; RLS protects the data.
- To create an **admin** during a demo, simply sign up and pick the Admin role
  (in production you'd restrict admin creation).
