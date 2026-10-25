import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/schemes", label: "Schemes" },
  { to: "/complaints", label: "Complaints" },
  { to: "/community", label: "Community" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const savedCount = useSelector((state) => state.savedSchemes.ids.length);
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  function linkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu} aria-label="LokLink home">
          <span className="logo-mark" aria-hidden="true">L</span>
          <span>Lok<span className="logo-accent">Link</span></span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav id="main-menu" className={menuOpen ? "nav-menu open" : "nav-menu"} aria-label="Main">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={linkClass} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                  Dashboard{savedCount > 0 && <span className="count-pill">{savedCount}</span>}
                </NavLink>
                <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
                  {user.name}
                </NavLink>
                <button type="button" className="btn btn-outline-light" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={closeMenu}>Log in</Link>
                <Link to="/register" className="btn btn-lime" onClick={closeMenu}>Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
