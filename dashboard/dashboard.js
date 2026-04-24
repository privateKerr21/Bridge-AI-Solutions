const SUPABASE_URL = 'https://quysbqaprphckxcvitzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eXNicWFwcnBoY2t4Y3ZpdHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NzQ3MjcsImV4cCI6MjA5MjU1MDcyN30.6i7mcV_gUSE4zQkM8vQUppL8UbqYcwDFcl3xVmZpBAI';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { detectSessionInUrl: true }
});

const STAGES = ['lead', 'discovery', 'proposal', 'building', 'delivered', 'closed'];
const STAGE_LABELS = { lead:'Lead', discovery:'Discovery', proposal:'Proposal', building:'Building', delivered:'Delivered', closed:'Closed' };
const TIER_LABELS  = { focused:'Focused', signature:'Signature', studio:'Studio' };

let projects = [], invoices = [], articles = [], clients = [];
let clientTasks = [], clientMilestones = [];
let editingId = null, activeClientId = null, modalClientId = null;

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
  await Promise.all([loadProjects(), loadInvoices(), loadArticles(), loadClients()]);
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
    options: { emailRedirectTo: window.location.origin + '/dashboard' }
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

  if (p.client_id) {
    card.style.cursor = 'pointer';
    card.onclick = () => switchToClientView(p.client_id);
  }

  return card;
}

function openProjectModal(id = null, presetClientId = null) {
  editingId = id;
  modalClientId = presetClientId;
  const p = id ? projects.find(p => p.id === id) : null;

  const form = document.createElement('form');
  form.id = 'project-form';

  form.innerHTML = `
    <h3>${p ? 'Edit Project' : 'New Project'}</h3>
    <label>Client<select name="client_id"></select></label>
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

  // Populate client dropdown via DOM (safe, no innerHTML)
  const clientSel = form.querySelector('[name="client_id"]');
  const blankOpt = document.createElement('option');
  blankOpt.value = ''; blankOpt.textContent = '— Unlinked —';
  clientSel.appendChild(blankOpt);
  clients.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id; opt.textContent = c.name;
    clientSel.appendChild(opt);
  });

  // Set values safely via DOM properties (not innerHTML) to avoid XSS
  const selectedClientId = p ? (p.client_id || '') : (modalClientId || '');
  clientSel.value = selectedClientId;
  if (p) {
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

  // Sync client_name from clients array for display fallback
  if (data.client_id) {
    const c = clients.find(c => c.id === data.client_id);
    if (c) data.client_name = c.name;
  } else {
    delete data.client_id;
  }

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
    <div id="pipeline-status" class="pipeline-status"></div>
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

  const btn    = document.getElementById('gen-btn');
  const status = document.getElementById('pipeline-status');

  btn.disabled = true;
  btn.textContent = '⚡ Running pipeline…';
  status.textContent = '';

  try {
    // 1 — Generate initial draft
    status.textContent = '⏳ Generating draft…';
    const genRes  = await fetch('/api/generate-article', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ title }) });
    const genData = await genRes.json();
    if (genData.error) throw new Error(genData.error);
    let content = genData.content;

    // 2 — Scan for AI (skip gracefully if key not configured)
    status.textContent = '✓ Draft ready  ·  ⏳ Scanning for AI…';
    let score1 = null, score2 = null;
    try {
      const scan1 = await callDetect(content);
      score1 = scan1.score;
    } catch (detectErr) {
      // GPTZero key not yet configured — skip detection + humanization
      document.getElementById('article-content').value = content;
      status.textContent = '✓ Draft generated (add GPTZERO_API_KEY to enable humanization)';
      return;
    }

    // 3 — Humanize if needed
    if (score1 > 30) {
      status.textContent = `✓ Draft ready  ·  AI: ${score1}%  ·  ⏳ Humanizing…`;
      const humRes  = await fetch('/api/humanize-article', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ title, content }) });
      const humData = await humRes.json();
      if (humData.error) throw new Error(humData.error);
      content = humData.content;

      // 4 — Re-scan
      status.textContent = `✓ Draft ready  ·  AI: ${score1}%  ·  ✓ Humanized  ·  ⏳ Final scan…`;
      try {
        const scan2 = await callDetect(content);
        score2 = scan2.score;
      } catch (_) { /* key gone mid-run, ignore */ }
    }

    document.getElementById('article-content').value = content;
    status.textContent = score1 > 30
      ? `✓ Done  ·  AI score: ${score1}% → ${score2 ?? '?'}%`
      : `✓ Done  ·  AI score: ${score1}% (no humanization needed)`;

  } catch (err) {
    alert('Generation failed: ' + err.message);
    status.textContent = '';
  } finally {
    btn.disabled = false;
    btn.textContent = '⚡ Generate with AI';
  }
}

async function callDetect(text) {
  const res  = await fetch('/api/detect-ai', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ text }) });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
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

// ── CLIENTS ───────────────────────────────────────────────────────

async function loadClients() {
  const { data } = await sb.from('clients').select('*').order('name');
  clients = data || [];
  renderClientList();
}

function renderClientList() {
  const list = document.getElementById('client-list');
  if (!list) return;
  list.innerHTML = '';

  if (!clients.length) {
    const empty = document.createElement('div');
    empty.className = 'client-list-empty';
    empty.textContent = 'No clients yet.';
    list.appendChild(empty);
    return;
  }

  clients.forEach(c => {
    const projectCount = projects.filter(p => p.client_id === c.id).length;
    const item = document.createElement('div');
    item.className = 'client-list-item' + (c.id === activeClientId ? ' active' : '');
    item.dataset.id = c.id;

    const top = document.createElement('div');
    top.className = 'client-list-item-top';

    const dot = document.createElement('span');
    dot.className = 'client-status-dot status-' + c.status;

    const name = document.createElement('span');
    name.className = 'client-list-name';
    name.textContent = c.name;

    const badge = document.createElement('span');
    badge.className = 'tier-badge tier-' + c.tier;
    badge.textContent = TIER_LABELS[c.tier] || c.tier;

    top.appendChild(dot); top.appendChild(name); top.appendChild(badge);

    const meta = document.createElement('div');
    meta.className = 'client-list-meta';
    meta.textContent = (c.industry || '') + (c.industry && projectCount ? '  ·  ' : '') + projectCount + ' project' + (projectCount !== 1 ? 's' : '');

    item.appendChild(top); item.appendChild(meta);
    item.addEventListener('click', () => selectClient(c.id));
    list.appendChild(item);
  });
}

async function selectClient(id) {
  activeClientId = id;
  document.querySelectorAll('.client-list-item').forEach(el =>
    el.classList.toggle('active', el.dataset.id === id)
  );
  const [taskRes, msRes] = await Promise.all([
    sb.from('tasks').select('*').eq('client_id', id).order('created_at'),
    sb.from('milestones').select('*').eq('client_id', id).order('date')
  ]);
  clientTasks = taskRes.data || [];
  clientMilestones = msRes.data || [];
  renderClientDetail(id);
}

function switchToClientView(clientId) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelector('[data-panel="clients"]').classList.add('active');
  document.getElementById('panel-clients').classList.add('active');
  selectClient(clientId);
}

function renderClientDetail(clientId) {
  const client = clients.find(c => c.id === clientId);
  if (!client) return;

  const detail = document.getElementById('client-detail');
  const today  = new Date().toISOString().split('T')[0];

  const clientProjects = projects.filter(p => p.client_id === clientId);
  const clientInvoices = invoices.filter(inv => {
    const proj = projects.find(p => p.id === inv.project_id);
    return proj && proj.client_id === clientId;
  });
  const totalContracted  = clientInvoices.reduce((s, i) => s + Number(i.amount || 0), 0);
  const totalOutstanding = clientInvoices.filter(i => !i.paid).reduce((s, i) => s + Number(i.amount || 0), 0);

  detail.innerHTML = '';

  // ── Header ──
  const hdr = document.createElement('div');
  hdr.className = 'client-detail-header';

  const titleWrap = document.createElement('div');
  titleWrap.className = 'client-detail-title';

  const nameRow = document.createElement('div');
  nameRow.className = 'client-detail-name-row';
  const h2 = document.createElement('h2'); h2.textContent = client.name;
  const tierBadge = document.createElement('span');
  tierBadge.className = 'tier-badge tier-' + client.tier;
  tierBadge.textContent = TIER_LABELS[client.tier] || client.tier;
  const statusBadge = document.createElement('span');
  statusBadge.className = 'client-status-badge status-' + client.status;
  statusBadge.textContent = client.status;
  nameRow.appendChild(h2); nameRow.appendChild(tierBadge); nameRow.appendChild(statusBadge);

  const metaRow = document.createElement('div');
  metaRow.className = 'client-detail-meta';
  if (client.industry) { const s = document.createElement('span'); s.textContent = client.industry; metaRow.appendChild(s); }
  if (client.contact_name) { const s = document.createElement('span'); s.textContent = '· ' + client.contact_name; metaRow.appendChild(s); }
  if (client.contact_email) {
    const a = document.createElement('a');
    a.href = 'mailto:' + client.contact_email;
    a.textContent = client.contact_email;
    metaRow.appendChild(a);
  }

  titleWrap.appendChild(nameRow); titleWrap.appendChild(metaRow);

  const actions = document.createElement('div');
  actions.className = 'client-detail-actions';
  const editBtn = document.createElement('button'); editBtn.className = 'btn-secondary'; editBtn.textContent = 'Edit';
  editBtn.onclick = () => openClientModal(clientId);
  const delBtn = document.createElement('button'); delBtn.className = 'btn-danger'; delBtn.textContent = 'Delete';
  delBtn.onclick = () => deleteClient(clientId);
  actions.appendChild(editBtn); actions.appendChild(delBtn);

  hdr.appendChild(titleWrap); hdr.appendChild(actions);
  detail.appendChild(hdr);

  // ── Body ──
  const body = document.createElement('div');
  body.className = 'client-detail-body';

  body.appendChild(buildProjectsSection(clientProjects, clientId));
  body.appendChild(buildTasksSection(today));
  body.appendChild(buildMilestonesSection(today));
  body.appendChild(buildFinancialsSection(clientInvoices, totalContracted, totalOutstanding, today));

  detail.appendChild(body);
}

function buildProjectsSection(clientProjects, clientId) {
  const sec = document.createElement('section');
  sec.className = 'detail-section';

  const hdr = document.createElement('div');
  hdr.className = 'detail-section-header';
  const title = document.createElement('span'); title.className = 'detail-section-title'; title.textContent = 'Projects';
  const addBtn = document.createElement('button'); addBtn.className = 'btn-link'; addBtn.textContent = '+ Add';
  addBtn.onclick = () => openProjectModal(null, clientId);
  hdr.appendChild(title); hdr.appendChild(addBtn);
  sec.appendChild(hdr);

  if (!clientProjects.length) {
    const empty = document.createElement('div'); empty.className = 'detail-empty'; empty.textContent = 'No projects yet.';
    sec.appendChild(empty); return sec;
  }

  clientProjects.forEach(p => {
    const row = document.createElement('div');
    row.className = 'client-project-row';

    const info = document.createElement('div'); info.className = 'client-project-info';
    const pname = document.createElement('span'); pname.className = 'client-project-name'; pname.textContent = p.project_name;
    const tbadge = document.createElement('span'); tbadge.className = 'tier-badge tier-' + p.tier; tbadge.textContent = TIER_LABELS[p.tier] || p.tier;
    info.appendChild(pname); info.appendChild(tbadge);

    const right = document.createElement('div'); right.className = 'client-project-right';
    if (p.value) { const val = document.createElement('span'); val.className = 'client-project-value'; val.textContent = '$' + Number(p.value).toLocaleString(); right.appendChild(val); }
    const stage = document.createElement('span'); stage.className = 'stage-pill stage-' + p.stage; stage.textContent = STAGE_LABELS[p.stage];
    right.appendChild(stage);

    row.appendChild(info); row.appendChild(right);

    const editBtn = document.createElement('button'); editBtn.className = 'card-edit'; editBtn.textContent = 'Edit';
    editBtn.onclick = () => openProjectModal(p.id);
    row.appendChild(editBtn);

    sec.appendChild(row);
  });

  return sec;
}

function buildTasksSection(today) {
  const sec = document.createElement('section');
  sec.className = 'detail-section';

  const hdr = document.createElement('div'); hdr.className = 'detail-section-header';
  const title = document.createElement('span'); title.className = 'detail-section-title'; title.textContent = 'Tasks';
  hdr.appendChild(title);
  sec.appendChild(hdr);

  const list = document.createElement('div');
  list.id = 'task-list';
  list.className = 'task-list';
  sec.appendChild(list);
  renderTaskList(today);

  const addForm = document.createElement('form');
  addForm.className = 'inline-add-form';
  addForm.id = 'task-add-form';

  const titleInput = document.createElement('input');
  titleInput.type = 'text'; titleInput.name = 'title'; titleInput.placeholder = 'Add a task…'; titleInput.autocomplete = 'off';

  const priSel = document.createElement('select'); priSel.name = 'priority';
  ['p0','p1','p2','p3'].forEach((v, i) => {
    const o = document.createElement('option'); o.value = v; o.textContent = v.toUpperCase();
    if (i === 2) o.selected = true;
    priSel.appendChild(o);
  });

  const dateInput = document.createElement('input');
  dateInput.type = 'date'; dateInput.name = 'due_date';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit'; submitBtn.textContent = 'Add';

  addForm.appendChild(titleInput); addForm.appendChild(priSel);
  addForm.appendChild(dateInput); addForm.appendChild(submitBtn);
  addForm.addEventListener('submit', addTask);
  sec.appendChild(addForm);

  return sec;
}

function renderTaskList(today) {
  const list = document.getElementById('task-list');
  if (!list) return;
  list.innerHTML = '';

  if (!clientTasks.length) {
    const empty = document.createElement('div'); empty.className = 'detail-empty'; empty.textContent = 'No tasks yet.';
    list.appendChild(empty); return;
  }

  const order = { p0: 0, p1: 1, p2: 2, p3: 3 };
  const sorted = [...clientTasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    return (order[a.priority] || 2) - (order[b.priority] || 2);
  });

  sorted.forEach(t => {
    const row = document.createElement('div');
    row.className = 'task-row' + (t.status === 'done' ? ' task-done' : '');

    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.className = 'task-check';
    cb.checked = t.status === 'done';
    cb.onchange = () => toggleTask(t.id, cb.checked ? 'done' : 'todo');

    const pri = document.createElement('span'); pri.className = 'task-priority priority-' + t.priority; pri.textContent = t.priority.toUpperCase();

    const ttl = document.createElement('span'); ttl.className = 'task-title'; ttl.textContent = t.title;

    const del = document.createElement('button'); del.className = 'task-delete'; del.textContent = '✕';
    del.onclick = () => deleteTask(t.id);

    row.appendChild(cb); row.appendChild(pri); row.appendChild(ttl);

    if (t.due_date) {
      const due = document.createElement('span');
      due.className = 'task-due' + (t.due_date < today && t.status !== 'done' ? ' overdue' : '');
      due.textContent = t.due_date;
      row.appendChild(due);
    }

    row.appendChild(del);
    list.appendChild(row);
  });
}

function buildMilestonesSection(today) {
  const sec = document.createElement('section');
  sec.className = 'detail-section';

  const hdr = document.createElement('div'); hdr.className = 'detail-section-header';
  const title = document.createElement('span'); title.className = 'detail-section-title'; title.textContent = 'Milestones';
  hdr.appendChild(title);
  sec.appendChild(hdr);

  const list = document.createElement('div');
  list.id = 'milestone-list';
  list.className = 'milestone-list';
  sec.appendChild(list);
  renderMilestoneList(today);

  const addForm = document.createElement('form');
  addForm.className = 'inline-add-form';
  addForm.id = 'milestone-add-form';

  const titleInput = document.createElement('input');
  titleInput.type = 'text'; titleInput.name = 'title'; titleInput.placeholder = 'Add milestone…'; titleInput.autocomplete = 'off';

  const dateInput = document.createElement('input');
  dateInput.type = 'date'; dateInput.name = 'date'; dateInput.required = true;

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit'; submitBtn.textContent = 'Add';

  addForm.appendChild(titleInput); addForm.appendChild(dateInput); addForm.appendChild(submitBtn);
  addForm.addEventListener('submit', addMilestone);
  sec.appendChild(addForm);

  return sec;
}

function renderMilestoneList(today) {
  const list = document.getElementById('milestone-list');
  if (!list) return;
  list.innerHTML = '';

  if (!clientMilestones.length) {
    const empty = document.createElement('div'); empty.className = 'detail-empty'; empty.textContent = 'No milestones yet.';
    list.appendChild(empty); return;
  }

  const icons = { upcoming: '○', complete: '◉', missed: '✗' };

  clientMilestones.forEach(m => {
    const row = document.createElement('div');
    row.className = 'milestone-row';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'milestone-toggle ms-' + m.status;
    toggleBtn.textContent = icons[m.status] || '○';
    toggleBtn.title = 'Click to cycle status';
    toggleBtn.onclick = () => toggleMilestone(m.id, m.status);

    const info = document.createElement('div'); info.className = 'milestone-info';
    const ttl = document.createElement('span');
    ttl.className = 'milestone-title' + (m.status === 'complete' ? ' done' : '');
    ttl.textContent = m.title;
    const dateEl = document.createElement('span');
    dateEl.className = 'milestone-date' + (m.status === 'upcoming' && m.date < today ? ' overdue' : '');
    dateEl.textContent = m.date;
    info.appendChild(ttl); info.appendChild(dateEl);

    const del = document.createElement('button'); del.className = 'task-delete'; del.textContent = '✕';
    del.onclick = () => deleteMilestone(m.id);

    row.appendChild(toggleBtn); row.appendChild(info); row.appendChild(del);
    list.appendChild(row);
  });
}

function buildFinancialsSection(clientInvoices, totalContracted, totalOutstanding, today) {
  const sec = document.createElement('section');
  sec.className = 'detail-section';

  const hdr = document.createElement('div'); hdr.className = 'detail-section-header';
  const title = document.createElement('span'); title.className = 'detail-section-title'; title.textContent = 'Financials';
  hdr.appendChild(title);
  sec.appendChild(hdr);

  const stats = document.createElement('div'); stats.className = 'financials-row';
  [
    ['$' + totalContracted.toLocaleString(), 'Contracted'],
    ['$' + totalOutstanding.toLocaleString(), 'Outstanding', totalOutstanding > 0 ? 'outstanding' : ''],
    ['$' + (totalContracted - totalOutstanding).toLocaleString(), 'Collected']
  ].forEach(([val, label, cls]) => {
    const stat = document.createElement('div'); stat.className = 'financial-stat';
    const v = document.createElement('div'); v.className = 'financial-stat-value' + (cls ? ' ' + cls : ''); v.textContent = val;
    const l = document.createElement('div'); l.className = 'financial-stat-label'; l.textContent = label;
    stat.appendChild(v); stat.appendChild(l);
    stats.appendChild(stat);
  });
  sec.appendChild(stats);

  if (!clientInvoices.length) {
    const empty = document.createElement('div'); empty.className = 'detail-empty'; empty.textContent = 'No invoices.';
    sec.appendChild(empty); return sec;
  }

  const miniList = document.createElement('div'); miniList.className = 'invoice-mini-list';
  clientInvoices.forEach(inv => {
    const row = document.createElement('div');
    const overdue = !inv.paid && inv.due_date && inv.due_date < today;
    row.className = 'invoice-mini-row' + (overdue ? ' overdue' : '');

    const desc = document.createElement('span'); desc.textContent = inv.description || '—';
    const amt  = document.createElement('span'); amt.textContent  = '$' + Number(inv.amount).toLocaleString();
    const due  = document.createElement('span'); due.textContent  = inv.due_date || '—';
    const status = document.createElement('span');
    status.className = 'invoice-mini-status' + (inv.paid ? ' paid' : '');
    status.textContent = inv.paid ? '✓ Paid' : 'Unpaid';

    row.appendChild(desc); row.appendChild(amt); row.appendChild(due); row.appendChild(status);
    miniList.appendChild(row);
  });
  sec.appendChild(miniList);

  return sec;
}

// -- Client CRUD --

function openClientModal(id = null) {
  editingId = id;
  const c = id ? clients.find(c => c.id === id) : null;
  const form = document.createElement('form');
  form.innerHTML = `
    <h3>${c ? 'Edit Client' : 'New Client'}</h3>
    <label>Name<input type="text" name="name" required></label>
    <label>Tier
      <select name="tier">
        ${['focused','signature','studio'].map(t => `<option value="${t}">${TIER_LABELS[t]}</option>`).join('')}
      </select>
    </label>
    <label>Industry<input type="text" name="industry" placeholder="e.g. Healthcare, Legal, Construction"></label>
    <div class="form-row">
      <label>Contact Name<input type="text" name="contact_name"></label>
      <label>Contact Email<input type="email" name="contact_email"></label>
    </div>
    <label>Status
      <select name="status">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="complete">Complete</option>
      </select>
    </label>
    <label>Notes<textarea name="notes" rows="3"></textarea></label>
    <button type="submit" class="btn-primary">${c ? 'Save Changes' : 'Create Client'}</button>`;
  if (c) {
    form.querySelector('[name="name"]').value         = c.name          || '';
    form.querySelector('[name="tier"]').value         = c.tier          || 'focused';
    form.querySelector('[name="industry"]').value     = c.industry      || '';
    form.querySelector('[name="contact_name"]').value = c.contact_name  || '';
    form.querySelector('[name="contact_email"]').value= c.contact_email || '';
    form.querySelector('[name="status"]').value       = c.status        || 'active';
    form.querySelector('[name="notes"]').value        = c.notes         || '';
  }
  form.addEventListener('submit', saveClient);
  const content = document.getElementById('modal-content');
  content.innerHTML = '';
  content.appendChild(form);
  openModal();
}

async function saveClient(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Saving…';
  const data = formData(e.target);
  ['industry','contact_name','contact_email','notes'].forEach(k => { if (!data[k]) delete data[k]; });
  const { error } = editingId
    ? await sb.from('clients').update(data).eq('id', editingId)
    : await sb.from('clients').insert(data);
  btn.disabled = false; btn.textContent = orig;
  if (error) { alert('Save failed: ' + error.message); return; }
  const savedId = editingId;
  closeModal();
  await loadClients();
  if (savedId) selectClient(savedId);
}

async function deleteClient(id) {
  if (!confirm('Delete this client? Their tasks and milestones will also be removed.')) return;
  await sb.from('clients').delete().eq('id', id);
  activeClientId = null;
  const detail = document.getElementById('client-detail');
  if (detail) { detail.innerHTML = ''; const empty = document.createElement('div'); empty.className = 'client-detail-empty'; empty.textContent = '← Select a client'; detail.appendChild(empty); }
  await loadClients();
}

// -- Task CRUD --

async function addTask(e) {
  e.preventDefault();
  const data = formData(e.target);
  if (!data.title.trim()) return;
  if (!data.due_date) delete data.due_date;
  const { error } = await sb.from('tasks').insert({ ...data, client_id: activeClientId });
  if (error) { alert('Failed: ' + error.message); return; }
  e.target.reset();
  const { data: fresh } = await sb.from('tasks').select('*').eq('client_id', activeClientId).order('created_at');
  clientTasks = fresh || [];
  renderTaskList(new Date().toISOString().split('T')[0]);
}

async function toggleTask(id, status) {
  await sb.from('tasks').update({ status }).eq('id', id);
  const t = clientTasks.find(t => t.id === id);
  if (t) t.status = status;
  renderTaskList(new Date().toISOString().split('T')[0]);
}

async function deleteTask(id) {
  await sb.from('tasks').delete().eq('id', id);
  clientTasks = clientTasks.filter(t => t.id !== id);
  renderTaskList(new Date().toISOString().split('T')[0]);
}

// -- Milestone CRUD --

async function addMilestone(e) {
  e.preventDefault();
  const data = formData(e.target);
  if (!data.title.trim() || !data.date) return;
  const { error } = await sb.from('milestones').insert({ ...data, client_id: activeClientId });
  if (error) { alert('Failed: ' + error.message); return; }
  e.target.reset();
  const { data: fresh } = await sb.from('milestones').select('*').eq('client_id', activeClientId).order('date');
  clientMilestones = fresh || [];
  renderMilestoneList(new Date().toISOString().split('T')[0]);
}

async function toggleMilestone(id, currentStatus) {
  const next = { upcoming: 'complete', complete: 'missed', missed: 'upcoming' }[currentStatus] || 'upcoming';
  await sb.from('milestones').update({ status: next }).eq('id', id);
  const m = clientMilestones.find(m => m.id === id);
  if (m) m.status = next;
  renderMilestoneList(new Date().toISOString().split('T')[0]);
}

async function deleteMilestone(id) {
  await sb.from('milestones').delete().eq('id', id);
  clientMilestones = clientMilestones.filter(m => m.id !== id);
  renderMilestoneList(new Date().toISOString().split('T')[0]);
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

document.querySelector('.modal').addEventListener('click', e => e.stopPropagation());

// ── HELPERS ───────────────────────────────────────────────────────

function formData(form) {
  return Object.fromEntries(new FormData(form));
}

// ── BOOT ──────────────────────────────────────────────────────────

init();
