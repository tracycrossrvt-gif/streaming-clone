import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos, getMovieCredits, } from "../services/tmdb";

function MovieDetails({
    addToFavorites,
    removeFromFavorites,
    isFavorite,
}) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    
    async function loadMovie() {
  const data = await getMovieDetails(id);
  setMovie(data);

  const videos = await getMovieVideos(id);

  const trailer = videos.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  if (trailer) {
    setTrailerKey(trailer.key);
  }

  const creditData = await getMovieCredits(id);
setCredits(creditData);
}

    loadMovie();
  }, [id]);

  if (!movie) {
    return <p>Summoning forbidden knowledge...</p>;
  }


  return (
  <main className="movie-details-page">
    {movie.backdrop_path && (
      <div
        className="movie-details__backdrop"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 20, 0.2), #0f0f14), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />
    )}

    <section className="movie-details__content">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-details__poster"
        />
      )}

      <div className="movie-details__info">
        <h1>{movie.title}</h1>

        {movie.tagline && (
          <p className="movie-details__tagline">
            “{movie.tagline}”
          </p>
        )}

        <div className="movie-details__meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>

          {movie.release_date && (
            <span>{movie.release_date.slice(0, 4)}</span>
          )}

          {movie.runtime && <span>{movie.runtime} min</span>}
        </div>

        {movie.genres && (
          <div className="movie-details__genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="movie-details__genre">
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <p className="movie-details__overview">
          {movie.overview}
        </p>

        {trailerKey && (
  <section className="movie-details__trailer-section">
    <h2>Trailer</h2>

    <div className="movie-details__trailer">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title={`${movie.title} Trailer`}
        allowFullScreen
      ></iframe>
    </div>
    
  </section>
)}

<button
    className="movie-details__favorite-btn"
    onClick={() => {
      if (isFavorite(movie)) {
        removeFromFavorites(movie);
      } else {
        addToFavorites(movie);
      }
    }}
  >
    {isFavorite(movie) ? "☽ In My List" : "☽ Add to My List"}
  </button>

  

  {credits && (
  <section className="movie-details__credits">
    <h2>Cast & Crew</h2>

    {credits.crew.find((person) => person.job === "Director") && (
      <p>
        <strong>Director:</strong>{" "}
        {
          credits.crew.find((person) => person.job === "Director")
            .name
        }
      </p>
    )}

    <div className="movie-details__cast">
      {credits.cast.slice(0, 5).map((actor) => (
        <div key={actor.id} className="movie-details__actor">
          <p>{actor.name}</p>
          <span>{actor.character}</span>
        </div>
      ))}
    </div>

    <Link
  to="/"
  className="movie-details__back-link"
>
  ← Back to Home
</Link>

  </section>
)}

      </div>
    </section>
  </main>
);
}  

export default MovieDetails;