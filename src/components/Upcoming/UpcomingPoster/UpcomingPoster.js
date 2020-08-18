import React from 'react';
import classes from './UpcomingPoster.css';
import { Card } from 'react-bootstrap';




const upcomingPoster = (props) => (

            <Card className={classes.Card}>
                <div className={classes.PosterContainer}>
                    <div className={classes.Wrapper}>
                        <img
                            src={'https://image.tmdb.org/t/p/w220_and_h330_face/' + props.poster_path}
                            alt="missing"
                            className={classes.Poster} 
                        /> 
                        <div className={classes.Overlay}></div>
                    </div>
                </div>
                <Card.Body className={classes.CardBody}>
                    <div className={classes.PosterInfo}>
                        <h2 className={classes.Title}>{props.original_title}</h2>
                        <p className={classes.Date}>{props.release_date}</p>
                    </div>
                </Card.Body>
            </Card>
            

);


export default upcomingPoster;