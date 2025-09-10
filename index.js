// http://www.omdbapi.com/?i=tt3896198&apikey=4a11e4f7

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const mainContainer = document.getElementById("main-container");
let usersInput = [];
let lastSearchedFilm = [];
let currentFilm = null;

// Get the saved film for local storage or start with an empty array
let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

// SEARCH FOR FILM
searchBtn.addEventListener("click", function (e) {
  let searchMovie = searchInput.value;

  if (!searchMovie) {
    console.log("User did not have any input");
    mainContainer.innerHTML = `<h2>Please search for a Movie...</h2>`;
    return;
  }

  usersInput.push(searchMovie);

  fetch(`https://www.omdbapi.com/?apikey=4a11e4f7&s=${searchMovie}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.Response === "False" || !data.Search) {
        mainContainer.innerHTML = `<h2>${data.error} || "No results found..." </h2>`;
        return;
      }
      lastSearchedFilm = data.Search;
      renderFilms(lastSearchedFilm);
    })
    .catch(() => {
      mainContainer.innerHTML = `<h2>Please try again...</h2>`;
    });
});

// Events on the main container
// - Back Button
// - Add to Watchlist Button
mainContainer.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.id === "back-button") {
    console.log("Clicked back button");
    renderFilms(lastSearchedFilm);
  }

  const addBtn = e.target.closest(".watchlist-btn");
  if (addBtn) {
    if (!currentFilm || !currentFilm.imdbID) return;

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
    addToWatchlist(toSave);
  }
});

// We need to get the specific id for that film and bring it into this function
// Then - get that id and place it into an array of sorted films - personal watchlist
// what we need to do:
// 1. Make an array to store all the films
// 2. Get the id for that specific film
// 3. Add a message to the screen when a users has successfully added a film (conditional statement)
// 4. Make a timout for this message to disappear off the screen after 3-5 seconds
// 5.
function addToWatchlist(item) {
  console.log("YOu are here");

  if (watchlist.some((eachFilm) => eachFilm.id === item.id)) {
    alert(`${item.title} is already added to your watchlist`);
    return;
  }

  watchlist.push({ item });

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  alert(`${item.title} has been added to your watchlist`);
}

// Print each film out to the DOM
function renderFilms(results) {
  const html = results
    .map(
      (film) => `
  <article class="film" data-id="${film.imdbID}">
    <img src=${film.Poster} alt="film poster for ${film.Title}" />
    <h1>${film.Title}</h1>
    <h3>${film.Year}</h3>
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

/**
 * When a user clicks on the poster it goes straight to that film
 * 1. Has the id of the film
 * 2. Get a fetch request to get the info for entire film
 * @param {*} filmImdbId
 */
function fetchFilm(filmImdbId) {
  console.log("clicked ID: ", filmImdbId);

  fetch(`https://www.omdbapi.com/?apikey=4a11e4f7&i=${filmImdbId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
            <button 
              class="watchlist-btn" 
              id="watchlist-add">
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
