import React from 'react';
import w2wIcon from '../../assets/images/w2wIcon.png';
import classes from './Logo.css';

const logo = (props) => (

    <div className={classes.Logo} style={{height: props.height}}>
        <img src={w2wIcon} alt="W2W" />
    </div>


);



export default logo;