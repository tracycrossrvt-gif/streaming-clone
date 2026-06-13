import logo from "../assets/mothman-logo-main.png";

function Navbar({ 
   searchQuery,
   setSearchQuery, 
   handleSearch,
   favoriteCount,
  }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img
          src={logo}
          alt="Nocturne Logo"
          className="navbar__logo-img"
        />

        <h2 className="navbar__logo">NOCTURNE</h2>
      </div>
    <form className="navbar__search"
    onSubmit={handleSearch}>
  <input
    type="text"
    placeholder="Search Nocturne..."
    className="navbar__search-input"
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
  />
</form>
      <ul className="navbar__links">
        <li>Home</li>
        <li>Movies</li>
        <li>Series</li>
        <li>
  {favoriteCount > 0
    ? `My List (${favoriteCount})`
    : "My List"}
</li>
      </ul>
    </nav>
  );
}

export default Navbar;