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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    // axios.get('https://react-burger-builder-9a3e2.firebaseio.com/ingredients.json')
    //     .then(response => {
    //       this.setState({ingredients: response.data});
    //     })
    //     .catch(error => {
    //       this.setState({error: true});
    //     });
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
    this.props.history.push({
      pathname:'/checkout'
    });

  };




  render() {
    const disabledInfo = {...this.props.ingreds};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients isn't loaded...</p> : <Spinner />;
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
       </Aux> );

      orderSummary = <OrderSummary
          ingredients={this.props.ingreds}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}/>;
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
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
    ingreds: state.ingredients,
    price: state.totalPrice
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredName}),
    onIngredientRemoved: (ingredName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredName})
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));