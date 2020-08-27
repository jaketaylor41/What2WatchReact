import React from 'react';
import classes from './TrendingTv.css';
import Aux from '../../../hoc/Aux/Aux';
import moment from 'moment';

const trendingTv = (props) => (

    <Aux>
        <div className={classes.TrendingContainer}>
            <div className={classes.TrendingWrapper}>
                <div className={classes.ColumnContainer}>
                    <div className={classes.ColumnWrapper}>
                        <div className={classes.TrendingSlots}>
                            <div className={classes.InfoContainer}>
                                <h2 className={classes.ShowInfo}>{props.name}</h2>
                                <p className={classes.Overview}>Aired: {moment(props.date).format('MMMM Do, YYYY')}</p>
                                <div className={classes.RatingWrapper}>
                                    <i className="fa fa-star"></i>
                                    <div className={classes.Rating}>
                                        <div className={classes.RatingValue}>
                                            <strong>
                                                <span>{props.voteAvg}</span>
                                            </strong>
                                            <span className={classes.Grey}>/</span>
                                            <span className={classes.Grey}>10</span>
                                        </div>
                                        <div>
                                            <span className={classes.Grey}>{props.voteCount} votes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.Slot}> 
                                <div className={classes.PosterContainer}>
                                    <div className={classes.Wrapper}>
                                        <img
                                            src={'https://image.tmdb.org/t/p/w220_and_h330_face/' + props.poster}
                                            alt="missing"
                                            className={classes.Poster} 
                                        />
                                        <div className={classes.Overlay}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Aux>


);

export default trendingTv;