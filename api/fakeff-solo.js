const http = require('http');
const https = require('https');

module.exports = (req, res) => {
  const usn = (req.query.usn || '').trim();

  if (!usn) {
    res.status(400).json({ error: 'Parameter "usn" is required' });
    return;
  }

  const remoteUrl = `https://apii.nexadev.my.id/fakeff?usn=${encodeURIComponent(usn)}`;
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
