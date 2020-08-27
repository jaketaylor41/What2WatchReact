import React from 'react';
import w2wIcon from '../../assets/images/What2Watch.png';
import classes from './Logo.css';

const logo = (props) => (

    <div className={classes.Logo}>
        <a href="/">
        <img src={w2wIcon} alt="W2W" />
        </a>
    </div>


);



export default logo;