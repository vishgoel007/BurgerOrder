import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from "./ContactForm/ContactForm";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
   };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-form');
  };

  render () {
    console.log('checkout', this.props.ingreds);
    let summary = <Redirect to='/'/>;
    if (this.props.ingreds){
      const purchasedRedirect = this.props.purchased? <Redirect to='/'/> : null;
      summary = (
          <div>
            {purchasedRedirect}
            <CheckoutSummary
                ingredients={this.props.ingreds}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
            <Route
                path={this.props.match.path + '/contact-form'}
                component={ContactForm}/>
          </div>
      );
    }
    return summary;
  }

}
const mapStateToProps = (state) => {
  return {
    ingreds: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);