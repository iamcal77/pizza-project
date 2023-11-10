import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Import your CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/restaurants" className="nav-link">
            Restaurants
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pizza" className="nav-link">
            Pizza
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
