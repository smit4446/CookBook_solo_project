import React from 'react';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <h1 className="lead">{ title }</h1>
      <image
        src="/public/images/food--1200x600.jpg"
      />
    </div>
  </div>
);

export default Header;
