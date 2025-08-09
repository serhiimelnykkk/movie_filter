const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const LANGUAGES_API_ENDPOINT = {
  url: "https://api.themoviedb.org/3/configuration/languages",
  options: options,
};

export const COUNTRIES_API_ENDPOINT = {
  url: "https://api.themoviedb.org/3/configuration/countries",
  options: options,
};

export const GENRES_API_ENDPOINT = {
  url: "https://api.themoviedb.org/3/genre/movie/list",
  options: options,
};

export const MOVIE_API_ENDPOINT = {
  url: "https://api.themoviedb.org/3/movie/",
  options: options,
};

export const posterBaseUrl = "http://image.tmdb.org/t/p/w500";
export const videoBaseUrl = "https://www.youtube.com/embed/";
