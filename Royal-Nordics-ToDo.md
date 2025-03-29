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

## Task 011 Checklist

*   [x] Verify that environment variables are injected correctly in both the frontend and backend.
*   [x] Ensure that the URL mapping between the frontend and backend is working correctly.
*   [x] Verify that CORS rules are set correctly for API calls.
*   [x] Ensure that redirects and rewrites are handled correctly (e.g., Next.js config or `_redirects`-fil).
*   [x] Set up logging and monitoring (console logs + Sentry/logtail-integration where possible).
*   [x] Deploy frontend to Vercel.
*   [x] Set up Supabase PostgreSQL database.
