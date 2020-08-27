import React, { Component } from 'react';
import axios from 'axios';
import InTheatrePoster from '../../components/Media/InTheatres/InTheatresPoster/InTheatresPoster';
import UpcomingPoster from '../../components/Media/Upcoming/UpcomingPoster/UpcomingPoster';
import TrailerModal from '../../components/UI/TrailerModal/TrailerModal';
import {Container, Row, Col} from 'react-bootstrap';
import classes from './Home.css';
import TrailerInfo from '../../components/Media/TrailerInfo/TrailerInfo';
import TrendingTv from '../../components/Media/TrendingTv/TrendingTv';
import moment from 'moment';
import Trailer from '../../components/Media/Trailer/Trailer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';


class Home extends Component {

    state = {
       viewModal: false,
       playTrailer: false
    }

    componentDidMount () {
        this.props.onFetchNowShowing();
        this.props.onFetchUpcoming();
        this.props.onFetchTrendingTv();
    }


    showModalHandler = () => {
        this.setState({playTrailer: true});
        this.setState({viewModal: true});
    }



    closeModalHandler = () => {
        this.setState({playTrailer: false});
        this.setState({viewModal: false});
    }


    
    render () {


        let showing = null;
        let upcoming = null;
        let trailer = null;
        let trailerId = null;
        let trending = null;

        if (this.props.nowShowing) {
            
            showing = this.props.nowShowing.map((photo) => {
                
                return (
                        <InTheatrePoster
                            key={photo.id}
                            id={photo.id}
                            poster_path={photo.poster_path}
                            original_title={photo.title}
                            rating={photo.vote_average}
                            numVotes={photo.vote_count}
                        />
                    );
                })

                trailer = <TrailerInfo
                            trailerPhoto={this.props.trailerInfo.backdrop_path}
                            trailerTitle={this.props.trailerInfo.title}
                            clicked={this.showModalHandler}
                            />

                trailerId = <Trailer videoKey={this.props.videoKey}/>
        }

        if (this.props.upcoming) {
            upcoming = this.props.upcoming.map((photo) => {
                return (
                    <UpcomingPoster
                        key={photo.id}
                        id={photo.id}
                        poster_path={photo.poster_path}
                        original_title={photo.title}
                        release_date={moment(photo.release_date).format('MMM Do, YYYY')}
                    />
                 );
            });
        }

        if (this.props.trendingTv) {
            trending = this.props.trendingTv.map(item => {
                return (
                        <TrendingTv
                            key={item.id}
                            name={item.original_name}
                            date={item.original_air_date}
                            voteAvg={item.vote_average}
                            voteCount={item.vote_count}
                            poster={item.poster_path}
                        />
                    );
            });
        }
        
        
        return (
            <div className={classes.HomeDiv}>
                <TrailerModal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                    {this.state.playTrailer && trailerId}
                </TrailerModal>
                <div style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}>
                    <section className={classes.SectionOne}>
                        <Container fluid>
                            <Row>
                                <Col className={classes.TrailerCol} style={{paddingRight: '0', maxWidth: '53.333333%'}} md={7}>
                                    {trailer}
                                </Col>
                                <Col className={classes.TrendingCol}>
                                    <div className={classes.TrendingTitle}>
                                        <span>Trending TV Shows</span>
                                    </div>
                                    {trending}
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section className={classes.SectionTwo}>
                        <h2 className={classes.SectionTwoTitle}>Now Showing</h2>
                        <Container fluid className={classes.Container}>
                        <div className={classes.Row}>
                            {showing}
                        </div>
                    </Container>
                    </section>

                    <section className={classes.SectionThree}>
                    <h2 className={classes.SectionThreeTitle}>Upcoming</h2>
                    <Container fluid className={classes.Container}>
                        <div className={classes.Row}>
                            {upcoming}
                        </div>
                    </Container>
                    </section>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        nowShowing: state.nowShowing.nowShowing,
        upcoming: state.upcoming.upcoming,
        trendingTv: state.trendingTv.trendingTv,
        trailerInfo: state.trailerInfo.trailerInfo,
        videoKey: state.videoKey.videoKey,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNowShowing: () => dispatch( actions.fetchNowPlaying()),
        onFetchUpcoming: () => dispatch( actions.fetchUpcoming()),
        onFetchTrendingTv: () => dispatch( actions.fetchTrendingTv()),
        onAddItem: (watchData, token) => dispatch(actions.addWatchItem(watchData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));