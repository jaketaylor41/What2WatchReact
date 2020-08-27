import React, {useState, useEffect} from 'react';
import classes from './UpcomingPoster.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../../config';


const upcomingPoster = (props) => {

    const {baseUrl, apiKey} = config.tmdb;
    const {movie} = config.categories;
    
    const [imdb, setImdb] = useState({imdbId: []});

    useEffect( () => {
        const fetchImdb = async () => {
            const response = await axios(`${baseUrl}${movie}/${props.id}?api_key=${apiKey}&language=en-US`);
            setImdb(response.data.imdb_id);
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
                    <h2 className={classes.Title}>{props.original_title}</h2>
                    <p className={classes.Date}>{props.release_date}</p>
                </div>
            </Card.Body>
        </Card>
    );

};


export default upcomingPoster;