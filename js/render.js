// js/render.js
import { fetchFilm } from "./film.js";

export function renderFilms(mainContainer, results) {
  const html = results
    .map(
      (film) => `
    <article class="film" data-id="${film.imdbID}">
      <img src="${film.Poster}" alt="film poster for ${film.Title}" />
      <h1>${film.Title}</h1>
      <h3>${film.Year}</h3>
    </article>
  `
    )
    .join("");

  mainContainer.innerHTML = `<section class="results">${html}</section>`;

  document.querySelectorAll(".film").forEach((article) => {
    article.addEventListener("click", () => {
      fetchFilm(mainContainer, article.dataset.id);
    });
  });
}
