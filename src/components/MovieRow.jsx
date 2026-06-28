
import MovieCard from "./MovieCard";


function MovieRow({ title, movies, onMovieSelect }) {


  return (
    <section className="movie-row">
   
      {title && <h2 className="movie-row__title">{title}</h2>}

      <div className="movie-row__list">
        {movies.map((movie) => {
            return(
          <MovieCard
  key={movie.id}
  id={movie.id}
  title={movie.title}
  year={movie.release_date?.slice(0, 4)}
  poster={movie.poster_path}
/>   
            )
          })}
          
      </div>
    </section>
  );
}

export default MovieRow;