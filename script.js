const $ = (selector, root = document, type = "single") => root[`querySelector${type === "multiple" ? "All" : ""}`](selector),
  createEl = (tagName) => document.createElement(tagName);

const BASEURL = "https://api.themoviedb.org/3",
  APIKEY = "aadd42c76456df78cea5011e03fcd6c0",
  APIURL = `${BASEURL}/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`,
  IMGPATH = "https://image.tmdb.org/t/p/w1280",
  SEARCHAPI = `${BASEURL}/search/movie?&api_key=${APIKEY}&query=`;

const getMovies = (url) => fetch(url).then((response) => response.json()).then(({ results }) => showMovies(results));

// initially get fav movies
getMovies(APIURL);

const getClassByRate = (vote) => vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";

function showMovies(movies) {
  $("#main").innerHTML = "";

  movies.forEach(({ poster_path, title, vote_average, overview }) => {
    const movieEl = createEl("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img
        src="${IMGPATH + poster_path}"
        alt="${title}"
      />

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>

      <div class="overview">
        <h3>Overview:</h3>
        ${overview}
      </div>
    `;

    $("#main").appendChild(movieEl);
  });
}

$("#form").onsubmit = (e) => {
  e.preventDefault();

  const searchTerm = $("#search").value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    $("#search").value = "";
  }
};
