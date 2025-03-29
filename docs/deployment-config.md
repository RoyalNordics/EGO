# Deployment Configuration – EGO Platform

This document outlines the active deployment environment and procedures for the EGO Custom Bags platform.

---

## 🌐 Environments

### Production
- **Frontend**: Vercel (connected to GitHub)
- **Backend/API**: Render (Node.js environment)
- **Database**: Supabase (PostgreSQL)

---

## 🔐 Environment Variables

These must be added to both frontend and backend platforms:

- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Use the `.env.example` file to manage expected variables.

---

## 🚀 Deployment Steps

1. Clone GitHub repository or connect repo in Vercel and Render
2. Create `.env.production` files in each environment
3. Deploy frontend to Vercel:
   - Set GitHub as source
   - Add all environment variables under Project Settings
   - Configure build and output (Next.js default)
4. Deploy backend/API to Render:
   - Node.js runtime
   - Set environment variables
   - Configure build (`npm install`) and start (`npm start`)
5. Provision Supabase PostgreSQL instance
6. Upload schema.sql if schema is available
7. Test live connection between frontend ↔ API ↔ database

---

## 🔗 Live URLs (to be confirmed)

| Service    | URL                            |
|------------|---------------------------------|
| Frontend   | https://ego.vercel.app         |
| Backend    | https://ego-api.onrender.com   |
| Admin UI   | https://ego.vercel.app/admin   |
| API Docs   | https://ego-api.onrender.com/docs |

---

Last updated: 2025-03-29