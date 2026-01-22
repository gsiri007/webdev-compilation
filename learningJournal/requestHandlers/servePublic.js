import path from "node:path";
import fs from 'node:fs/promises'
import { getMimeType } from "../utils/getMimeType.js";

export const servePublic = async (url, res) => {

  let pathToResource = null;
  let mimeType = null;

  if (url === '/') {

    pathToResource = path.join('public', 'index.html');
    mimeType = 'text/html';

  } else {

    pathToResource = path.join('public', url);
    mimeType = getMimeType(url);

  }

  try {
    const resource = await fs.readFile(pathToResource);

    res.status = 200;
    res.setHeader('Content-Type', mimeType);
    res.end(resource);

  } catch (error) {
    console.log("ERROR: ", error);

    res.status = 404;
    res.setHeader('Content-Type', 'json');
    //TODO: add a 404.html
    res.end(JSON.stringify({ message: 'Error: 404 not found' }))
  }

};
