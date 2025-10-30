// src/services/tmdbService.js
const API_KEY =  process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

/* --------------------------------------------------------------- */
/* Helper – turn a fetch response into JSON or throw a nice error   */
/* --------------------------------------------------------------- */
const handleErrors = async (response) => {
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error('TMDB error:', err);
    throw new Error(err.status_message || `HTTP ${response.status}`);
  }
  return response.json();
};

/* --------------------------------------------------------------- */
/* Build a URL with query params                                   */
/* --------------------------------------------------------------- */
const buildUrl = (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  return url.toString();
};

/* --------------------------------------------------------------- */
/* TMDB Service – public API (same shape as your OMDb version)     */
/* --------------------------------------------------------------- */
export const tmdbService = {
  /* --------------------- SEARCH MOVIES ----------------------- */
  searchMovies: async (query, page = 1) => {
    if (!query?.trim()) return { results: [], total_results: 0, total_pages: 0 };

    const url = buildUrl('/search/movie', { query, page, include_adult: false });
    const data = await fetch(url).then(handleErrors);

    return {
      Search: data.results.map(mapMovie),
      totalResults: data.total_results.toString(),
      totalPages: data.total_pages,
    };
  },

  /* --------------------- GET MOVIE BY ID --------------------- */
  getMovieById: async (tmdbId) => {
    if (!tmdbId) throw new Error('TMDB ID is required');
    const url = buildUrl(`/movie/${tmdbId}`, { append_to_response: 'videos' });
    const data = await fetch(url).then(handleErrors);
    return mapMovieDetails(data);
  },

  /* --------------------- GET MOVIE BY TITLE ------------------ */
  getMovieByTitle: async (title, year) => {
    if (!title) throw new Error('Title is required');
    const url = buildUrl('/search/movie', { query: title, year });
    const { results } = await fetch(url).then(handleErrors);
    if (!results?.length) throw new Error('Movie not found');
    const movie = results[0];
    // fetch full details + videos
    return tmdbService.getMovieById(movie.id);
  },

  /* --------------------- POPULAR MOVIES ---------------------- */
  getPopularMovies: async () => {
    const url = buildUrl('/movie/popular');
    const { results } = await fetch(url).then(handleErrors);
    return {
      Search: results.map(mapMovie),
      totalResults: results.length.toString(),
    };
  },

  /* --------------------- TOP RATED MOVIES -------------------- */
  getTopRatedMovies: async () => {
    const url = buildUrl('/movie/top_rated');
    const { results } = await fetch(url).then(handleErrors);
    return {
      Search: results.map(mapMovie),
      totalResults: results.length.toString(),
    };
  },

  /* --------------------- NOW PLAYING MOVIES ------------------ */
  getNowPlayingMovies: async () => {
    const url = buildUrl('/movie/now_playing');
    const { results } = await fetch(url).then(handleErrors);
    return {
      Search: results.map(mapMovie),
      totalResults: results.length.toString(),
    };
  },

  /* --------------------- POSTER URL -------------------------- */
  getPosterUrl: (path) => (path ? `${IMAGE_BASE}${path}` : null),
};

/* --------------------------------------------------------------- */
/* Normalise TMDB objects to the shape your UI expects (OMDb-like) */
/* --------------------------------------------------------------- */
const mapMovie = (m) => ({
  imdbID: m.id.toString(),
  Title: m.title,
  Year: m.release_date?.split('-')[0] ?? 'N/A',
  Poster: m.poster_path ? `${IMAGE_BASE}${m.poster_path}` : null,
  Plot: m.overview,
  Rated: m.vote_average ? `${m.vote_average.toFixed(1)}/10` : 'N/A',
});

const mapMovieDetails = (m) => ({
  ...mapMovie(m),
  Plot: m.overview,
  Runtime: m.runtime ? `${m.runtime} min` : 'N/A',
  Genre: m.genres?.map((g) => g.name).join(', ') ?? 'N/A',
  Director: 'N/A', // TMDB does not give director in basic movie endpoint
  Actors: 'N/A',
  imdbRating: m.vote_average?.toFixed(1) ?? 'N/A',
  Trailer: m.videos?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )?.key,
});

/* --------------------------------------------------------------- */
export default tmdbService;