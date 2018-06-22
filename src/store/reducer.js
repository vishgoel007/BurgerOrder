import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 10
};

const Ingredient_Prices = {
  salad: 5,
  cheese: 7,
  meat: 16,
  bacon: 10
};


const reducer = (state = initialState, action) => {
  switch (action.type){
    case(actionTypes.ADD_INGREDIENT):
      return {
          ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]:  state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + Ingredient_Prices[action.ingredientName]
      };

    case(actionTypes.REMOVE_INGREDIENT):
      return {
          ...state,
        ingredients: {
            ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - Ingredient_Prices[action.ingredientName]
      };

    default:
      return state;
  }


};

export default reducer;