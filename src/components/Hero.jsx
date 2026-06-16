import { useNavigate } from "react-router-dom";



function Hero({ movie, onMoreInfo, onWatchTrailer }) {
  const navigate = useNavigate();
  if (!movie) {
    return null;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <section
      className="hero"
      style={{ backgroundImage: `linear-gradient(to right, rgba(15, 15, 20, 0.95), rgba(15, 15, 20, 0.55)), url(${backdropUrl})` }}
    >
      <div className="hero__content">
        <p className="hero__eyebrow">Featured Tonight</p>

        <h1 className="hero__title">{movie.title}</h1>

        <p className="hero__description">{movie.overview}</p>

        <div className="hero__buttons">
         <button
  className="hero__button"
  onClick={() => navigate(`/movie/${movie.id}`)}
>
  Watch Now
</button>

<button
  className="hero__button hero__button--secondary"
  onClick={() => navigate(`/movie/${movie.id}`)}
>
  More Info
</button> 
        </div>
      </div>
    </section>
  );
}

export default Hero;