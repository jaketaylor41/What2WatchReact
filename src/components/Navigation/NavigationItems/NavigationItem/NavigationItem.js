import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';
import Ripples from 'react-ripples';



const navigationItem = (props) => (

    <Ripples>
    <li className={classes.NavigationItem}>
        <NavLink 
        to={props.link}
        exact={props.exact}
        onClick={props.clicked} 
        activeClassName={classes.active}>{props.children}</NavLink>
    </li>
    </Ripples>

);

export default navigationItem;