import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Overview.css';



const overview = (props) => {

    return (
        <Aux>
            <div className={classes.OverviewDiv}>
                <div className={classes.TitleContainer}>
                    <div className={classes.TitleWrapper}>
                        <div className={classes.Title}>
                            <h3>{props.title}</h3>
                            <p>{props.date}</p>
                        </div>
                        <div className={classes.RatingWrapper}>
                        <i className="fa fa-star"></i>
                            <div className={classes.Rating}>
                                <div className={classes.RatingValue}>
                                    <strong>
                                        <span>{props.rating}</span>
                                    </strong>
                                    <span className={classes.Grey}>/</span>
                                    <span className={classes.Grey}>10</span>
                                </div>
                                <div>
                                    <span className={classes.Grey}>{props.numVotes} votes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.Overview}>
                    <p>{props.overview}</p>
                </div>
            </div>

        </Aux>

    );
    
};

export default overview;