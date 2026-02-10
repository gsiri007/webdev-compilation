import { getGoldPrice } from "../utils/getGoldPrice.js";

export const serveGoldPrice = response => {

  response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
  });

  setInterval(() => {
    const goldPrice = getGoldPrice();
    response.write(`data: ${JSON.stringify({price: goldPrice})}\n\n`);
  }, 4000);

};

