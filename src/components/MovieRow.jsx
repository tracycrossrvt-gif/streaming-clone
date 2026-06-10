import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getTrendingMovies } from "../services/tmdb";

function MovieRow({ onMovieSelect }) {
 const [movies, setMovies] = useState([]);
useEffect(() => {
  async function loadMovies() {
    const movieData = await getTrendingMovies();

    console.log(movieData);

    setMovies(movieData);
  }

  loadMovies();
}, []);

  return (
    <section className="movie-row">
   
      <h2 className="movie-row__title">Folk Horror Favorites</h2>

      <div className="movie-row__list">
        {movies.map((movie) => {
            return(
             <MovieCard
  key={movie.id}
  title={movie.title}
  year={movie.release_date?.slice(0, 4)}
  poster={movie.poster_path}
  onClick={() => {
    console.log("clicked movie:", movie.title);
    onMovieSelect(movie);
  }}
/> 
            )
          })}
          
      </div>
    </section>
  );
}

export default MovieRow;