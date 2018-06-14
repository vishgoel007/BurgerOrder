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
        <div className={attachedClasses.join(' ')}>
          <div style={{textAlign:'Right', fontSize: '25px'}}>
            <span onClick={props.close} style={{color: '#795548'}} className="fas fa-window-close"/>
          </div>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems/>
          </nav>
        </div>
      </AUX>
  );

};

export default sideDrawer;
