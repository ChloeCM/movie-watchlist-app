// js/api.js
const API = "https://www.omdbapi.com/";
const KEY = "4a11e4f7";

export function searchMovies(query) {
  return fetch(`${API}?apikey=${KEY}&s=${encodeURIComponent(query)}`).then(
    (res) => res.json()
  );
}

export function fetchMovieById(imdbId) {
  return fetch(`${API}?apikey=${KEY}&i=${imdbId}`).then((res) => res.json());
}
