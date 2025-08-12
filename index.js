const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
let usersInput = [];

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked button");

  const searchMovie = searchInput.value;
  console.log("Searched Movies: ", searchMovie);

  fetch("http://www.omdbapi.com/?i=tt3896198&apikey=4a11e4f7")
    .then((res) => res.json())
    .then((data) => console.log(data));
});
