const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8082;
const dir = __dirname;
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  const file = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(file);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving on port ${port}`));
