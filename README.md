# PhorLearn App

PhorLearn is a learning platform built for Senior High School (SHS) students in Ghana. It brings curriculum-aligned resources together in one place — including links to YouTube video lessons and WASSCE past questions — to help students study smarter. Beyond academics, the app guides students through career choices, educates them on health and wellness, and tracks their learning progress over time.

## What it offers

- **Study resources** — curated materials, downloadable notes, and YouTube video lessons across core and elective SHS subjects.
- **WASSCE past questions** — timed quizzes (2020–2023) with one-question-at-a-time review, instant feedback, explanations, and score tracking.
- **Career guidance** — helps students explore career paths and the subjects/grades that lead to them.
- **Health & wellness** — interactive lessons on the human body, exercise, nutrition, mental health, and a myth-buster game.
- **Progress tracking** — subject progress bars, weekly study stats, a WASSCE countdown, and achievements.
- **AI Study Helper** — a context-aware chat assistant for subject-specific WASSCE help.
- **Role-based dashboards** — tailored experiences for Students, Teachers, Parents, and Admins.

## Tech stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions & API Routes
- **Database:** MySQL 8 (`mysql2`)
- **Auth:** Custom JWT sessions (`jose`) with `bcryptjs` password hashing
- **AI:** Google Gemini API

## Getting started

```bash
cd phorlearn-app
npm install
# configure your .env.local (MySQL credentials, AUTH_SECRET, GEMINI_API_KEY)
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `phorlearn-app/` — the Next.js application
- `phorlearn-app/supabase/schema.sql` — MySQL database schema
- `PhorLearn-SHS-Documentation.pdf` — full project documentation (problem statement, solution, PDR, walkthrough)
