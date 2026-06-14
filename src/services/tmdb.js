const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieVideos(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

async function getHorrorMovies(sortBy = "popularity.desc") {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=${sortBy}`
  );

  const data = await response.json();

  return data.results;
}

export async function getPopularHorrorMovies() {
  return getHorrorMovies("popularity.desc");
}

export async function getTrendingHorrorMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results.filter((movie) =>
    movie.genre_ids.includes(27)
  );
}

export async function getTopRatedHorrorMovies() {
  return getHorrorMovies("vote_average.desc");
}

export async function getPsychologicalHorrorMovies() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&with_keywords=9715&sort_by=vote_average.desc`
  );

  const data = await response.json();

  return data.results;
}

export async function getOccultHorrorMovies() {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=witch`
  );

  const data = await response.json();

  return data.results.filter((movie) =>
    movie.genre_ids?.includes(27)
  );
}

export async function getCreatureFeatureMovies() {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=monster`
  );

  const data = await response.json();

  return data.results.filter((movie) =>
    movie.genre_ids?.includes(27)
  );
}

export async function getFoundFootageMovies() {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=found footage`
  );

  const data = await response.json();

  return data.results.filter((movie) =>
    movie.genre_ids?.includes(27)
  );
}


