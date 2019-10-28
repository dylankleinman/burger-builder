import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSumary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
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

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Auxiliary>
                <Backdrop show={this.state.purchasing} clicked={this.purchaseHandler}/>
                <Modal show={this.state.purchasing}><OrderSummary ingredients = {this.state.ingredients}/></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;