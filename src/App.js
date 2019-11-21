import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutContainer from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div style = {{marginTop: '10%'}}>
        <Layout>
          <Switch>
            <Route path="/Checkout" component = {CheckoutContainer}/>
            <Route path="/Orders" component = {Orders}/>
            <Route path="/" component = {BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
