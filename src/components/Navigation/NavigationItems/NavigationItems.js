import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.closed} link="/watch-list">Watch List</NavigationItem>
        <NavigationItem clicked={props.closed} link="/random-movie">Random Movie</NavigationItem>
        <NavigationItem clicked={props.closed} link="/random-tv-show">Random TV Show</NavigationItem>
        { !props.isAuthenticated ? 
            <NavigationItem clicked={props.closed} link="/sign-in">Sign In</NavigationItem> : 
            <NavigationItem clicked={props.closed} link="/logout">Logout</NavigationItem>}
    </ul>



);


export default navigationItems;