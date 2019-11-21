import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSumary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import instance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Axios from 'axios';
import Aux from '../../hoc/Auxiliary';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {
    // constructor syntax for using state:
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    
    state = {
        ingredients:null,
        totalPrice: 4,
        purchaseable: true,
        purchasing: false,
        loading: false,
        error:false,
    }

    componentDidMount () {
        Axios.get('https://burger-builder-d521e.firebaseio.com/ingredients.json').then(response=>{
            console.log(response);
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error:true});
        });
    }

    addIngredientHandler = (type) => {
        //console.log(this.state.ingredients);
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        } ;
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        //console.log(this.state.ingredients);
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        } ;
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey] ;
            }).reduce((sum, el) => {
                return sum + el;
            },0);
        //console.log(sum);
        this.setState({purchaseable: sum > 0})
    }

    purchaseHandler = () => {
        const purchaseState = this.state.purchasing;
        this.setState({purchasing:!purchaseState});
    }

    purchaseContinue = () => {
        //alert('continue');
        this.props.history.push({
            pathname: '/Checkout',
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        });
    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        if(this.state.ingredients){
            orderSummary = <OrderSummary ingredients = {this.state.ingredients} purchaseCancelled = {this.purchaseHandler} purchaseContinue = {this.purchaseContinue} price = {this.state.totalPrice}/>
        }
        
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price = {this.state.totalPrice}
                        purchaseable = {this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        return (
            <Auxiliary>
                <Backdrop show={this.state.purchasing} clicked={this.purchaseHandler}/>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, instance);