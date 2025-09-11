import { fetchMovieById } from "./api.js";
import { addToWatchlist, loadWatchlist } from "./watchlistStore.js";

let currentFilm = null;
let watchlist = loadWatchlist();

export function fetchFilm(mainContainer, filmImdbId) {
  fetchMovieById(filmImdbId).then((data) => {
    currentFilm = data;

    const html = `
      <article class="result-detail" data-id="${data.imdbID}">
        <i class="fa-solid fa-arrow-left back-button" id="back-button"></i>
        <img src="${data.Poster}"/>
        <div class="text-container">
          <div class="title-rating">
            <h1>${data.Title}</h1>
            <p>⭐ ${data.imdbRating}</p>
          </div>
          <div class="runtime-genre">
            <p>${data.Runtime}</p>
            <p>${data.Genre}</p>
            <button class="watchlist-btn">
              <i class="fa-solid fa-circle-plus"></i>
            </button>
          </div>
          <p>${data.Plot}</p>
        </div>
        <br />
      </article>
    `;
    mainContainer.innerHTML = html;
  });
}

export function setupFilmEvents(mainContainer, lastSearchedFilm, renderFilms) {
  mainContainer.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.id === "back-button") {
      renderFilms(mainContainer, lastSearchedFilm);
      return;
    }

    const addBtn = e.target.closest(".watchlist-btn");
    if (addBtn && currentFilm && currentFilm.imdbID) {
      const toSave = {
        id: currentFilm.imdbID,
        title: currentFilm.Title,
        poster: currentFilm.Poster,
        rating: currentFilm.imdbRating,
        runtime: currentFilm.Runtime,
        genre: currentFilm.Genre,
        plot: currentFilm.Plot,
        year: currentFilm.Year,
      };

      const res = addToWatchlist(watchlist, toSave);
      alert(
        res.added
          ? `${toSave.title} has been added to your watchlist`
          : `${toSave.title} is already in your watchlist`
      );
    }
  });
}
