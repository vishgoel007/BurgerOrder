import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount () {
    this.props.onInitIngredient();
  }



  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igkey => {
      return ingredients[igkey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');

  };




  render() {
    const disabledInfo = {...this.props.ingreds};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error? <p style={{textAlign:'center',fontWeight:'bold'}}>Ingredients isn't loaded...</p> : <Spinner />;
    if(this.props.ingreds) {
      burger = (
       <Aux>
         <Burger ingredients={this.props.ingreds}/>
         <BurgerControls
             ingredientAdded={this.props.onIngredientAdded}
             ingredientRemoved={this.props.onIngredientRemoved}
             price={this.props.price}
             disabled={disabledInfo}
             purchasable={this.updatePurchaseState(this.props.ingreds)}
             ordered={this.purchaseHandler}/>
       </Aux>
      );

      orderSummary = <OrderSummary
          ingredients={this.props.ingreds}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}/>;
    }

    return (
        <Aux>
          <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingreds: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredName) => dispatch(actions.addIngredient(ingredName)),
    onIngredientRemoved: (ingredName) => dispatch(actions.removeIngredient(ingredName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())

  };

};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));