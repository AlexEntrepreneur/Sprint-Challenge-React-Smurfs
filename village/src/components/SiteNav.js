import React from 'react';
import { NavLink } from 'react-router-dom';

class SiteNav extends React.Component {
  render () {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/smurf-form">Add Smurf</NavLink>
      </nav>
    );
  }
}

export default SiteNav;
