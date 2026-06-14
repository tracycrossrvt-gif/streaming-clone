function MovieCard({ title, year, poster, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
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
  );
}

export default MovieCard;