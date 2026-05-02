import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Leloto Glam</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/booking">Book</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;