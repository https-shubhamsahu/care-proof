<p align="center">
  <img src="src/assets/logo.png" width="80" alt="CareProof Logo" style="border-radius: 50%;" />
</p>

<h1 align="center">CareProof</h1>

<p align="center">
  <strong>Turn invisible caregiving into verified economic power.</strong><br/>
  A platform that recognises, quantifies, and certifies unpaid caregiving work — producing a CareScore, economic valuation, and professional portfolio that lenders, employers, and policymakers can actually use.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-CSS-0EA5E9?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Tests" src="https://img.shields.io/badge/Tests-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" />
</p>

---

## ✨ What It Does

Millions of caregivers — those who look after elderly parents, children with special needs, or family members recovering from illness — spend thousands of hours each year doing work that the formal economy completely ignores. That gap means no credit history from it, no proof of professional skills, and no route to re-enter the workforce without explaining a "career gap."

**CareProof fixes that.**

| Feature | Description |
|---|---|
| 🔴 **CareScore (0–1000)** | A single metric capturing responsibility, consistency, and complexity of caregiving |
| 💛 **Economic Valuation** | Live INR valuation using India's Replacement Cost Methodology |
| 📋 **Verified Portfolio** | Professional, printable document replacing "career gap" with verified caregiving tenure |
| 🌏 **Community Layer** | Real aggregate stats showing caregivers they're part of a growing movement |
| 🔐 **Private by Default** | You control verification and sharing; data is encrypted and never sold |

---

## 🏗 Architecture

```
care-proof/
├── src/
│   ├── pages/               # Route-level pages (Index, Auth, Upload, Dashboard, ...)
│   ├── components/          # Reusable UI components + shadcn/ui library
│   │   └── ui/              # 51 shadcn/ui primitives
│   ├── hooks/
│   │   └── useCareData.ts   # All Supabase queries (react-query)
│   ├── services/
│   │   └── documentAnalysis.ts  # Document classification engine (AI integration point)
│   ├── integrations/
│   │   ├── supabase/        # Supabase client + TypeScript types
│   │   └── lovable/         # Lovable OAuth proxy
│   └── index.css            # Global design tokens + Tailwind
├── supabase/
│   └── migrations/          # SQL migrations (run in Supabase SQL editor)
└── public/                  # Static assets
```

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v3 + CSS custom properties |
| UI Components | shadcn/ui (Radix UI primitives) |
| Animation | Framer Motion |
| 3D Globe | Three.js via @react-three/fiber + @react-three/drei |
| Auth | Supabase Auth + Google OAuth |
| Database | Supabase (PostgreSQL) |
| State / Cache | @tanstack/react-query |
| Routing | react-router-dom v6 |
| Forms | react-hook-form + zod |
| Typography | Outfit (headings) + Plus Jakarta Sans (body) |

---

## 🗄 Database Schema

```sql
care_entries      — individual caregiving activities (hours, skills, evidence files)
care_scores       — computed CareScore per user (auto-updated by trigger)
care_valuations   — economic INR valuation per user (auto-updated by trigger)
community_stats   — platform-wide aggregate stats (auto-updated by trigger)
```

Scores and valuations are calculated automatically via a PostgreSQL trigger every time a care entry is created, updated, or deleted — no server-side code required.

**Score Formula:**
- `Responsibility` (max 400 pts) = hours × 1.8
- `Consistency` (max 350 pts) = distinct months × 45
- `Complexity` (max 250 pts) = unique skills × 20

**Valuation Method:** India Replacement Cost — `hours × ₹450/hr` (configurable)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- A [Supabase](https://supabase.com) project with Google OAuth enabled

### 1 — Clone & Install

```bash
git clone https://github.com/your-username/care-proof.git
cd care-proof
npm install
```

### 2 — Set Up Environment Variables

Create a `.env` file at the project root (never commit this file):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

Find these in your Supabase project → **Settings → API**.

### 3 — Run the Database Migration

1. Open your Supabase project → **SQL Editor**
2. Paste and run the contents of `supabase/migrations/20260308_initial_schema.sql`

This creates all tables, RLS policies, triggers, and the storage bucket.

### 4 — Configure Google OAuth

1. Go to Supabase → **Authentication → Providers → Google**
2. Enable Google and paste your Google OAuth credentials
3. Add `http://localhost:5173` to the allowed redirect URLs

> **Using Lovable?** The `@lovable.dev/cloud-auth-js` proxy handles OAuth automatically when deployed via Lovable.

### 5 — Start Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint with TypeScript rules |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 🛣 Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page — hero, how it works, features, FAQ |
| `/auth` | Public | Google sign-in |
| `/upload` | 🔒 Protected | Upload care evidence → AI analysis → save to DB |
| `/dashboard` | 🔒 Protected | CareScore gauge, economic value, timeline, portfolio |
| `/future-security` | 🔒 Protected | Lifetime valuation, transferable skills, career readiness |
| `/community` | 🔒 Protected | Platform-wide stats, caregiver spotlight, 3D globe |

---

## 🧠 Adding Real AI Document Parsing

The upload flow uses a heuristic filename classifier by default. To integrate a real AI:

1. Open `src/services/documentAnalysis.ts`
2. Replace the body of `analyseDocument(file: File)` with your AI/OCR call:

```typescript
// Example: Google Gemini Vision API
export async function analyseDocument(file: File): Promise<ExtractedEntryWithDate> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/analyse", { method: "POST", body: formData });
  const data = await res.json();

  return {
    activity: data.activity,
    date: data.date,           // display date string
    isoDate: data.isoDate,     // YYYY-MM-DD
    hours: data.hoursLabel,
    hoursValue: data.hours,
    skills: data.skills,
    careType: data.careType,
  };
}
```

The interface exposed to `Upload.tsx` stays identical — no other files need to change.

---

## 🎨 Design System

### Colour Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` / `--terracotta` | Warm coral `#D97B7B` | Lighter coral | Brand, CTAs |
| `--gold` | Amber `#F2B53A` | Soft amber | Economic value, premium UI |
| `--verified` | Sage green `#7EB862` | Lighter sage | Trust badges, verification |

### Key CSS Classes

```css
.glass-card       /* Frosted-glass card with backdrop-blur */
.glow-primary     /* Terracotta ambient glow shadow */
.glow-gold        /* Gold ambient glow shadow */
.glow-verified    /* Sage green ambient glow shadow */
.text-gradient-primary / .text-gradient-gold / .text-gradient-verified
.font-heading     /* Outfit typeface */
```

---

## 🔒 Security

- **Row-Level Security** is enabled on all Supabase tables — users can only read/write their own data
- **Storage policies** restrict evidence files to the uploading user's folder
- **`.env` is git-ignored** — never commits secrets
- **OAuth tokens** are managed by Supabase and never stored in application state longer than necessary

---

## 🗺 Roadmap

- [ ] **Real AI document parsing** (Gemini Vision / AWS Textract integration)
- [ ] **PDF portfolio export** (react-pdf or Puppeteer server-side)
- [ ] **Shareable portfolio links** with granular access control
- [ ] **Email notifications** when a care entry is verified
- [ ] **Recurring care templates** (e.g. "Daily elder care — 2 hrs")
- [ ] **Multi-language support** (Hindi, Tamil, Telugu)
- [ ] **Lender API** — standardised format for partner banks/NBFCs
- [ ] **Progressive Web App** (offline uploads, mobile camera support)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

Please follow the existing code style (TypeScript strict, Tailwind classes over inline styles, react-query for all async data).

---

## 📄 License

No `LICENSE` file is currently present in this repository. Add one (e.g. MIT) to make usage terms explicit.

---

<p align="center">
  Built with ❤️ for the 450 million unpaid caregivers in India whose work deserves to be seen.
</p>
