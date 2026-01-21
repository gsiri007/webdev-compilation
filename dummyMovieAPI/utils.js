export const httpResponseHandler = (response, payload, statusCode = 200) => {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
};

export const getMoviesOnGenre = (targetGenre, movieData) => {
  return movieData.filter(movie => {
    return movie.genre.includes(targetGenre.toLowerCase());
  });
};

export const getMoviesOnYear = (targetYear, movieData) => {
  return movieData.filter(movie => {
    return movie.year === parseInt(targetYear);
  });
};

export const getMoviesOnQuery = (query, movieData) => {
  const { id, year, title, director, genre } = query;

  return movieData.filter(movie => {
    if (id) {
      if (!(movie.id === parseInt(id))) {
        return false;
      }
    }

    if (year) {
      if (!(movie.year === parseInt(year))) {
        return false;
      }
    }

    if (title) {
      if (!(movie.title.toLowerCase() === title.toLowerCase())) {
        return false;
      }
    }

    if (director) {
      if (!(movie.director.toLowerCase() === director.toLowerCase())) {
        return false;
      }
    }

    if (genre) {
      if (!(movie.genre.includes(genre.toLowerCase()))) {
        return false;
      }
    }

    return true;
  });
};
