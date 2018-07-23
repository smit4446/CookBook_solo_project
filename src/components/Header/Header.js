import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav'

const Header = ({ title }) => (
  <div className="header">
    <div>
      <h1 className="lead">{ title }</h1>
      
    </div>
  </div>
);

export default Header;
