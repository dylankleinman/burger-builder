import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from './Menu/Menu';

const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <Menu clicked = {props.open}/>
        <Logo height = '80%'/>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;