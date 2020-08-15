import React from 'react';
import classes from './UpcomingPoster.css';
import { Card, Col } from 'react-bootstrap';


let cardStyle = {
    border: 0,
    padding: '10px'
}

let cardBodyStyle = {

    textAlign: 'center'
}

const upcomingPoster = (props) => (
    

    <React.Fragment>
        <Col>
            <Card style={cardStyle}>
                <Card.Img
                variant="top"
                src={'https://image.tmdb.org/t/p/w500/' + props.poster_path}
                className={classes.Poster} 
                />
                <Card.Body style={cardBodyStyle}>
                    <div className={classes.PosterInfo}>
                        <h1 className={classes.Title}>{props.original_title}</h1>
                        <h3 className={classes.Date}>Coming {props.release_date}</h3>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </React.Fragment>

);


export default upcomingPoster;