// $(document).ready(() => {
//   $("#searchForm").on("submit", e => {
//     e.preventDefault();
//     let searchText = $("#searchText").val();
//     getMovies(searchText);
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  $("#searchForm").on("submit", e => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

getMovies = searchText => {
  document.getElementById("loader").style.display = "block";
  fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=ef436114`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let movies = data.Search;
      let output = "";
      document.getElementById("movies").innerHTML = output;

      movies.map(movie => {
        output += `
        <div class="col-md-3 my-3">
          <div class="card text-center bg-dark">
            <img src="${movie.Poster}" alt=${movie.Title}>
            <div class="card-body">
              <h5 class="card-title text-white">${movie.Title}</h5>
              <a onclick="movieSelected('${
                movie.imdbID
              }')" class="btn btn-primary text-white" href="#">Movie Details</a>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("movies").innerHTML += output;
    })
    .catch(err => console.log(err));
  document.getElementById("loader").style.display = "none";
};

movieSelected = id => {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
};

getMovie = () => {
  let movieId = sessionStorage.getItem("movieId");
  fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=ef436114`)
    .then(res => res.json())
    .then(movie => {
      console.log(movie);
      let output = `
      <div class="card p-3 mb-2">
        <div class="row">
          <div class="col-md-4">
            <img src=${movie.Poster} class="img-thumbnail" alt="">
          </div>
          <div class="col-md-8">
            <h2 class="card-title">
              ${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item">
                <strong>Genre:</strong> ${movie.Genre}
              </li>
              <li class="list-group-item">
                <strong>Released:</strong> ${movie.Released}
              </li>
              <li class="list-group-item">
                <strong>IMDB Rating:</strong> ${movie.imdbRating}
              </li>
              <li class="list-group-item">
                <strong>Director:</strong> ${movie.Director}
              </li>
              <li class="list-group-item">
                <strong>Actors:</strong> ${movie.Actors}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="row p-3">
          <div class="card-body">
            <h3 class="card-title">Plot</h3>
            <p class='card-text'>${movie.Plot}</p>
            <hr class='bg-white'>
            <a href='http://imdb.com/title/${
              movie.imdbID
            }' target="_blank" class="btn bg-warning text-white">View iMDB</a>
            <a href="index.html" class="btn btn-primary">Search other movies</a>
          </div>
        </div>
      </div>

      `;

      document.getElementById("movie").innerHTML += output;
    })
    .catch(err => console.log(err));
};
