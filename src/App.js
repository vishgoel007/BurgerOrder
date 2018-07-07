import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBulider/BurgerBuilder";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from "./containers/Logout/Logout";
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');

});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');

});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

class App extends Component {

  componentDidMount () {
    this.props.onAutoSignIn();
  }

  render () {
    let routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/auth' component={asyncAuth}/>
          <Redirect to='/'/>
        </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/auth' component={asyncAuth}/>
            <Route path='/logout' component={Logout}/>
            <Redirect to='/'/>
          </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.checkAuthState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));