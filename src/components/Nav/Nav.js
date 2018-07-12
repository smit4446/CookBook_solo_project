import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/info">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/main">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;