import React from 'react';
import { Link } from 'react-router-dom';
import SvgIcons from '../HomeIcon/HomeIcon';

const HomeNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/info">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default HomeNav;