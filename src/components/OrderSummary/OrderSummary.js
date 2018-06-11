import React from 'react';
import AUX from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';


const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igkey => {
    return <li key={igkey}><span style={{textTransform:'capitalize', fontWeight:'bold'}}>{igkey}</span>  :{props.ingredients[igkey]}</li>
  });

  return(
      <AUX>
        <h3>Your Order</h3>
        <p>Your Burger contains following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price:</strong> &#8377;{props.price.toFixed(2)}</p>
        <p>Continue to checkout?</p>
        <Button clicked={props.purchaseContinue} btnType='Success'>Continue</Button>
        <Button clicked={props.purchaseCancel} btnType='Danger'>Cancel</Button>
      </AUX>
  );

};
export default orderSummary;