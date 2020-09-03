import React from 'react';
import classes from './ScrollBtn.css'


const scrollBtn = (props) => (

    <div className={classes.ScrollBtnDiv}>
        <button className={classes.ScrollBtn} onClick={props.scroll}><i className="fa fa-chevron-right"></i></button>
    </div>


);




export default scrollBtn;