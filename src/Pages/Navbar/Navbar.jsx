// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <li><Link to="/documents">Documents</Link></li>
        ) : null}
        <li>{isAuthenticated ? <button onClick={onLogout}>Logout</button> :  <Link  to = "/login">Login</Link>}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
