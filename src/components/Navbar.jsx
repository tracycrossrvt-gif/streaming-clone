import logo from "../assets/mothman-logo-main.png";

function Navbar() {
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

      <ul className="navbar__links">
        <li>Home</li>
        <li>Movies</li>
        <li>Series</li>
        <li>My List</li>
      </ul>
    </nav>
  );
}

export default Navbar;