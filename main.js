const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=3ccee47bd8e29ef810cf39b3fe5a1810`
const API_FILTER= `https://api.themoviedb.org/3/discover/movie?api_key=3ccee47bd8e29ef810cf39b3fe5a1810&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
const API_POPULAR = `https://api.themoviedb.org/3/movie/top_rated?api_key=3ccee47bd8e29ef810cf39b3fe5a1810&language=es-AR&page=1`
const API_PREMIERES = `https://api.themoviedb.org/3/movie/now_playing?api_key=3ccee47bd8e29ef810cf39b3fe5a1810&language=es-AR&page=1`
const API_COMING_SOON = `https://api.themoviedb.org/3/movie/upcoming?api_key=3ccee47bd8e29ef810cf39b3fe5a1810&language=es-AR&page=1&region=AR`
//buscar pelicula funcion
let moviesDiv = document.getElementById("list");
function searchMovies(query, page) {
  return fetch(API_ENDPOINT + '&query=' + query + '&page=' + page)
    .then(response => response.json())
}
//Filtro de busqueda popular
function searchMoviesYear(year, page) {
  return fetch(API_FILTER + '&primary_release_year=' + year + '&page=' + page)
    .then(response => response.json())
}
//busca segun el ranking puesto por el usuario
function searchMoviesRanking(vote, page) {
    return fetch(API_FILTER + '&vote_average.gte=' + vote + '&page=' + page )
      .then(response => response.json())
  }
//buscar peliculas populares
function searchMoviesPopular(page) {
    return fetch(API_POPULAR + '&page=' + page )
      .then(response => response.json())
  }
//buscar peliculas nuevas
function searchMoviesPremiere(page) {
    return fetch(API_PREMIERES + '&page=' + page )
      .then(response => response.json())
  }
  //buscar peliculas proximamente
  function searchMoviesComingSoon(page) {
    return fetch(API_COMING_SOON+ '&page=' + page)
      .then(response => response.json())
  }
  
//promesa de buscar pelicula
function submitForm() {
  while (moviesDiv.firstChild){
    moviesDiv.removeChild(moviesDiv.firstChild);
  };
  const query = document.getElementById("query").value;
  const page = document.getElementById("page").value;
  searchMovies(query, page)
    .then((data) => {
      if (data && data.results) {
        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
        }) 
      } 
    })
    .catch((err) => {
      console.error(err)
    })
}
//Promesa de busqueda por año:
function SubmitYear() {
  while (moviesDiv.firstChild){
    moviesDiv.removeChild(moviesDiv.firstChild);
  };

  const year = document.getElementById("year").value;
  const page = document.getElementById("page").value;
  searchMoviesYear(year, page)
    .then((data) => {
      if (data && data.results) {
        data.results.forEach((movie) => {
          renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
        }) 
      } 
    })
    .catch((err) => {
      console.error(err)
    })
}
//promesa de Ranking
function SubmitRanking() {
    while (moviesDiv.firstChild){
      moviesDiv.removeChild(moviesDiv.firstChild);
    };
  
    const vote = document.getElementById("vote").value;
    const page = document.getElementById("page").value;
    // Execute API request
    searchMoviesRanking(vote, page)
      .then((data) => {
        if (data && data.results) {
          data.results.forEach((movie) => {
            renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
          }) 
        } 
      })
      .catch((err) => {
        console.error(err)
      })
  }
//Promesa de peliculas mas populares:
function submitFormPopular() {
  while (moviesDiv.firstChild){
    moviesDiv.removeChild(moviesDiv.firstChild);
  };
  const page = document.getElementById("page").value;
    searchMoviesPopular(page)
      .then((data) => {
        if (data && data.results) {
          data.results.forEach((movie) => {
            renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
          }) 
        } 
      })
      .catch((err) => {
        console.error(err)
      })
  }
  //Promesa de peliculas en estreno:
function submitFormPremieres() {
  while (moviesDiv.firstChild){
    moviesDiv.removeChild(moviesDiv.firstChild);
  };
  const page = document.getElementById("page").value;
    searchMoviesPremiere(page)
      .then((data) => {
        if (data && data.results) {
          data.results.forEach((movie) => {
            renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
          }) 
        } 
      })
      .catch((err) => {
        console.error(err)
      })
  }
  //promesa de peliculas proximamente:
  function submitFormComingSoon() {
    while (moviesDiv.firstChild){
      moviesDiv.removeChild(moviesDiv.firstChild);
    };
    const page = document.getElementById("page").value;
      searchMoviesComingSoon(page)
        .then((data) => {
          if (data && data.results) {
            data.results.forEach((movie) => {
              renderMovie(movie.original_title, movie.overview, movie.poster_path, movie.release_date, movie.vote_average)
            }) 
          } 
        })
        .catch((err) => {
          console.error(err)
        })
    }
//funcion que muestra las cajas de peliculas por pantalla
function renderMovie(title, overview, poster_path, release_date, vote_average) {
  const moviesDiv = document.getElementById("list"); 
  const html = `
    <div class="movie-box">
      <div class="details">
        <div class="cat"><img class="imagen" src = https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}>
        <div><div class="circulo"><h2>${vote_average}</h2></div>
        <div class="title">${title}</div>
        <div class="overview"><p class="descripcion">${overview}</p></div> 
        <div class="overview"><b>Fecha de lanzamiento: ${release_date}<b></div>
        </div>
        </div>
      </div>
    </div>
    <br>
  `;
  moviesDiv.insertAdjacentHTML("afterbegin", html);
}   
