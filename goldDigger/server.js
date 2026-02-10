import http from 'node:http';
import { servePublic } from './routeHandlers/servePublic.js';
import { serveGoldPrice } from './routeHandlers/serveGoldPrice.js';
import { handleInvestment } from './routeHandlers/handleInvestment.js';

const PORT = 8080;

const server = http.createServer(async (req, res) => {

  console.log(`${req.method} ${req.url} ${req.headers['host']}`);

  if (req.url === '/api/gold/price') {
    serveGoldPrice(res);

  } else if (req.url === '/api/invest' && req.method === 'POST') {
    try {
      await handleInvestment(req, res);
    } catch (error) {
      console.log(error.message);
    }

  } else if (req.url.startsWith('/') && req.method === 'GET') {
    try {
     await servePublic(req, res);
    } catch (error) {
      console.log(error.message);
    }
  }

});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
