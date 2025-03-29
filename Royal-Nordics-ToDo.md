## Missing Environment Variables

## Frontend Deployment to Vercel

1.  Add the GitHub repository to Vercel.
2.  In Vercel's "Project Settings", add the environment variables from `bag-pattern-converter 3/frontend.env.production`.
3.  Select `main` as the deploy branch.

## Backend Deployment to Render

1.  Upload the repository to Render (or Railway).
2.  Select Node.js as the environment (or the appropriate runtime).
3.  Configure the environment variables from `ego-platform/api/backend.env.production`.
4.  Set the build command and start command (e.g., `npm run start`).

## Supabase PostgreSQL Setup

1.  Create a hosted PostgreSQL database in Supabase.
2.  Import the SQL schema if necessary.

## Integration Testing

1.  Verify that the UI can call the API with production URLs.
2.  Validate the admin login and flow.
3.  Ensure that order tracking and 3D preview are displayed correctly.
*   `DATABASE_URL` (for ego-platform/api/.env.production)
*   `STRIPE_SECRET_KEY` (for ego-platform/api/.env.production)
*   `SUPABASE_URL` (for ego-platform/api/.env.production)
*   `SUPABASE_ANON_KEY` (for ego-platform/api/.env.production)
The `git pull` command returned an undefined exit code. Please confirm that the instructions for task 011 - Deployment have been added to `docs/roo_build_masterplan.adoc`.
