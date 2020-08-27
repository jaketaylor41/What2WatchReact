import React from 'react';
import classes from './TrailerInfo.css';

const trailerInfo = (props) => (

    <div className={classes.HomeHero} onClick={props.clicked}>
        <div className={classes.BackdropContainer}>
            <div className={classes.Wrapper}>
                <img
                    src={'https://image.tmdb.org/t/p/original/' + props.trailerPhoto}
                    alt={"missing"}
                    className={classes.HomeHeroImg}
                />
                <div className={classes.PlayBtn}>
                    <i className={"fa fa-play"}></i>
                    <div className={classes.PlayBtnItems}>
                        <span className={classes.HeroTitle}>Featured Trailer</span>
                        <br></br>
                        <span className={classes.TrailerTitle}>{props.trailerTitle}</span>
                    </div>
                </div>
                <div className={classes.Overlay}></div>
            </div>
        </div>
    </div>


);


export default trailerInfo;





