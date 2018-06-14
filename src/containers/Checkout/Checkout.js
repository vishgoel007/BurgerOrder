import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from "./ContactForm/ContactForm";
import {Route} from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price  = 0;
    for(let param of query.entries()){
      if(param[0] === 'price'){
        price = param[1];
        console.log('priceParam', param[0], param[1]);
      }
      else{
        ingredients[param[0]] = +param[1];
        console.log('ingredientParam', param[0], param[1]);

      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
   };

  checkoutContinueHandler = () => {
    this.history.replace('/checkout/contact-form')
  };

  render () {
    console.log('checkout', this.state.ingredients);
    return (
        <div>
          <CheckoutSummary
              ingredients={this.state.ingredients}
              checkoutCancel={this.checkoutCancelHandler}
              checkoutContinue={this.checkoutContinueHandler}/>
          <Route
              pathname={this.props.match.path + '/contact-form'}
              render={(props) => (<ContactForm
                  {...props}
                  ingredients={this.state.ingredients}
                  price={this.state.totalPrice}/>)}/>
        </div>
    );
  }

}

export default Checkout;