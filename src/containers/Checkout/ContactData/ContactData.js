import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false,
    }

    inputChangedHandler = (event) =>{
        console.log(event.target.value);
    }

    orderHandler = (event) => {
        event.preventDefault(); //dont send request on submit of form
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axiosInstance.post('/orders.json', order)
        .then(response => {
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({
                loading: false, 
            })
        });
    }

    render () {
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input 
                    key = {formElement.id}
                    elementType = {formElement.config.elementType} 
                    elementConfig = {formElement.config.elementConfig} 
                    value = {formElement.config.value}
                    changed = {this.inputChangedHandler}
                />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;