// sidebar for mobile size screen
import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import AUX from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return(
      <AUX>
        <BackDrop show={props.open} clicked={props.close}/>
        <div className={attachedClasses.join(' ')} onClick={props.close}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
          </nav>
        </div>
      </AUX>
  );

};

export default sideDrawer;
