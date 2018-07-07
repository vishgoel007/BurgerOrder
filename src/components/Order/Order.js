import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for(let ingredientName in props.ingredients){
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const orderIngredients = ingredients.map(ig => {
    return <span className={classes.Item} key={ig.name}>{ig.name}: <strong>{ig.amount} </strong></span>

  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {orderIngredients}</p>
      <p>Price: <strong>&#8377; {Number.parseFloat(props.price).toFixed(2)}</strong></p> {/*or can use + while passing props*/}
    </div>
  );

};

export default order;