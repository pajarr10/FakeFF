const http = require('http');
const https = require('https');

module.exports = (req, res) => {
  const name1 = (req.query.name1 || '').trim();
  const name2 = (req.query.name2 || '').trim();

  if (!name1 || !name2) {
    res.status(400).json({ error: 'Parameters "name1" and "name2" are required' });
    return;
  }

  const remoteUrl = `http://api.nexadev.my.id/api/canvas/fakeffduo/?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`;
  const client = remoteUrl.startsWith('https') ? https : http;

  client
    .get(remoteUrl, (upstream) => {
      if (upstream.statusCode >= 400) {
        res.status(upstream.statusCode).json({ error: 'API returned an error' });
        return;
      }

      const ct = upstream.headers['content-type'] || 'image/png';
      res.setHeader('Content-Type', ct);
      res.setHeader('Cache-Control', 'public, max-age=300');
      upstream.pipe(res);
    })
    .on('error', (err) => {
      console.error('Proxy error:', err.message);
      res.status(502).json({ error: 'Failed to reach upstream API' });
    });
};
