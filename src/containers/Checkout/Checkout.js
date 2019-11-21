import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients : {
            salad : 0,
            cheese : 0,
            bacon : 0,
            meat : 0
        },
        price: null,
    }

    componentDidMount(){
        console.log(this.props);
        let orderedIngredients = this.props.history.location.ingredients;
        if(orderedIngredients != null){
            this.setState({ingredients: this.props.history.location.ingredients, price: this.props.history.location.price})
        }
        //orderedIngredients == null ? this.setState({ingredients: this.props.history.location.ingredients}) : null;
    }

    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary CheckoutContinued = {this.CheckoutContinuedHandler} CheckoutCancelled = {this.CheckoutCancelledHandler} ingredients = {this.state.ingredients}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactData ingredients = {this.state.ingredients} price = {this.state.price} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;