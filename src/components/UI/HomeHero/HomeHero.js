import React, {useState, useEffect} from 'react';
import classes from './HomeHero.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';



const homeHero = (props) => {

    const [trending, setTrending] = useState([]);

    useEffect( () => {
        const fetchTrending = async () => {
            const trendingRes = await axios('https://api.themoviedb.org/3/trending/tv/day?api_key=b2b33767c6b429003530678acd077911');

            setTrending(trendingRes.data.results);
            console.log(trendingRes.data.results);
        };
        fetchTrending();
    }, []);


        return (
            <Container fluid>
                <Row>
                    <Col style={{paddingRight: '0', maxWidth: '53.333333%'}} md={7}>
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
                                <div>
                                    <span className={classes.HeroTitle}>Featured Trailer</span>
                                    <br></br>
                                    <span className={classes.TrailerTitle}>{props.trailerTitle}</span>
                                </div>
                            </div>
                                    <div className={classes.Overlay}></div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                                <div className={classes.TitleContainer}>
                                    <span>Trending TV Shows</span>
                                </div>
                        <div className={classes.TrendingContainer}>
                            <div className={classes.TrendingWrapper}>
                                <div className={classes.ColumnContainer}>
                                    <div className={classes.ColumnWrapper}>
                                        {trending.map(show => (
                                            <div className={classes.TrendingSlots} key={show.id}>
                                                <div className={classes.InfoContainer}>
                                                    <h2 className={classes.ShowInfo}>{show.original_name}</h2>
                                                    <p className={classes.Overview}>Aired: {moment(show.first_air_date).format('MMMM Do, YYYY')}</p>
                                                    <div className={classes.RatingWrapper}>
                                                        <i className="fa fa-star"></i>
                                                        <div className={classes.Rating}>
                                                            <div className={classes.RatingValue}>
                                                                <strong>
                                                                    <span>{show.vote_average}</span>
                                                                </strong>
                                                                <span className={classes.Grey}>/</span>
                                                                <span className={classes.Grey}>10</span>
                                                            </div>
                                                            <div>
                                                                <span className={classes.Grey}>{show.vote_count} votes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.Slot}> 
                                                    <div className={classes.PosterContainer}>
                                                        <div className={classes.Wrapper}>
                                                            <img
                                                                src={'https://image.tmdb.org/t/p/w220_and_h330_face/' + show.poster_path}
                                                                alt="missing"
                                                                className={classes.Poster} 
                                                            />
                                                            <div className={classes.Overlay}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Col>
                </Row>
            </Container>

        );
    } 



export default homeHero;