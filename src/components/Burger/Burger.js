import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //convert the props (object) into an array.  igKey is the name of element (salad), i is quantity
   // console.log(props.ingredients); //object -> {ingredient:quantity}
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        //console.log(igKey); //Object.keys seperates object into array, with the ingredient as the key (igKey)
        return [...Array(props.ingredients[igKey])].map( //[ , ] new array with 2 elements
            (_, i) => {
                console.log(igKey, i); //outputs ingredient, index of ingredient(if there are 2 cheese, 
                //it will be cheese 0 cheese 1)
                return <BurgerIngredient key ={igKey + i} type = {igKey}/>;
            });
    }).reduce((arr, el) => { //flatten array so it is now one array, not an array of arrays
        return arr.concat(el)
    }, []);
    console.log(transformedIngredients);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;