import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import { useEffect, useRef } from "react";

function Home({
  featuredMovie,
  favorites,
  searchResults,
  hasSearched,
  searchQuery,
  clearSearch,
  openMovie,
  watchMovie,
  trendingMovies,
  psychologicalMovies,
  creatureMovies,
  foundFootageMovies,
  occultMovies,
  popularMovies,
  topRatedMovies,
}) {

  const searchResultsRef = useRef(null); 
  useEffect(() => {
  if (
    searchResults.length > 0 &&
    searchResultsRef.current
  ) {
    searchResultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [searchResults]);
  
  return (
    <>
      <Hero
  movie={featuredMovie}
  onMoreInfo={openMovie}
  onWatchTrailer={watchMovie}
/>

      {favorites.length > 0 && (
        <MovieRow title="My List" movies={favorites} onMovieSelect={openMovie} />
      )}

      {hasSearched && (
        <button className="search-clear-btn" onClick={clearSearch}>
          ✕ Clear Search
        </button>
      )}

      {hasSearched && searchResults.length === 0 && (
        <p className="search-empty">
          No results found for "{searchQuery}"
        </p>
      )}

      {searchResults.length > 0 && (
        <div ref={searchResultsRef}>
        <MovieRow
          title={`Search Results for "${searchQuery}"`}
          movies={searchResults}
          onMovieSelect={openMovie}
        />
        </div>
      )}

      <MovieRow title="Trending Horror" movies={trendingMovies} onMovieSelect={openMovie} />
      <MovieRow title="Psychological Horror" movies={psychologicalMovies} onMovieSelect={openMovie} />
      <MovieRow title="Creature Features" movies={creatureMovies} onMovieSelect={openMovie} />
      <MovieRow title="Found Footage" movies={foundFootageMovies} onMovieSelect={openMovie} />
      <MovieRow title="Occult & Witchcraft" movies={occultMovies} onMovieSelect={openMovie} />
      <MovieRow title="Popular Horror" movies={popularMovies} onMovieSelect={openMovie} />
      <MovieRow title="Top Rated Horror" movies={topRatedMovies} onMovieSelect={openMovie} />
    </>
  );
}

export default Home;