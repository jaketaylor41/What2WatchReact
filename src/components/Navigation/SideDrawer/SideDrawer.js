import React from 'react';
import Logo from '../../Logo/SideLogo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

//Wrap with Aux since Backdrop and divs are adjacent JSX elements
//Add show to Backdrop to set it to true

    //Always contains side drawer class, and uses closed class as a default
    let attachedClasses = [classes.SideDrawer, classes.Close];
    //When the open property is true, add the Open class
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );


};


export default sideDrawer;