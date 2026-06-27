/* ================================================================
   FEKEPEP — Client-side logic (Enhanced)
   ================================================================ */

// ── Navigation ──────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const pages    = document.querySelectorAll('.page');
const navMenu  = document.getElementById('navMenu');
const navToggle= document.getElementById('navToggle');

function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === id));
  navMenu.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => showPage(link.dataset.page));
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});

// ── SVG Icons (inline) ──────────────────────────────────────────
const ICONS = {
  download: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  view: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
};

// ── Helpers ──────────────────────────────────────────────────────

function showValidation(inputEl, msg) {
  inputEl.classList.add('error');
  let sibling = inputEl.nextElementSibling;
  if (sibling && sibling.classList.contains('validation-msg')) {
    sibling.textContent = msg;
    sibling.classList.add('show');
  }
}

function clearValidation(inputEl) {
  inputEl.classList.remove('error');
  let sibling = inputEl.nextElementSibling;
  if (sibling && sibling.classList.contains('validation-msg')) {
    sibling.classList.remove('show');
  }
}

function renderLoading(container) {
  container.innerHTML = `
    <div class="loader-wrap">
      <div class="spinner"></div>
      <div class="loader-dots">
        <span></span><span></span><span></span>
      </div>
      <span>Generating your image…</span>
    </div>`;
}

function renderError(container, message) {
  container.innerHTML = `
    <div class="error-box">
      ${ICONS.error}
      <span>${message}</span>
    </div>`;
}

function renderResult(container, imageUrl) {
  container.innerHTML = `
    <div class="result-card">
      <div class="result-label">
        <span class="dot"></span>
        Generated successfully
      </div>
      <div class="result-image-wrap">
        <img src="${imageUrl}" alt="Generated image" />
      </div>
      <div class="result-actions">
        <button class="btn btn-primary btn-sm" onclick="downloadImage('${imageUrl}')">
          ${ICONS.download} Download JPG
        </button>
        <button class="btn btn-outline btn-sm" onclick="viewFull('${imageUrl}')">
          ${ICONS.view} View Full
        </button>
      </div>
    </div>`;
}

function viewFull(url) {
  window.open(url, '_blank');
}

function downloadImage(url) {
  const a = document.createElement('a');
  a.download = 'fekepep-result.jpg';

  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      a.href = url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

// ── FakeFF Solo ─────────────────────────────────────────────────
const soloForm   = document.getElementById('soloForm');
const soloInput  = document.getElementById('soloUsn');
const soloResult = document.getElementById('soloResult');
const soloBtn    = document.getElementById('soloBtn');

soloInput.addEventListener('input', () => clearValidation(soloInput));

soloForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usn = soloInput.value.trim();

  if (!usn) {
    showValidation(soloInput, 'Please enter a username');
    return;
  }

  soloBtn.disabled = true;
  renderLoading(soloResult);

  try {
    const url = `/api/fakeff-solo?usn=${encodeURIComponent(usn)}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error || `Server error (${res.status})`);
    }

    const blob = await res.blob();
    const imgUrl = URL.createObjectURL(blob);
    renderResult(soloResult, imgUrl);
  } catch (err) {
    renderError(soloResult, err.message || 'Something went wrong. Please try again.');
  } finally {
    soloBtn.disabled = false;
  }
});

// ── FakeFF Duo ──────────────────────────────────────────────────
const duoForm    = document.getElementById('duoForm');
const duoUsn1    = document.getElementById('duoUsn1');
const duoUsn2    = document.getElementById('duoUsn2');
const duoResult  = document.getElementById('duoResult');
const duoBtn     = document.getElementById('duoBtn');

duoUsn1.addEventListener('input', () => clearValidation(duoUsn1));
duoUsn2.addEventListener('input', () => clearValidation(duoUsn2));

duoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const n1 = duoUsn1.value.trim();
  const n2 = duoUsn2.value.trim();
  let valid = true;

  if (!n1) { showValidation(duoUsn1, 'Please enter username 1'); valid = false; }
  if (!n2) { showValidation(duoUsn2, 'Please enter username 2'); valid = false; }
  if (!valid) return;

  duoBtn.disabled = true;
  renderLoading(duoResult);

  try {
    const url = `/api/fakeff-duo?name1=${encodeURIComponent(n1)}&name2=${encodeURIComponent(n2)}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error || `Server error (${res.status})`);
    }

    const blob = await res.blob();
    const imgUrl = URL.createObjectURL(blob);
    renderResult(duoResult, imgUrl);
  } catch (err) {
    renderError(duoResult, err.message || 'Something went wrong. Please try again.');
  } finally {
    duoBtn.disabled = false;
  }
});
