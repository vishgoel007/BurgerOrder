// header links
import React from 'react';
import classes from './NavigationItems.css';
import {NavLink} from 'react-router-dom';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <li>
      <NavLink to='/' activeClassName={classes.active} exact>Burger Builder</NavLink>
    </li>
    <li>
      <NavLink to='/orders' activeClassName={classes.active}>Orders</NavLink>
    </li>
  </ul>

);

export default navigationItems;