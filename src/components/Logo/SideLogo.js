import React from 'react';
import w2wIcon from '../../assets/images/w2wIcon.png';
import classes from './Logo.css';

const sideLogo = (props) => (

    <div className={classes.Logo} style={{width: '100px'}}>
        <img src={w2wIcon} alt="W2W" />
    </div>


);



export default sideLogo;