import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {
    // attach 
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className = {classes.SideDrawer}>
                <Logo height = "11%" marginBottom = "32px"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;