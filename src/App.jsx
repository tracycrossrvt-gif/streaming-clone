import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { getTrendingMovies } from "./services/tmdb";

function App() {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function loadFeaturedMovie() {
      const movies = await getTrendingMovies();

      const randomIndex = Math.floor(
  Math.random() * movies.length
);

setFeaturedMovie(movies[randomIndex]);
    }

    loadFeaturedMovie();
  }, []);

  console.log("selectedMovie:", selectedMovie);
return (
  <div className="app">
    <Navbar />
    <Hero movie={featuredMovie} />

    <MovieRow onMovieSelect={setSelectedMovie} />

    {selectedMovie && (
  <div className="modal">
    <div className="modal__content">
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