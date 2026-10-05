# BSEBWALA Government Jobs & Recruitment API

Production-ready Next.js/Vercel API for government job and recruitment data for **bsebwala.in**.

## Stack
- Next.js 15 / TypeScript
- Vercel serverless routes
- GitHub Actions scheduler (keeps frequent refreshes off Vercel Hobby Cron)
- PostgreSQL + Prisma
- Zod-ready validation layer

## Setup
```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Vercel
1. Push this project to GitHub.
2. Import into Vercel.
3. Add `DATABASE_URL`, `CRON_SECRET`, and `ADMIN_SECRET` environment variables.
4. Deploy.
5. Run Prisma migrations against production DB (`npx prisma migrate deploy`).
6. **Do not configure a Vercel Cron for frequent refreshes.** Vercel Hobby only permits one Cron execution per day. This project therefore leaves `vercel.json` without a Cron configuration.
7. In GitHub repository **Settings → Secrets and variables → Actions**, add:
   - `API_BASE_URL` = `https://bsebwala-jobs-api.vercel.app` (or your final Vercel URL)
   - `CRON_SECRET` = the same value used in Vercel's `CRON_SECRET` environment variable
8. The included `.github/workflows/refresh.yml` calls `/api/cron/refresh` four times per day. You can also run it manually from **GitHub → Actions → Refresh BSEBWALA Jobs API → Run workflow**.

### Why GitHub Actions?
Vercel Hobby Cron is limited to once per day. GitHub Actions scheduled workflows support schedules as frequent as every 5 minutes, although scheduled runs can be delayed during high-load periods. Standard GitHub-hosted runner usage is free for public repositories. This project uses four runs/day as a practical low-cost schedule.

**Important:** GitHub scheduled workflows in public repositories can be automatically disabled after 60 days with no repository activity. Keep the repository active or re-enable the workflow if GitHub disables it.

## Endpoints
- `GET /api/health`
- `GET /api/jobs`
- `GET /api/jobs/latest`
- `GET /api/jobs/:id-or-slug`
- `GET /api/news`
- `GET /api/news/latest`
- `GET /api/home`
- `GET /api/sources`
- `GET /api/cron/refresh` (protected; called by GitHub Actions)

### Job filtering
```text
/api/jobs?q=railway
/api/jobs?qualification=10th
/api/jobs?qualification=12th&state=Bihar
/api/jobs?category=SSC&status=APPLICATION_OPEN
/api/jobs?sort=deadline&page=1&limit=20
```

## Important live-data note
The project deliberately does **not** fabricate current recruitment data or use a generic scraper against arbitrary websites. Each official source needs a compliant adapter (RSS/API/HTML parser where permitted), then the normalized record should be verified against the official notification. The source registry is ready for these adapters.

## BSEBWALA frontend
```js
const API = 'https://bsebwala-jobs-api.vercel.app';
const res = await fetch(`${API}/api/jobs?qualification=12th&state=Bihar`);
const data = await res.json();
```

Production CORS is restricted to `https://bsebwala.in` by default.
