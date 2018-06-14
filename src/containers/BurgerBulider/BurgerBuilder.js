import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const Ingredient_Prices = {
  salad: 5,
  cheese: 7,
  meat: 16,
  bacon: 10
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 10,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get('https://react-burger-builder-9a3e2.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data});
        })
        .catch(error => {
          this.setState({error: true});
        });
  }



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

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };
  purchaseContinueHandler = () => {
    // this.setState({loading: true});
    // const orders = {
    //   customer:{
    //     name: 'testname',
    //     address:{
    //       country: 'India',
    //       state: 'Delhi',
    //       street: 'TestStreet'
    //     },
    //     email: 'test@email.com',
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     delivery: 'Standard'
    //   }
    // };
    // axios.post('/orders.json', orders)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({loading: false, purchasing: false});
    //   });

    const queryParams = [];
    for(let key in this.state.ingredients){
      queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]));
    }
    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname:'/checkout',
      search: '?' + queryString
    });

  };




  render() {
    // console.log(this.props);
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients isn't loaded...</p> : <Spinner />;
    if(this.state.ingredients) {
      burger = (
       <Aux>
         <Burger ingredients={this.state.ingredients}/>
         <BurgerControls
             ingredientAdded={this.addIngredientHandler}
             ingredientRemoved={this.removeIngredientHandler}
             price={this.state.totalPrice}
             disabled={disabledInfo}
             purchasable={this.state.purchasable}
             ordered={this.purchaseHandler}/>
       </Aux> );

      orderSummary = <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);