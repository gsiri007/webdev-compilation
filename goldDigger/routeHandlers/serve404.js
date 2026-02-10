import fs from 'node:fs/promises';
import path from 'node:path'

export const serve404 = async response => {
  const pathTo404 = path.join('public', '404.html');

  try {
    const resource404 = await fs.readFile(pathTo404, 'utf8');

    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.end(resource404);

  } catch (error) {
    console.log(error);
  }

};
