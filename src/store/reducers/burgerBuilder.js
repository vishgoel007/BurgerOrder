import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
  buildingBurger: false
};

const Ingredient_Prices = {
  salad: 5,
  cheese: 10,
  meat: 20,
  bacon: 15
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]:  state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + Ingredient_Prices[action.ingredientName],
    buildingBurger: true
  };
  return updateObject(state, updatedState);

};
const removeIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]:  state.ingredients[action.ingredientName] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - Ingredient_Prices[action.ingredientName],
    buildingBurger: true
  };
  return updateObject(state, updatedState);

};
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 10,
    error: false,
    buildingBurger: false

  });

};

const fetchIngredient = (state, action) => {
  return updateObject(state, { error: true });
};


const burgerBuilder = (state = initialState, action) => {
  switch (action.type){
    case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
    case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
    case(actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
    case(actionTypes.FETCH_INGREDIENT_FAILED): return fetchIngredient(state, action);
    default: return state;
  }


};

export default burgerBuilder;