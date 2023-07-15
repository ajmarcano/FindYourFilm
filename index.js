const searchButton = document.getElementById("search-button")
const searchBar = document.getElementById("search-bar")
const movieList = document.getElementById("movie-list")
const navbar = document.getElementById("navbar")
const watchListButton = document.getElementById("watchlist-button")
const searchMoviesButton = document.getElementById("search-movies")
const searchContainer = document.getElementById("search-container")
let globalMovieArr = []
let myWatchlist = []

function searchForMovies() {
    fetch(`https://www.omdbapi.com/?apikey=5497ba52&s=${searchBar.value}`)
        .then(res => res.json())
        .then(data => {
                // console.log(data.Search)
                let movieArr = data.Search.map((movie, index) => {
                   return fetch(`https://www.omdbapi.com/?apikey=5497ba52&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(item => {
                        return (`
                        <div class="movie-container">
                            <img class="movie-posters" src=${movie.Poster} />
                            <div class="movie-details">
                                <div class="top-movie-details">
                                    <h4 id="movie-title"}>${movie.Title}</h4>
                                    <img src="./images/star_icon.svg" />
                                    <h5>${item.imdbRating}</h5>
                                </div>
                                <div class="middle-movie-details">
                                    <h5>${item.Runtime}</h5>
                                    <h5>${item.Genre}</h5>
                                    <div class="watchlist-container">
                                        <button class="watchlist-button" id="add-to-watchlist-${index}">
                                        <img src="./images/add_icon.svg" class="add-icon watchlist"/>
                                        Watchlist</button>
                                    </div>
                                </div>
                                <p class="movie-review">${item.Plot}</p>
                            </div>
                        </div>
                        <hr class="divider" />
                        `)
                    })
                    
                })
                
                Promise.all(movieArr)
                .then(movieItems => {
                    // console.log(movieItems)
                    globalMovieArr = movieItems
                    movieList.innerHTML = movieItems
                })
             })
}

searchButton.addEventListener("click", searchForMovies)

document.addEventListener("click", function(event) {
    if(event.target.matches(".watchlist-button")) {
        let targetId = event.target.id.slice(-1)
        myWatchlist.push(globalMovieArr[targetId])
    }
    
    if(event.target.matches("#watchlist-button")) {
        navbar.innerHTML = `
            <h1>Find your film</h1>
            <button id="search-movies">Search for movies</button>
        `
        searchContainer.innerHTML = ""
        movieList.innerHTML = myWatchlist
    }
    
    if(event.target.matches("#search-movies")) {
       navbar.innerHTML = `
            <h1>Find your film</h1>
            <button id="watchlist-button">My Watchlist</button>
        `
        searchContainer.innerHTML = `
            <img src="./images/Search.svg" id="search-logo" />
            <input type="text" class="search-bar" id="search-bar"></input>
            <button class="search-button" id="search-button">Search</button>
        `
        movieList.innerHTML = `
            <img src="./images/Icon.png" class="movie-icon" />
            <h4 class="start-exploring">Start exploring</h4>
        `
    }
    
    
    if (event.target.matches("#search-button")) {
        searchButton.addEventListener("click", searchForMovies);
    }
}) 
