import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import MovieDetails from "./pages/MovieDetails";

import {
  getTrendingHorrorMovies,
  getTopRatedHorrorMovies,
  getPopularHorrorMovies,
  getPsychologicalHorrorMovies,
  getOccultHorrorMovies,
  getCreatureFeatureMovies,
  getFoundFootageMovies,
  searchMovies,
} from "./services/tmdb";

function App() {
  const navigate = useNavigate();

  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [psychologicalMovies, setPsychologicalMovies] = useState([]);
  const [occultMovies, setOccultMovies] = useState([]);
  const [creatureMovies, setCreatureMovies] = useState([]);
  const [foundFootageMovies, setFoundFootageMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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

      const heroMovies = popular.filter(
        (movie) =>
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
      navigate("/");
      return;
    }

    setIsSearching(true);

    const results = await searchMovies(searchQuery);

    setSearchResults(results);
    setIsSearching(false);
    navigate("/");
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
    return favorites.some((favorite) => favorite.id === movie.id);
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
              trendingMovies={trendingMovies}
              psychologicalMovies={psychologicalMovies}
              creatureMovies={creatureMovies}
              foundFootageMovies={foundFootageMovies}
              occultMovies={occultMovies}
              popularMovies={popularMovies}
              topRatedMovies={topRatedMovies}
              isSearching={isSearching}
            />
          }
        />

        <Route
          path="/my-list"
          element={<MyList favorites={favorites} />}
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
  );
}

export default App;