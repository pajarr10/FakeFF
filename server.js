const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// ── Serve static files ──────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── API routes — reuse the serverless functions ─────────────────────
const fakeffSolo = require('./api/fakeff-solo');
const fakeffDuo  = require('./api/fakeff-duo');

app.get('/api/fakeff-solo', (req, res) => fakeffSolo(req, res));
app.get('/api/fakeff-duo',  (req, res) => fakeffDuo(req, res));

// ── Fallback: SPA-style — always serve index.html ───────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦  FEKEPEP is running → http://localhost:${PORT}\n`);
});
