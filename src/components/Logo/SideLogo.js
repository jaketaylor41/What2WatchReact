import React from 'react';
import w2wIcon from '../../assets/images/w2wIcon.png';
import classes from './SideLogo.css';

const sideLogo = (props) => (

    <div className={classes.Logo}>
        <a href="/">
            <img src={w2wIcon} alt="W2W" />
        </a>
    </div>


);



export default sideLogo;