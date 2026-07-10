# ShieldDrive — Auto Insurance Quote Engine

A Next.js app for comparing and quoting auto insurance rates. Collects lead data, validates against known vehicle combinations, and stores submissions for downstream processing.

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or [Supabase](https://supabase.com) free tier)
- npm

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (transaction pooler, port 6543 with `?pgbouncer=true`) |
| `DIRECT_URL` | PostgreSQL direct connection (session mode, port 5432 — used by Prisma migrations) |

> **Supabase users:** Use the **Pooler** connection string (port 6543) for `DATABASE_URL` and the **Session pooler** / direct connection (port 5432) for `DIRECT_URL`.

### Install Dependencies

```bash
npm install
```

### Database Migrations

Run the Prisma migration to create the schema:

```bash
npx prisma migrate dev --name init
```

### Seed Vehicle Data

Seed the database with ~3600 vehicle combinations (15 years x 19 makes x ~8 models):

```bash
npx prisma db seed
```

This runs `prisma/seed.ts`, which reads `prisma/seed-data.json` and inserts rows into the `vehicles` table using `createMany` with `skipDuplicates: true`.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Vehicle Seed Data — How It Was Generated

The make/model list was produced by prompting a LLM with:

> *"List 15 of the most popular auto manufacturers in the United States, and for each manufacturer list 5–8 of their most common passenger-vehicle models. Return the data as a JSON object."*

The response was copied into `scripts/generate-vehicles-data.ts`, which iterates over years 2012–2026 and expands the make×model matrix into 3600+ `{ year, make, model }` records, writing them to `prisma/seed-data.json`.

To regenerate:

```bash
npx tsx scripts/generate-vehicles-data.ts
```

The seed script (`prisma/seed.ts`) reads this JSON file and inserts it into the database.

---

## Lighthouse / Web Vitals

<!-- UPDATE THESE WITH YOUR ACTUAL SCORES -->

| Metric | Score |
|---|---|
| Performance | ⏳ _pending_ |
| Accessibility | ⏳ _pending_ |
| Best Practices | ⏳ _pending_ |
| SEO | ⏳ _pending_ |

---

## Trade-offs & Decisions

Given the time constraints, several pragmatic choices were made. The UI uses `@base-ui/react` primitives (Select, Input, Button) via shadcn — this gave a polished look with minimal custom CSS but meant the Select component lacks built-in search/filter, which would be nice for the vehicle dropdowns. 

The lead schema is duplicated between the client (Zod + react-hook-form, where `carYear` is a string from the `<Select>`) and the server (where it arrives as a number from `JSON.parse`); unifying with `z.coerce.number()` caused type friction with `zodResolver`, so the conversion is handled explicitly in the submit handler. Prisma's `createMany` with `skipDuplicates: true` makes seeding idempotent without upsert overhead. 

Error messages are surfaced via `sonner` toasts rather than inline form errors — this is simpler but less accessible. With more time, I'd add a searchable combobox for vehicle fields, inline field-level server errors, form persistence across page reloads, and a proper rate-limiter on the leads endpoint. I chose not to add authentication since the spec only called for a public-facing lead form.
