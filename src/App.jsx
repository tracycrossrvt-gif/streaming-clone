import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, searchMovies, } from "./services/tmdb";

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

 
async function handleSearch(event) {
  event.preventDefault();
console.log("search submitted:", searchQuery);

  if (!searchQuery.trim()) {
    setSearchResults([]);
    return;
  }

  const results = await searchMovies(searchQuery);

  setSearchResults(results);
}


return (
  <div className="app">
    <Navbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  handleSearch={handleSearch}
/>
    <Hero movie={featuredMovie} />

    {searchResults.length > 0 && (
  <MovieRow
    title={`Search Results for "${searchQuery}"`}
    movies={searchResults}
    onMovieSelect={setSelectedMovie}
  />
)}

  <MovieRow
  title="Trending"
  movies={trendingMovies}
  onMovieSelect={setSelectedMovie}
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
  onClick={() => setSelectedMovie(null)}
>
   <div
  className="modal__content"
  onClick={(event) => event.stopPropagation()}
>
      <button
        className="modal__close"
        onClick={() => setSelectedMovie(null)}
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