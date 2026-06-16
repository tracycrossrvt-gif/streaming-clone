import MovieRow from "../components/MovieRow";

 function MyList({ favorites = [], openMovie }) {
  return (
    <main className="page">
      <h1 className="page__title">My List</h1>

      {favorites.length > 0 ? (
        <MovieRow
          title="Saved Horror"
          movies={favorites}
          onMovieSelect={openMovie}
        />
      ) : (
        <p className="page__empty">
          Your list is empty. Go summon something spooky.
        </p>
      )}
    </main>
  );
}

export default MyList;