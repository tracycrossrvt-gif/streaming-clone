import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import MovieDetails from "./pages/MovieDetails";

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

    const heroMovies = popular.filter((movie) =>
  movie.backdrop_path &&
  movie.overview &&
  movie.vote_average >= 6
);

const randomIndex = Math.floor(Math.random() * heroMovies.length);

setFeaturedMovie(heroMovies[randomIndex]);
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

<Routes>
  <Route
  path="/"
  element={
    <Home
      featuredMovie={featuredMovie}
      favorites={favorites}
      searchResults={searchResults}
      hasSearched={hasSearched}
      searchQuery={searchQuery}
      clearSearch={clearSearch}
      openMovie={openMovie}
      trendingMovies={trendingMovies}
      psychologicalMovies={psychologicalMovies}
      creatureMovies={creatureMovies}
      foundFootageMovies={foundFootageMovies}
      occultMovies={occultMovies}
      popularMovies={popularMovies}
      topRatedMovies={topRatedMovies}
      watchMovie={watchMovie}
    />
  }
/>
  <Route
  path="/my-list"
  element={
    <MyList
      favorites={favorites}
      openMovie={openMovie}
    />
  }
/>

<Route
  path="/movie/:id"
  element={
    <MovieDetails
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
      isFavorite={isFavorite}
    />
  }
/>
</Routes>  
        </div>
)}


export default App;