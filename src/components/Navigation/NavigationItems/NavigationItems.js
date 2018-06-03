import React from 'react';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <li>
      <a className={classes.active} href='/'>Burger Builder</a>
    </li>
    <li>
      <a href='/'>Checkout</a>
    </li>
  </ul>

);

export default navigationItems;