import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

  return (
      <div className={classes.CheckoutSummary}>
        <h2>Here is your Tasty Burger...</h2>
        <div className={classes.Burger}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button
            btnType='Danger'
            clicked={props.checkoutCancel}>Cancel</Button>
        <Button
            btnType='Success'
            clicked={props.checkoutContinue}>Continue</Button>
      </div>

  );

};

export default checkoutSummary;