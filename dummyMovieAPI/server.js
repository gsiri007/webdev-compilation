import http from 'node:http';
import fs from 'node:fs';
import {
  httpResponseHandler,
  getMoviesOnGenre,
  getMoviesOnYear,
  getMoviesOnQuery
} from './utils.js';

// reading json data into memory

let MOVIE_DATA = null;

fs.readFile('./data.json', (err, data) => {
  if (err) {
    console.error('ERROR: json data missing, aborting....');
    process.exit(1);
  }

  MOVIE_DATA = JSON.parse(data);
  console.log('data is ready to be served');
});

// setting up the server
const PORT = 8080;

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);

  /*
   *
   *
   **** valid endpoints ****
   *
   *  /api
   *  /api/genre/<type>
   *  /api/year/<year>
   *
   **** query string **** 
   *
   *  /api?id=<id>
   *  /api?year=<year>
   *  /api?director=<director>
   *  /api?genre=<genre>
   *
   *  /api?id=<id>&year=<year>&director=<director>&genre=<genre>
   *
   */

  if (url.pathname === '/api') {

    let movies = MOVIE_DATA;

    const query = Object.fromEntries(url.searchParams);
    if (url.search) {
      movies = getMoviesOnQuery(query, MOVIE_DATA);
    }

    httpResponseHandler(res, movies);

  } else if (url.pathname.startsWith('/api/genre')) {

    const genre = url.pathname.split('/').pop();
    const movies = getMoviesOnGenre(genre, MOVIE_DATA);
    httpResponseHandler(res, movies);

  } else if (url.pathname.startsWith('/api/year')) {

    const year = url.pathname.split('/').pop();
    const movies = getMoviesOnYear(year, MOVIE_DATA);
    httpResponseHandler(res, movies);

  } else {
    httpResponseHandler(res, { message: 'HTTP 403 Forbidden' }, 403);
  }

});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
