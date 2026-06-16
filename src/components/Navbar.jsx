import logo from "../assets/mothman-logo-main.png";
import { NavLink } from "react-router-dom";

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
  <li>
    <NavLink
  to="/"
  className={({ isActive }) =>
    isActive ? "navbar__link active" : "navbar__link"
  }
>
  Home
</NavLink>
  </li>

  <li>Movies</li>

  <li>Series</li>

  <li>
   <NavLink
  to="/my-list"
  className={({ isActive }) =>
    isActive ? "navbar__link active" : "navbar__link"
  }
>
  {favoriteCount > 0
    ? `My List (${favoriteCount})`
    : "My List"}
</NavLink> 
  </li>
</ul>   
    </nav>
  );
}

export default Navbar;