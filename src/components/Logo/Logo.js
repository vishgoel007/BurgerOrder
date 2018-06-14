import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';
import {Link} from 'react-router-dom';

const logo = (props) => (
    <div className={classes.Logo}>
      <Link to='/'><img src={burgerLogo} alt='Burger'/></Link>
    </div>

);

export default logo;
