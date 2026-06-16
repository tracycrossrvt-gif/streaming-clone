import { Link } from "react-router-dom";

function MovieCard({ id, title, year, poster }) {
  return (
    <Link to={`/movie/${id}`} className="movie-card__link">
      <div className="movie-card">
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            className="movie-card__image"
          />
        ) : (
          <div className="movie-card__fallback">
            No Poster Available
          </div>
        )}

        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__year">{year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;