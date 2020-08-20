import React, {useState, useEffect} from 'react';
import classes from './InTheatresPoster.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';


const inTheatrePoster = (props) =>  {
    
    const [imdb, setImdb] = useState({imdbId: []});

    useEffect( () => {
        const fetchImdb = async () => {
            const response = await axios(`https://api.themoviedb.org/3/movie/${props.id}?api_key=b2b33767c6b429003530678acd077911&language=en-US`);
            setImdb(response.data.imdb_id);
            console.log(response.data.imdb_id)
        };
        fetchImdb();
    }, []);
    
    return (
        <Card className={classes.Card}>
            <a target="_blank" className={classes.ImdbLink} href={`https://www.imdb.com/title/${imdb}/`}>
            <div className={classes.PosterContainer}>
                <div className={classes.Wrapper}>
                    <img
                        id={props.id}
                        src={'https://image.tmdb.org/t/p/w220_and_h330_face/' + props.poster_path}
                        alt="missing"
                        className={classes.Poster} 
                    /> 
                    <div className={classes.Overlay}></div>
                </div>
            </div>
            </a>
            <Card.Body className={classes.CardBody}>
                <div className={classes.PosterInfo}>
                    <h3 className={classes.Title}>{props.original_title}</h3>
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
            </Card.Body>
        </Card>

    );
}



export default inTheatrePoster;