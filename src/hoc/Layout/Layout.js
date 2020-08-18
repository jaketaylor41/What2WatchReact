import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

/* Main allows me to use this layout component as a wrapper around the core content
    component I want to render to the screen */

/* Can't have adjacent JSX elements without. SOLUTION: allowed if returning array or wrapped in Aux componet */

/* props.children - refers to any elements between opening and closing tags of component  */

/* Convert layout to class so that we can listen to both sidedrawer closing itself and toolbar to toggle side drawer  */

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }


    render () {
        return (
        <Aux>
            <Toolbar
                isAuth={this.props.isAuthenticated} 
                hamburgerIconClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }

} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);