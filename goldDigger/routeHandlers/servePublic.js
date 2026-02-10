import fs from 'node:fs/promises';
import path from 'node:path';
import { getMIME } from '../utils/getMIME.js';
import { serve404 } from './serve404.js';

export const servePublic = async (request, response) => {

  if (request.url === '/') {
    const pathToIndex = path.join('public', 'index.html');

    try {
      const indexHTML = await fs.readFile(pathToIndex, { encoding: 'utf8' });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(indexHTML);

    } catch (error) {
      console.log(error.message);
    }

    return;
  }

  const resourceName = request.url.split('/').pop();
  const contentType = getMIME(resourceName);
  const pathToResource = path.join('public', resourceName);

  try {
    const resource = await fs.readFile(pathToResource);

    response.statusCode = 200;
    response.setHeader('Content-Type', contentType);
    response.end(resource);

  } catch (error) {
    await serve404(response);
  }

};
