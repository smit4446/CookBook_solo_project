import React from 'react';
import { Link } from 'react-router-dom';
import SvgIcons from '../HomeIcon/HomeIcon';

const ProfileNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li className="homeIcon">
        <Link to="/main"><SvgIcons /></Link>
        </li>
      </ul>
    </div>
  </div>
);

export default ProfileNav;