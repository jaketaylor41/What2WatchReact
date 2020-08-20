import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/watch-list">Watch List</NavigationItem>
        <NavigationItem link="/random-movie">Random Movie</NavigationItem>
        <NavigationItem link="/random-tv-show">Random TV Show</NavigationItem>
        { !props.isAuthenticated ? 
            <NavigationItem link="/sign-in">Sign In</NavigationItem> : 
            <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>



);


export default navigationItems;