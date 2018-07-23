import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const HomeNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/info">
            <IconButton>
              <FavoriteIcon/>
            </IconButton>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default HomeNav;