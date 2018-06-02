import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const Ingredient_Prices = {
  salad: 5,
  cheese: 7,
  meat: 16,
  bacon: 10
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 10,
    purchasable:false
  };

  updatePurchaseState = (ingredients) =>{
    const sum = Object.keys(ingredients).map(igkey => {
      return ingredients[igkey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchasable: sum>0});
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    let updatedPrice = this.state.totalPrice + Ingredient_Prices[type];
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const count = this.state.ingredients[type];
    if(count <= 0) return;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = count - 1;
    let updatedPrice = this.state.totalPrice - Ingredient_Prices[type];
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

    this.updatePurchaseState(updatedIngredients);

  };



  render() {
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}/>
        </Aux>
    )
  }
}

export default BurgerBuilder;