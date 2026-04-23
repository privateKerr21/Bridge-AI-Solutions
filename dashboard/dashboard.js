const SUPABASE_URL = 'https://quysbqaprphckxcvitzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eXNicWFwcnBoY2t4Y3ZpdHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NzQ3MjcsImV4cCI6MjA5MjU1MDcyN30.6i7mcV_gUSE4zQkM8vQUppL8UbqYcwDFcl3xVmZpBAI';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { detectSessionInUrl: true }
});

const STAGES = ['lead', 'discovery', 'proposal', 'building', 'delivered', 'closed'];
const STAGE_LABELS = { lead:'Lead', discovery:'Discovery', proposal:'Proposal', building:'Building', delivered:'Delivered', closed:'Closed' };
const TIER_LABELS  = { focused:'Focused', signature:'Signature', studio:'Studio' };

let projects = [], invoices = [], articles = [];
let editingId = null;

// Escape user-supplied strings before inserting into HTML
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── AUTH ──────────────────────────────────────────────────────────

async function init() {
  const { data: { session } } = await sb.auth.getSession();
  session ? showDashboard() : showLogin();
  sb.auth.onAuthStateChange((_e, s) => s ? showDashboard() : showLogin());
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';
}

async function showDashboard() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'flex';
  await Promise.all([loadProjects(), loadInvoices(), loadArticles()]);
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const btn   = document.getElementById('login-btn');
  const msg   = document.getElementById('login-message');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.href }
  });
  if (error) {
    msg.textContent = error.message;
    msg.style.color = '#c0392b';
  } else {
    msg.textContent = 'Magic link sent — check your email.';
    msg.style.color = '#2d6a2d';
  }
  btn.disabled = false;
  btn.textContent = 'Send Magic Link';
});

document.getElementById('logout-btn').addEventListener('click', () => sb.auth.signOut());

// ── NAV ───────────────────────────────────────────────────────────

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});

// ── PROJECTS ──────────────────────────────────────────────────────

async function loadProjects() {
  const { data } = await sb.from('projects').select('*').order('created_at');
  projects = data || [];
  renderKanban();
}

function renderKanban() {
  const kanban = document.getElementById('kanban');
  kanban.innerHTML = '';

  STAGES.forEach(stage => {
    const cards = projects.filter(p => p.stage === stage);
    const col = document.createElement('div');
    col.className = 'kanban-col';
    col.dataset.stage = stage;

    const header = document.createElement('div');
    header.className = 'kanban-col-header';
    header.innerHTML = `<span>${esc(STAGE_LABELS[stage])}</span><span class="kanban-count">${cards.length}</span>`;

    const cardList = document.createElement('div');
    cardList.className = 'kanban-cards';
    cardList.id = 'cards-' + stage;
    cards.forEach(p => cardList.appendChild(buildProjectCard(p)));

    col.appendChild(header);
    col.appendChild(cardList);
    kanban.appendChild(col);
  });

  STAGES.forEach(stage => {
    new Sortable(document.getElementById('cards-' + stage), {
      group: 'projects',
      animation: 150,
      onEnd: async ({ item, to }) => {
        const newStage = to.closest('.kanban-col').dataset.stage;
        await sb.from('projects').update({ stage: newStage }).eq('id', item.dataset.id);
        const p = projects.find(p => p.id === item.dataset.id);
        if (p) p.stage = newStage;
        document.querySelectorAll('.kanban-col').forEach(col => {
          col.querySelector('.kanban-count').textContent =
            col.querySelectorAll('.kanban-card').length;
        });
      }
    });
  });
}

function buildProjectCard(p) {
  const card = document.createElement('div');
  card.className = 'kanban-card';
  card.dataset.id = p.id;

  const top = document.createElement('div');
  top.className = 'card-top';

  const badge = document.createElement('span');
  badge.className = `tier-badge tier-${p.tier}`;
  badge.textContent = TIER_LABELS[p.tier] || p.tier;

  const del = document.createElement('button');
  del.className = 'card-delete';
  del.textContent = '✕';
  del.onclick = (e) => { e.stopPropagation(); deleteProject(p.id); };

  top.appendChild(badge);
  top.appendChild(del);

  const client = document.createElement('div');
  client.className = 'card-client';
  client.textContent = p.client_name;

  const project = document.createElement('div');
  project.className = 'card-project';
  project.textContent = p.project_name;

  card.appendChild(top);
  card.appendChild(client);
  card.appendChild(project);

  if (p.value) {
    const val = document.createElement('div');
    val.className = 'card-value';
    val.textContent = '$' + Number(p.value).toLocaleString();
    card.appendChild(val);
  }

  const editBtn = document.createElement('button');
  editBtn.className = 'card-edit';
  editBtn.textContent = 'Edit';
  editBtn.onclick = (e) => { e.stopPropagation(); openProjectModal(p.id); };
  card.appendChild(editBtn);

  return card;
}

function openProjectModal(id = null) {
  editingId = id;
  const p = id ? projects.find(p => p.id === id) : null;

  const form = document.createElement('form');
  form.id = 'project-form';

  form.innerHTML = `
    <h3>${p ? 'Edit Project' : 'New Project'}</h3>
    <label>Client Name<input type="text" name="client_name" required></label>
    <label>Project Name<input type="text" name="project_name" required></label>
    <label>Tier
      <select name="tier">
        ${['focused','signature','studio'].map(t => `<option value="${t}">${TIER_LABELS[t]}</option>`).join('')}
      </select>
    </label>
    <label>Stage
      <select name="stage">
        ${STAGES.map(s => `<option value="${s}">${STAGE_LABELS[s]}</option>`).join('')}
      </select>
    </label>
    <label>Value ($)<input type="number" name="value" min="0" step="0.01"></label>
    <div class="form-row">
      <label>Start Date<input type="date" name="start_date"></label>
      <label>Delivery Date<input type="date" name="delivery_date"></label>
    </div>
    <label>Notes<textarea name="notes" rows="3"></textarea></label>
    <button type="submit" class="btn-primary">${p ? 'Save Changes' : 'Create Project'}</button>`;

  // Set values safely via DOM properties (not innerHTML) to avoid XSS
  if (p) {
    form.querySelector('[name="client_name"]').value  = p.client_name   || '';
    form.querySelector('[name="project_name"]').value = p.project_name  || '';
    form.querySelector('[name="tier"]').value         = p.tier          || 'focused';
    form.querySelector('[name="stage"]').value        = p.stage         || 'lead';
    form.querySelector('[name="value"]').value        = p.value         || '';
    form.querySelector('[name="start_date"]').value   = p.start_date    || '';
    form.querySelector('[name="delivery_date"]').value= p.delivery_date || '';
    form.querySelector('[name="notes"]').value        = p.notes         || '';
  }

  form.addEventListener('submit', saveProject);

  const content = document.getElementById('modal-content');
  content.innerHTML = '';
  content.appendChild(form);
  openModal();
}

async function saveProject(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Saving…';

  const data = formData(e.target);
  ['value','start_date','delivery_date','notes'].forEach(k => { if (!data[k]) delete data[k]; });

  const { error } = editingId
    ? await sb.from('projects').update(data).eq('id', editingId)
    : await sb.from('projects').insert(data);

  btn.disabled = false; btn.textContent = orig;
  if (error) { alert('Save failed: ' + error.message); return; }
  closeModal();
  await loadProjects();
}

async function deleteProject(id) {
  if (!confirm('Delete this project and its invoices?')) return;
  await sb.from('projects').delete().eq('id', id);
  await loadProjects();
  await loadInvoices();
}

// ── INVOICES ──────────────────────────────────────────────────────

async function loadInvoices() {
  const { data } = await sb.from('invoices')
    .select('*, projects(client_name, project_name)')
    .order('due_date');
  invoices = data || [];
  renderInvoices();
}

function renderInvoices() {
  const tbody = document.getElementById('invoice-tbody');
  tbody.innerHTML = '';

  if (!invoices.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.className = 'empty';
    td.textContent = 'No invoices yet.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  invoices.forEach(inv => {
    const overdue  = !inv.paid && inv.due_date && inv.due_date < today;
    const projName = inv.projects
      ? `${inv.projects.client_name} — ${inv.projects.project_name}`
      : '—';

    const tr = document.createElement('tr');
    if (overdue) tr.classList.add('overdue');

    const cells = [
      projName,
      inv.description || '—',
      '$' + Number(inv.amount).toLocaleString(),
      inv.due_date || '—'
    ];
    cells.forEach(text => {
      const td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });

    const paidTd = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = inv.paid;
    checkbox.onchange = () => togglePaid(inv.id, checkbox.checked);
    paidTd.appendChild(checkbox);
    tr.appendChild(paidTd);

    const delTd = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'card-delete';
    delBtn.textContent = '✕';
    delBtn.onclick = () => deleteInvoice(inv.id);
    delTd.appendChild(delBtn);
    tr.appendChild(delTd);

    tbody.appendChild(tr);
  });
}

function openInvoiceModal() {
  editingId = null;
  const form = document.createElement('form');
  form.id = 'invoice-form';
  form.innerHTML = `
    <h3>New Invoice</h3>
    <label>Project
      <select name="project_id" required>
        <option value="">Select project...</option>
        ${projects.map(p => `<option value="${esc(p.id)}">${esc(p.client_name)} — ${esc(p.project_name)}</option>`).join('')}
      </select>
    </label>
    <label>Description<input type="text" name="description"></label>
    <label>Amount ($)<input type="number" name="amount" min="0" step="0.01" required></label>
    <label>Due Date<input type="date" name="due_date"></label>
    <button type="submit" class="btn-primary">Create Invoice</button>`;
  form.addEventListener('submit', saveInvoice);
  const content = document.getElementById('modal-content');
  content.innerHTML = '';
  content.appendChild(form);
  openModal();
}

async function saveInvoice(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Saving…';

  const data = formData(e.target);
  if (!data.due_date)    delete data.due_date;
  if (!data.description) delete data.description;

  const { error } = await sb.from('invoices').insert(data);

  btn.disabled = false; btn.textContent = orig;
  if (error) { alert('Save failed: ' + error.message); return; }
  closeModal();
  await loadInvoices();
}

async function togglePaid(id, paid) {
  await sb.from('invoices').update({ paid }).eq('id', id);
  const inv = invoices.find(i => i.id === id);
  if (inv) inv.paid = paid;
  renderInvoices();
}

async function deleteInvoice(id) {
  if (!confirm('Delete this invoice?')) return;
  await sb.from('invoices').delete().eq('id', id);
  await loadInvoices();
}

// ── ARTICLES ──────────────────────────────────────────────────────

async function loadArticles() {
  const { data } = await sb.from('articles').select('*').order('created_at', { ascending: false });
  articles = data || [];
  renderArticles();
}

function renderArticles() {
  ['idea','draft','published'].forEach(status => {
    const col = document.getElementById('col-' + status);
    col.innerHTML = '';
    const filtered = articles.filter(a => a.status === status);
    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'article-empty';
      empty.textContent = 'None yet';
      col.appendChild(empty);
      return;
    }
    filtered.forEach(a => col.appendChild(buildArticleCard(a)));
  });
}

function buildArticleCard(a) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.onclick = () => openArticleModal(a.id);

  const title = document.createElement('div');
  title.className = 'article-card-title';
  title.textContent = a.title;
  card.appendChild(title);

  const date = a.publish_date || (a.created_at ? a.created_at.split('T')[0] : '');
  if (date) {
    const dateEl = document.createElement('div');
    dateEl.className = 'article-card-date';
    dateEl.textContent = date;
    card.appendChild(dateEl);
  }

  return card;
}

function openArticleModal(id = null) {
  editingId = id;
  const a = id ? articles.find(a => a.id === id) : null;

  const form = document.createElement('form');
  form.id = 'article-form';
  form.innerHTML = `
    <h3>${a ? 'Edit Article' : 'New Article'}</h3>
    <label>Title<input type="text" name="title" required></label>
    <label>Slug<input type="text" name="slug" placeholder="how-to-automate-your-business"></label>
    <label>Status
      <select name="status">
        ${['idea','draft','published'].map(s => `<option value="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
    </label>
    <label>Publish Date<input type="date" name="publish_date"></label>
    <div class="content-label-row">
      <span>Content</span>
      <button type="button" class="btn-generate" id="gen-btn">⚡ Generate with AI</button>
    </div>
    <textarea name="content" id="article-content" rows="12"></textarea>
    <button type="submit" class="btn-primary">${a ? 'Save Changes' : 'Create Article'}</button>
    ${a ? '<button type="button" id="del-article-btn" style="background:none;border:none;color:#c0392b;cursor:pointer;font-size:0.82rem;text-align:left">Delete article</button>' : ''}`;

  // Set values safely
  if (a) {
    form.querySelector('[name="title"]').value        = a.title        || '';
    form.querySelector('[name="slug"]').value         = a.slug         || '';
    form.querySelector('[name="status"]').value       = a.status       || 'idea';
    form.querySelector('[name="publish_date"]').value = a.publish_date || '';
    form.querySelector('[name="content"]').value      = a.content      || '';
  }

  form.querySelector('#gen-btn').addEventListener('click', generateArticle);
  form.addEventListener('submit', saveArticle);
  if (a) {
    form.querySelector('#del-article-btn').addEventListener('click', () => deleteArticle(a.id));
  }

  const content = document.getElementById('modal-content');
  content.innerHTML = '';
  content.appendChild(form);
  openModal();
}

async function generateArticle() {
  const title = document.querySelector('#article-form [name="title"]').value.trim();
  if (!title) { alert('Enter a title first.'); return; }
  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  btn.textContent = '⚡ Generating...';
  try {
    const res = await fetch('/api/generate-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const { content, error } = await res.json();
    if (error) throw new Error(error);
    document.getElementById('article-content').value = content;
  } catch (err) {
    alert('Generation failed: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = '⚡ Generate with AI';
  }
}

async function saveArticle(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Saving…';

  const data = formData(e.target);
  ['slug','publish_date','content'].forEach(k => { if (!data[k]) delete data[k]; });

  const { error } = editingId
    ? await sb.from('articles').update(data).eq('id', editingId)
    : await sb.from('articles').insert(data);

  btn.disabled = false; btn.textContent = orig;
  if (error) { alert('Save failed: ' + error.message); return; }
  closeModal();
  await loadArticles();
}

async function deleteArticle(id) {
  if (!confirm('Delete this article?')) return;
  await sb.from('articles').delete().eq('id', id);
  closeModal();
  await loadArticles();
}

// ── MODAL ─────────────────────────────────────────────────────────

function openModal()  { document.getElementById('modal-overlay').style.display = 'flex'; }
function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  editingId = null;
}

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ── HELPERS ───────────────────────────────────────────────────────

function formData(form) {
  return Object.fromEntries(new FormData(form));
}

// ── BOOT ──────────────────────────────────────────────────────────

init();
