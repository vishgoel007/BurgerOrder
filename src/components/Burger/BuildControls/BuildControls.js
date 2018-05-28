import React from 'react';
import classes from './BurgerControls.css';
import BuildControl from './BuildControl/BurgerControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>&#8377; {props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
          <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              Added={() => props.ingredientAdded(ctrl.type)}
              Removed={() => props.ingredientRemoved(ctrl.type)}
              disabled={props.disabled[ctrl.type]}/>
      ))}
    </div>
);

export default buildControls;