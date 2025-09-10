// js/main.js
import { setupSearch } from "./search.js";
import { renderFilms } from "./render.js";
import { setupFilmEvents } from "./film.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const mainContainer = document.getElementById("main-container");

let usersInput = [];
let lastSearchedFilm = [];

// Setup modules
setupSearch(
  mainContainer,
  searchInput,
  searchBtn,
  usersInput,
  lastSearchedFilm
);
setupFilmEvents(mainContainer, lastSearchedFilm, renderFilms);
