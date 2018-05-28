import React from 'react';
import classes from './BuildControl.css'

const burgerControl = (props) => (
    <div className={classes.BuildControl}>
      <div className={classes.Label} >{props.label}</div>
      <button className={classes.More} onClick={props.Added}>More</button>
      <button className={classes.Less} onClick={props.Removed} disabled={props.disabled}>Less</button>
    </div>
);

export default burgerControl;