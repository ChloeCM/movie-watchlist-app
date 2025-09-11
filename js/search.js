// js/search.js
import { searchMovies } from "./api.js";
import { renderFilms } from "./render.js";

export function setupSearch(
  mainContainer,
  searchInput,
  searchBtn,
  usersInput,
  lastSearchedFilm
) {
  searchBtn.addEventListener("click", function () {
    const searchMovie = searchInput.value;
    if (!searchMovie) {
      mainContainer.innerHTML = `<h2>Please search for a Movie...</h2>`;
      return;
    }

    usersInput.push(searchMovie);

    searchMovies(searchMovie)
      .then((data) => {
        if (data.Response === "False" || !data.Search) {
          mainContainer.innerHTML = `<h2>No results found...</h2>`;
          return;
        }
        lastSearchedFilm.length = 0; // clear
        lastSearchedFilm.push(...data.Search);
        renderFilms(mainContainer, lastSearchedFilm);
      })
      .catch(() => {
        mainContainer.innerHTML = `<h2>Please try again...</h2>`;
      });
  });
}
