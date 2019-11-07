import React, {Component} from 'react';
import Auxiliary from '../Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render () {
        return(
        <Auxiliary>
            <Toolbar open = {this.SideDrawerOpenHandler}/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.SideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }
};

export default Layout;