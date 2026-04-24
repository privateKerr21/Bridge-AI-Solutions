-- ── 1. NEW TABLES ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  tier          TEXT CHECK (tier IN ('focused','signature','studio')),
  industry      TEXT,
  contact_name  TEXT,
  contact_email TEXT,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','paused','complete')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title      TEXT NOT NULL,
  status     TEXT DEFAULT 'todo' CHECK (status IN ('todo','in_progress','blocked','done')),
  priority   TEXT DEFAULT 'p2' CHECK (priority IN ('p0','p1','p2','p3')),
  due_date   DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS milestones (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title      TEXT NOT NULL,
  date       DATE NOT NULL,
  status     TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','complete','missed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. EXTEND PROJECTS ───────────────────────────────────────────

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id);

-- ── 3. CLEAN UP REFINED WEALTH ───────────────────────────────────

DELETE FROM invoices
WHERE project_id IN (
  SELECT id FROM projects WHERE LOWER(client_name) LIKE '%refined%'
);

DELETE FROM projects
WHERE LOWER(client_name) LIKE '%refined%';

-- ── 4. SEED CLIENTS ──────────────────────────────────────────────

INSERT INTO clients (id, name, tier, industry, status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'LifeTraq',    'signature', 'Healthcare / Behavioral Technology', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'Green Built',  'focused',   'Construction / Sustainable Building', 'active')
ON CONFLICT (id) DO NOTHING;

-- ── 5. LINK EXISTING PROJECTS TO CLIENTS ────────────────────────

UPDATE projects
SET client_id = '11111111-1111-1111-1111-111111111111'
WHERE LOWER(client_name) LIKE '%lifetraq%';

UPDATE projects
SET client_id = '22222222-2222-2222-2222-222222222222'
WHERE LOWER(client_name) LIKE '%green built%'
   OR LOWER(client_name) LIKE '%greenbuilt%';

-- ── 6. RLS (match existing projects/invoices pattern) ────────────

ALTER TABLE clients   ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "auth users full access" ON clients
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth users full access" ON tasks
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth users full access" ON milestones
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
