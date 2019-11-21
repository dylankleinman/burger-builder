import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style = {{width:'100%', margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
                <Button clicked = {props.CheckoutCancelled} btnType = "Danger">CANCEL</Button>
                <Button clicked = {props.CheckoutContinued} btnType = "Success">CONTINUE</Button>
            </div>
        </div>
    )
}

export default CheckoutSummary;