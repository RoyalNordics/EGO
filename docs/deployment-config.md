
# Deployment Configuration – EGO Platform

This file defines the current deployment setup for the EGO Custom Bags system.

---

## 🌐 Environments

### Production
- **Frontend**: Vercel (recommended)
- **Backend/API**: Render or Railway
- **Database**: Supabase (PostgreSQL)

### Staging (optional)
- Separate branch or project-based environment with test data

---

## 🔐 Environment Variables

Use `.env.example` as template. Required variables:

- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`

---

## 🚀 CI/CD Setup

### Vercel
- Auto-deploy on `main` branch push
- Connected via GitHub
- Environment vars set in project settings

### GitHub Actions (optional for backend)
- Build, test and deploy flow
- Sample: `.github/workflows/deploy.yml`

---

## 🔗 Live URLs

| Service    | URL                            |
|------------|---------------------------------|
| Frontend   | https://ego.vercel.app         |
| Backend    | https://ego-api.onrender.com   |
| Admin UI   | https://ego.vercel.app/admin   |
| API Docs   | https://ego-api.onrender.com/docs |

> These are placeholders. Update with actual URLs after deployment.

---

_Last updated: 2025-03_
