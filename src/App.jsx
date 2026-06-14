import { useEffect, useState, useRef, } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { 
  getTrendingHorrorMovies,
  getTopRatedHorrorMovies,
  getPopularHorrorMovies,
  getPsychologicalHorrorMovies,
  getOccultHorrorMovies,
  getCreatureFeatureMovies,
  getFoundFootageMovies,
  getTrendingMovies,
  getPopularMovies, 
  getTopRatedMovies, 
  searchMovies,
  getMovieVideos,
  getMovieDetails,
} from "./services/tmdb";

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [psychologicalMovies, setPsychologicalMovies] = useState([]);
  const [occultMovies, setOccultMovies] = useState([]);
  const [creatureMovies, setCreatureMovies] = useState([]);
  const [foundFootageMovies, setFoundFootageMovies] = useState([]);

  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMovieLoading, setIsMovieLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchResultsRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState("");
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("nocturneFavorites");


  if (savedFavorites) {
    return JSON.parse(savedFavorites);
  }

  return [];
});

 useEffect(() => {
  async function loadMovies() {
    const trending = await getTrendingHorrorMovies();
    const popular = await getPopularHorrorMovies();
    const topRated = await getTopRatedHorrorMovies();
    const psychological = await getPsychologicalHorrorMovies();
    const occult = await getOccultHorrorMovies();
    const creatures = await getCreatureFeatureMovies();
    const foundFootage = await getFoundFootageMovies();
    
  
    setTrendingMovies(trending);
    setPopularMovies(popular);
    setTopRatedMovies(topRated);
    setPsychologicalMovies(psychological);
    setOccultMovies(occult);
    setCreatureMovies(creatures);
    setFoundFootageMovies(foundFootage);

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

  setHasSearched(true);

  if (!searchQuery.trim()) {
    setSearchResults([]);
    setIsSearching(false);
    return;
  }

  setIsSearching(true);
  
  const results = await searchMovies(searchQuery);

  setSearchResults(results);
  setIsSearching(false);
  

  setTimeout(() => {
    searchResultsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
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
  setTrailerError("");
  setIsTrailerLoading(true);

  const videos = await getMovieVideos(movie.id);

  const trailer = videos.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  if (trailer) {
    setTrailerKey(trailer.key);
  } else {
    setTrailerError("No trailer available.");
  }
  setIsTrailerLoading(false);
}

async function watchMovie(movie) {
  setIsMovieLoading(true);
  await openMovie(movie);
  await handleWatchTrailer(movie);
}

function closeModal() {
  setSelectedMovie(null);
  setTrailerKey(null);
}

async function openMovie(movie) {
  setSelectedMovie(movie);
  setTrailerKey(null);

  setIsMovieLoading(true);

  try {const details = await getMovieDetails(movie.id);

  setMovieDetails(details);
  } finally {
  setIsMovieLoading(false);
}
}

function clearSearch() {
  setSearchQuery("");
  setSearchResults([]);
  setHasSearched(false);
}

return (
  <div className="app">
    <Navbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  handleSearch={handleSearch}
  favoriteCount={favorites.length}
/>

<Hero
  movie={featuredMovie}
  onMoreInfo={openMovie}
  onWatchTrailer={watchMovie}
/>

  {favorites.length > 0 && (
  <MovieRow
    title="My List"
    movies={favorites}
    onMovieSelect={openMovie}
  />
)}

{hasSearched && (
  <button className="search-clear-btn" onClick={clearSearch}>
    ✕ Clear Search
  </button>
)}

{hasSearched && searchResults.length === 0 && (
  <p className="search-empty">
    No results found for "{searchQuery}"
  </p>
)}

{searchResults.length > 0 && (
  <div ref={searchResultsRef}>
    <MovieRow
      title={`Search Results for "${searchQuery}"`}
      movies={searchResults}
      onMovieSelect={openMovie}
    />
  </div>
)}

{isSearching && (
  <p className="search-loading">
    Searching Nocturne...
  </p>
)}

  <MovieRow
  title="Trending Horror"
  movies={trendingMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Psychological Horror"
  movies={psychologicalMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Creature Features"
  movies={creatureMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Found Footage"
  movies={foundFootageMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Occult & Witchcraft"
  movies={occultMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Popular Horror"
  movies={popularMovies}
  onMovieSelect={openMovie}
/>

<MovieRow
  title="Top Rated Horror"
  movies={topRatedMovies}
  onMovieSelect={openMovie}
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

       {selectedMovie.backdrop_path && (
  <div
    className="modal__backdrop"
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 20, 0.25), #171720), url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
    }}
  />
)} 

      <div className="modal__body">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className="modal__poster"
        />

        <div className="modal__details">
          <h2>{selectedMovie.title}</h2>
          {isMovieLoading && (
  <p className="modal__loading">
    Summoning forbidden knowledge...
  </p>
)}
         {movieDetails?.tagline && (
  <p className="modal__tagline">
    “{movieDetails.tagline}”
  </p>
)} 

        {trailerKey && (
  <div className="modal__trailer">
    <iframe
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title="Movie Trailer"
      allowFullScreen
    ></iframe>
  </div>
)}

{isTrailerLoading && (
  <p className="modal__trailer-loading">
    Summoning trailer...
  </p>
)}

{trailerError && (
  <p className="modal__error">
    {trailerError}
  </p>
)}

    <div className="modal__actions">
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
    {isFavorite(selectedMovie) ? "☽ In My List" : "☽ Add to My List"}
  </button>

  <button
    className="modal__trailer-btn"
    onClick={() => handleWatchTrailer(selectedMovie)}
  >
    ▶ Watch Trailer
  </button>
</div>     

    <div className="modal__meta">
  <span>⭐ {selectedMovie.vote_average.toFixed(1)}</span>

  {selectedMovie.release_date && (
    <span>{selectedMovie.release_date.slice(0, 4)}</span>
  )}

  {movieDetails?.runtime && (
    <span>{movieDetails.runtime} min</span>
  )}
</div>


  {movieDetails?.genres && (
  <div className="modal__genres">
    {movieDetails.genres.map((genre) => (
      <span key={genre.id} className="modal__genre">
        {genre.name}
      </span>
    ))}
  </div>
)}
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