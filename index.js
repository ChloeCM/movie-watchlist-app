const searchInput = document.getElementById("search-input");
let usersInput = [];

searchInput.addEventListener("click", function () {
  console.log("Clicked");

  fetch("http://www.omdbapi.com/?i=tt3896198&apikey=4a11e4f7")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
