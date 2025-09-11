import { loadWatchlist } from "./watchlistStore.js";

export function renderWatchlist(mainContainer) {
  const watchlist = loadWatchlist();

  if (watchlist.length === 0) {
    mainContainer.innerHTML = `<h2>Your watchlist is empty...</h2>`;
    return;
  }

  const html = watchlist
    .map(
      (film) => `
      <article class="film" data-id="${film.id}">
        <img src="${film.poster}" alt="poster for ${film.title}" />
        <h1>${film.title}</h1>
        <h3>${film.year}</h3>
        <p>${film.genre}</p>
        <p>⭐ ${film.rating}</p>
      </article>
    `
    )
    .join("");

  mainContainer.innerHTML = `<section class="results">${html}</section>`;
}
