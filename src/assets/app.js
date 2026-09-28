// mavis-pincher-pages — site JS (no build, vanilla ES modules)

// Where the pincher API lives. For local dev, run the worker and set this to localhost.
// For production, set to https://superinstance.dev or your deployed Worker URL.
const PINCHER = window.PINCHER_URL || 'https://superinstance.dev';

// Load the static dataset shipped in /data/repos.json (same as the Worker).
// Fall back to fetching from the pincher API if local fetch fails.
async function loadRepos() {
  try {
    const r = await fetch('/data/repos.json');
    if (r.ok) return await r.json();
  } catch (_) {}
  try {
    const r = await fetch(`${PINCHER}/v1/repos?limit=200`);
    if (r.ok) {
      const d = await r.json();
      return { records: d.records, families: d.records.reduce((acc, r) => {
        acc[r.family] = (acc[r.family] || 0) + 1;
        return acc;
      }, {}) };
    }
  } catch (_) {}
  return null;
}

const FAMILY_DESC = {
  jev:    'JEV (Joint Embedding Validator) — the canon-promotion oracle',
  latent: 'JEPA / latent-grid worlds — predictions of representations',
  moth:   'Moth / quantum substrate — the smallest quantum lane',
  qthe:   'QTHE — 8-bit ternary hyper-embeddings, the canonical primitive',
  quilt:  'The Quilt canvas — substrate walkers and games',
  fleet:  'The organs — seedbox, watcher, dashboard',
  other:  'Everything else — honest residue, not failure',
};

function renderFamilies(families) {
  const grid = document.getElementById('family-grid');
  if (!grid) return;
  const order = ['jev','latent','moth','qthe','quilt','fleet','other'];
  grid.innerHTML = order
    .filter(f => families[f])
    .map(f => `
      <a class="family-tile" href="/family/${f}.html">
        <h3>${f}</h3>
        <div class="count">${families[f]}</div>
        <p class="desc">${FAMILY_DESC[f] || ''}</p>
      </a>`)
    .join('');
}

function renderRecent(records) {
  const list = document.getElementById('recent-list');
  if (!list) return;
  const top = [...records]
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 15);
  list.innerHTML = top.map(r => `
    <div class="recent-item">
      <span class="family-tag">${r.family}</span>
      <a class="name" href="https://github.com/${r.owner}/${r.name}" target="_blank">${r.owner}/${r.name}</a>
      <span class="desc">${(r.description || '').slice(0, 80)}${(r.description || '').length > 80 ? '…' : ''}</span>
      <span class="date">${r.pushed_at.slice(0, 10)}</span>
    </div>`).join('');
}

function setDatasetGen(ds) {
  const el = document.getElementById('dataset-gen');
  if (el && ds.generated) el.textContent = ds.generated.slice(0, 10);
}

function setSiteGen() {
  const el = document.getElementById('site-gen');
  if (el) el.textContent = new Date().toISOString().slice(0, 16).replace('T', ' ');
}

async function main() {
  setSiteGen();
  const ds = await loadRepos();
  if (ds) {
    renderFamilies(ds.families);
    renderRecent(ds.records);
    setDatasetGen(ds);
  }
}

main().catch(e => {
  console.error('pincher-pages load failed', e);
});
