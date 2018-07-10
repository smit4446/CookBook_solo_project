import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            <Button variant="raised">Home</Button>
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
          </Link>
        </li>
        <li>
       
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
