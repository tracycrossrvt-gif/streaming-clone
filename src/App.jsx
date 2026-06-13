import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { 
  getTrendingMovies,
  getPopularMovies, 
  getTopRatedMovies, 
  searchMovies,
  getMovieVideos,
} from "./services/tmdb";

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("nocturneFavorites");
  
  if (savedFavorites) {
    return JSON.parse(savedFavorites);
  }

  return [];
});

  useEffect(() => {
  async function loadMovies() {
    const trending = await getTrendingMovies();
    const popular = await getPopularMovies();
    const topRated = await getTopRatedMovies();

    setTrendingMovies(trending);
    setPopularMovies(popular);
    setTopRatedMovies(topRated);

    const randomIndex = Math.floor(
      Math.random() * trending.length
    );

    setFeaturedMovie(trending[randomIndex]);
  }

  loadMovies();
}, []);

useEffect(() => {
  localStorage.setItem("nocturneFavorites", JSON.stringify(favorites));
}, [favorites]);
 
async function handleSearch(event) {
  event.preventDefault();


  if (!searchQuery.trim()) {
    setSearchResults([]);

    return;
  }

  const results = await searchMovies(searchQuery);

  setSearchResults(results);
}


function addToFavorites(movie) {
  const alreadyFavorited = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  if (alreadyFavorited) {
    return;
  }

  setFavorites([...favorites, movie]);
}

function removeFromFavorites(movie) {
  const updatedFavorites = favorites.filter(
    (favorite) => favorite.id !== movie.id
  );

  setFavorites(updatedFavorites);
}

function isFavorite(movie) {
  return favorites.some(
    (favorite) => favorite.id === movie.id
  );
}

async function handleWatchTrailer(movie) {
  const videos = await getMovieVideos(movie.id);

  const trailer = videos.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  if (trailer) {
    setTrailerKey(trailer.key);
  }
}

function closeModal() {
  setSelectedMovie(null);
  setTrailerKey(null);
}

function openMovie(movie) {
  setSelectedMovie(movie);
  setTrailerKey(null);
}

return (
  <div className="app">
    <Navbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  handleSearch={handleSearch}
  favoriteCount={favorites.length}
/>
    <Hero movie={featuredMovie} />
  {favorites.length > 0 && (
  <MovieRow
    title="My List"
    movies={favorites}
    onMovieSelect={openMovie}
  />
)}
    {searchResults.length > 0 && (
  <MovieRow
    title={`Search Results for "${searchQuery}"`}
    movies={searchResults}
    onMovieSelect={openMovie}
  />
)}

  <MovieRow
  title="Trending"
  movies={trendingMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Popular"
  movies={popularMovies}
  onMovieSelect={setSelectedMovie}
/>

<MovieRow
  title="Top Rated"
  movies={topRatedMovies}
  onMovieSelect={setSelectedMovie}
/>

    {selectedMovie && (
  <div
  className="modal"
  onClick={closeModal}
>
   <div
  className="modal__content"
  onClick={(event) => event.stopPropagation()}
>
      <button
        className="modal__close"
       onClick={closeModal} 
      >
        ×
      </button>

      <div className="modal__body">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className="modal__poster"
        />

        <div className="modal__details">
          <h2>{selectedMovie.title}</h2>

        {trailerKey && (
  <div className="modal__trailer">
    <iframe
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title="Movie Trailer"
      allowFullScreen
    ></iframe>
  </div>
)}
         <button
  className="modal__favorite-btn"
  onClick={() => {
    if (isFavorite(selectedMovie)) {
      removeFromFavorites(selectedMovie);
    } else {
      addToFavorites(selectedMovie);
    }
  }}
>
  {isFavorite(selectedMovie)
    ? "☽ In My List"
    : "☽ Add to My List"}
</button>
<button
  className="modal__trailer-btn"
  onClick={() => handleWatchTrailer(selectedMovie)}
>
  ▶ Watch Trailer
</button> 

          <p className="modal__rating">
            ⭐ {selectedMovie.vote_average.toFixed(1)}
          </p>

          <p className="modal__release">
            Released: {selectedMovie.release_date}
          </p>

          <p className="modal__overview">
            {selectedMovie.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
)}
  </div>
);
}

export default App;