import http from 'node:http';
import { servePublic } from './requestHandlers/servePublic.js';

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/') && req.method === 'GET') {
    await servePublic(req.url, res);
  }
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

