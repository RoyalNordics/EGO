# System Instructions – EGO Platform

This file is a living companion to the Roo Build Masterplan. It provides a high-level overview of the build sections, component responsibilities, and critical workflows for AI execution and human reference.

---

## 🔍 Purpose

To serve as a fast reference for developers, AI agents (like Roo), and reviewers working on the EGO platform.  
Use this file to understand what each phase of the build does, and how to evaluate completion or continue work.

---

## 📚 Roo Build Sections Overview

| Section | Title                                | Description |
|---------|--------------------------------------|-------------|
| 004     | UI Integration                       | Design flow UI with all 6 steps and local design state |
| 005     | API + Backend                        | REST endpoints for design, order, and tracking |
| 006     | Business Logic                       | Core functions: price, order, design ID logic |
| 007     | 2D → 3D Integration                  | Integrate preview component and sync with design config |
| 008     | Admin UI                             | Interfaces to manage models, materials, pricing |
| 009     | Tracking + Supplier Status           | Order tracking views and supplier update panel |
| 010     | QA & Tests                           | Functional tests, logs, and reporting |
| 011     | Deployment                           | Deploy to Vercel/Render + environment setup |
| 012     | Wrap-Up & Completion                 | Set project to completed, mark status |
| 013     | Structure & Conventions              | Folder hierarchy, naming, commit styles |

---

## 🛠️ Conventions

- **Component Naming**: `PascalCase.tsx`
- **Variables**: `camelCase`
- **Routes/API**: `snake_case` or kebab-case for files
- **Commits**: `[task-id] Description`

---

## 📁 Expected Directory Structure

```
/ego-platform
├── /ui                → Frontend components & pages
├── /api               → REST endpoints
├── /logic             → Design + price logic
├── /admin             → Admin panel UIs
├── /tools             → 2D/3D converters
├── /data              → Configurations
├── /public            → Assets
├── /tests             → Unit & integration tests
└── /docs              → All documentation (incl. Roo Masterplan)
```

---

## ✅ Completion Flow (AI agents)

1. Finish a task
2. Update:
   - `ai-communication.md` (last step only)
   - `roo.runplan.json`
   - `build.status.json`
3. Commit:
   ```bash
   git add .
   git commit -m "[task-id] Completed X"
   git push
   ```

---

## 🧩 Roo-specific Behaviors

- Always check the `roo_build_masterplan.adoc` before any task.
- If info is missing → write a note in `Royal-Nordics-ToDo.md`
- Resume work when manual step is resolved.

---

Last synced with Roo Masterplan: v1.0 — March 2025