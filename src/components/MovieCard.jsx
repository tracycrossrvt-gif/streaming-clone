function MovieCard({ title, year }) {
  return (
    <div className="movie-card">
      <h3 className="movie-card__title">{title}</h3>
      <p className="movie-card__year">{year}</p>
    </div>
  );
}

export default MovieCard;