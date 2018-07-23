import React from 'react';
import { Link } from 'react-router-dom';
import SvgIcons from '../HomeIcon/HomeIcon';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

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