import React from 'react';
import classes from './HamburgerIcon.css';


const hamburgerIcon = (props) => (

    <div className={classes.HamburgerIcon} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>


);


export default hamburgerIcon;