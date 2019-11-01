import React from 'react';
import classes from './NavigationItems.css';

const navigation = (props) => (
    <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}><a href="/" className={classes.NavigationItem.active}>Burger Builder</a></li>
        <li className={classes.NavigationItem}><a href="/" className={classes.NavigationItem.active}>Checkout</a></li>
    </ul>
)

export default navigation;