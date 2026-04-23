# Implementation Plan: Bridge AI Dashboard

## Overview
A personal business dashboard at `/dashboard` on the existing Bridge AI static site. Auth via Supabase magic link (Hayden only). Three modules: Projects kanban board, Invoices, and Article pipeline with AI generation.

## Architecture Decisions

- **No framework migration** — vanilla HTML/JS + Supabase JS client via CDN. Keeps the existing site untouched.
- **Supabase for auth + data** — magic link auth (no password), three tables: `projects`, `invoices`, `articles`.
- **Vercel serverless function** for AI article generation — keeps Anthropic API key server-side.
- **SortableJS via CDN** for kanban drag-and-drop — no build step needed.
- **Single HTML file** at `dashboard/index.html` — JS switches between panels, no page reloads.

## Dependency Graph

```
Supabase tables (projects, invoices, articles)
    │
    ├── Auth flow (magic link login → session)
    │       │
    │       └── Dashboard shell (sidebar nav, panel switching, logout)
    │               │
    │               ├── Projects kanban (CRUD + drag)
    │               ├── Invoices list (CRUD + paid toggle)
    │               └── Articles pipeline (CRUD + AI generate)
    │
    └── /api/generate-article (Vercel function → Anthropic)
```

## Kanban Columns
Lead → Discovery → Proposal → Building → Delivered → Closed

## Phase 1: Foundation

### Task 1: Supabase setup
Create Supabase project and run SQL for all three tables with RLS.

**Tables:**
```sql
-- projects
id, client_name, project_name, tier (focused/signature/studio),
stage (lead/discovery/proposal/building/delivered/closed),
start_date, delivery_date, value, notes, created_at

-- invoices
id, project_id (FK), amount, due_date, paid (bool),
description, created_at

-- articles
id, title, slug, status (idea/draft/published),
publish_date, content, created_at
```

RLS: all tables `auth.uid() IS NOT NULL` (any logged-in user = Hayden).

**Files:** Supabase dashboard only (no local files)

### Task 2: Auth page
`dashboard/index.html` — shows a login screen (email input + "Send magic link" button) when no session. On auth, hides login and shows dashboard shell.

**Files:** `dashboard/index.html`, `dashboard/dashboard.js`, `dashboard/dashboard.css`

### Task 3: Dashboard shell
Sidebar with three nav items (Projects, Invoices, Articles), main content area that switches panels on click. Logout button. Matches Bridge AI design system (dark sidebar, gold accent).

**Files:** `dashboard/index.html`, `dashboard/dashboard.js`, `dashboard/dashboard.css`

---

### Checkpoint 1
- [ ] Can send magic link to hayden.kerr@lifetraq.com
- [ ] Magic link logs in and shows empty dashboard
- [ ] Sidebar nav switches between three empty panels
- [ ] Logout works

---

## Phase 2: Projects Kanban

### Task 4: Projects CRUD
JS functions: loadProjects(), createProject(), updateProjectStage(), deleteProject(). Modal form for create/edit.

**Files:** `dashboard/dashboard.js`

### Task 5: Kanban UI
Six columns rendered from `STAGES` array. Project cards in each column with client name, tier badge, value. SortableJS for drag-and-drop between columns (calls updateProjectStage on drop). "New project" button opens modal.

**Files:** `dashboard/dashboard.js`, `dashboard/dashboard.css`

---

### Checkpoint 2
- [ ] Can create a project card
- [ ] Card appears in correct column
- [ ] Can drag card between columns — stage updates in Supabase
- [ ] Can delete a project

---

## Phase 3: Invoices

### Task 6: Invoices CRUD
JS functions: loadInvoices(), createInvoice(), togglePaid(), deleteInvoice(). Linked to project via project_id dropdown.

**Files:** `dashboard/dashboard.js`

### Task 7: Invoices UI
Table view: client name (from project), description, amount, due date, paid toggle (checkbox), delete. "New invoice" button opens modal. Overdue invoices highlighted.

**Files:** `dashboard/dashboard.js`, `dashboard/dashboard.css`

---

### Checkpoint 3
- [ ] Can create an invoice linked to a project
- [ ] Invoice shows in table with correct project name
- [ ] Can toggle paid/unpaid
- [ ] Overdue (unpaid + past due date) rows are highlighted

---

## Phase 4: Article Pipeline

### Task 8: Articles CRUD
JS functions: loadArticles(), createArticle(), updateArticleStatus(), deleteArticle().

**Files:** `dashboard/dashboard.js`

### Task 9: Articles UI
Three-column status board: Ideas | Draft | Published. Cards show title and date. "New article" button. Click card to open edit modal with title, slug, content textarea, status selector, publish date.

**Files:** `dashboard/dashboard.js`, `dashboard/dashboard.css`

### Task 10: AI generation + Vercel function
`/api/generate-article.js` — receives `{ title }`, calls Anthropic API (claude-sonnet-4-6), returns article body. "Generate" button in article edit modal calls this endpoint and populates content textarea.

**Files:** `api/generate-article.js`

---

### Checkpoint 4
- [ ] Can create an article and move it between Ideas/Draft/Published
- [ ] "Generate" button returns AI-drafted article body
- [ ] Content is editable after generation

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase magic link goes to spam | High | Test immediately in Task 2 |
| Vercel function needs ANTHROPIC_API_KEY env var | Medium | Add via Vercel dashboard before Task 10 |
| Dashboard URL is publicly accessible if someone guesses it | Low | Supabase auth blocks all data reads without session; UI shows login screen |

## Open Questions
None — ready to build.
