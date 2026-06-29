import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import { useEffect, useRef, useState } from "react";

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
  const [sortOption, setSortOption] = useState("relevance");

  useEffect(() => {
  if (
    searchResults.length > 0 &&
    searchResultsRef.current
  ) {
    const navHeight = 140;

    window.scrollTo({
      top: searchResultsRef.current.offsetTop - navHeight,
      behavior: "smooth",
    });
  }
}, [searchResults]);

  const sortedResults = [...searchResults];

switch (sortOption) {
  case "rating-desc":
    sortedResults.sort((a, b) => b.vote_average - a.vote_average);
    break;

  case "rating-asc":
    sortedResults.sort((a, b) => a.vote_average - b.vote_average);
    break;

  case "date-desc":
    sortedResults.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    break;

  case "date-asc":
    sortedResults.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
    break;

  case "title-asc":
    sortedResults.sort((a, b) => a.title.localeCompare(b.title));
    break;

  case "title-desc":
    sortedResults.sort((a, b) => b.title.localeCompare(a.title));
    break;

  default:
    break;
}

  return (
    <>

{hasSearched && (
  <section className="search-results-section" ref={searchResultsRef}>
    <div className="search-results-section__header">
      <h1>Search Results</h1>

      <button className="search-clear-btn" onClick={clearSearch}>
        ✕ Clear Search
      </button>
    </div>

    {searchResults.length > 0 && (
      <div className="search-sort">
        <label htmlFor="sort-results">Arrange By</label>

        <select
          id="sort-results"
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="title-asc">A–Z</option>
          <option value="title-desc">Z–A</option>
        </select>
      </div>
    )}

    {searchResults.length === 0 ? (
      <p className="search-empty">
        No results found for "{searchQuery}"
      </p>
    ) : (
      <div>
        <MovieRow
          title={`Results for "${searchQuery}"`}
          movies={sortedResults}
          onMovieSelect={openMovie}
        />
      </div>
    )}
  </section>
)}

{!hasSearched && (
  <Hero
    movie={featuredMovie}
    onMoreInfo={openMovie}
    onWatchTrailer={watchMovie}
  />
)}

 {!hasSearched && favorites.length > 0 && (
      <MovieRow
        title="My List"
        movies={favorites}
        onMovieSelect={openMovie}
      />
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