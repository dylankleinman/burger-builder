import React from 'react';
import classes from './NavigationItems.css';
import {NavLink} from 'react-router-dom';

const navigation = (props) => (
    <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}><NavLink exact to="/" activeClassName={classes.active}>Burger Builder</NavLink></li>
        <li className={classes.NavigationItem}><NavLink to="/Orders" activeClassName={classes.active}>Orders</NavLink></li>
    </ul>
)

export default navigation;