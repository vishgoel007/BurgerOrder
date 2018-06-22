import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from "./ContactForm/ContactForm";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
   };

  checkoutContinueHandler = () => {
    this.history.replace('/checkout/contact-form')
  };

  render () {
    console.log('checkout', this.props.ingreds);
    return (
        <div>
          <CheckoutSummary
              ingredients={this.props.ingreds}
              checkoutCancel={this.checkoutCancelHandler}
              checkoutContinue={this.checkoutContinueHandler}/>
          <Route
              pathname={this.props.match.path + '/contact-form'}
              component={ContactForm}/>
        </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    ingreds: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);