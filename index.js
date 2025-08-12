const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
let mainContainer = document.getElementById("main-container");
let usersInput = [];

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const searchMovie = searchInput.value;
  console.log("Searched Movies: ", searchMovie);

  if (!searchMovie) {
    console.log("Please type something");
    mainContainer.innerHTML = `<p>Please type a movie title</p>`;
    return;
  }

  usersInput.push(searchMovie);

  fetch(`https://www.omdbapi.com/?apikey=4a11e4f7&s=${searchMovie}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      console.log(data.Response);
      if (data.Response === "False" || !data.Search) {
        mainContainer.innerHTML = `<p>${data.Error || "No results found."}</p>`;
        return;
      }
      renderFilms(data.Search); // pass the array of results
    })
    .catch(() => {
      mainContainer.innerHTML = "<p>Network error. Try again.</p>";
    });
});

function renderFilms(results) {
  const html = results
    .map(
      (film) => `
      <article class="film" data-id="${film.imdbID}">
        <img src="${film.Poster} alt="${film.Title} />
        <h3>${film.Title}</h3>
        <p>${film.Year}</p>
        <button data-id="${film.imdbID}">Add to Watchlist</button>
      </article>
  `
    )
    .join("");

  mainContainer.innerHTML = `<section class="results">${html}</section>`;

  document.querySelectorAll(".film").forEach((article) => {
    article.addEventListener("click", () => {
      fetchFilm(article.dataset.id);
    });
  });
}

function fetchFilm(filmImdbId) {
  console.log(filmImdbId);
}

// http://www.omdbapi.com/?i=tt3896198&apikey=4a11e4f7
