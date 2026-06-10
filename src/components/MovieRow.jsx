import MovieCard from "./MovieCard";


function MovieRow() {
  const movies = [
   
  {
    title: "The VVitch",
    year: 2015,
  },
  {
    title: "Midsommar",
    year: 2019,
  },
  {
    title: "The Ritual",
    year: 2017,
  },
  {
    title: "Sleepy Hollow",
    year: 1999,
  },
];


  return (
    <section className="movie-row">
      <h2 className="movie-row__title">Folk Horror Favorites</h2>

      <div className="movie-row__list">
        {movies.map((movie, index) => (
          <MovieCard key={index} title={movie.title} year={movie.year} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;