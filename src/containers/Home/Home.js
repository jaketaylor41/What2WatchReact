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
import ScrollBtn from '../../components/UI/ScrollBtn/ScrollBtn';


class Home extends Component {

    state = {
       viewModal: false,
       playTrailer: false,
       trendingScroll: 0,
       nowShowingScroll: 0,
       upcomingScroll: 0
    };

    componentDidMount () {
        this.props.onFetchNowShowing();
        this.props.onFetchUpcoming();
        this.props.onFetchTrendingTv();
        this.trendingColRef = React.createRef();
        this.nowShowingRef = React.createRef();
        this.upcomingRef = React.createRef();
        this.scrollWrapperRef = React.createRef();
    }


    showModalHandler = () => {
        this.setState({playTrailer: true});
        this.setState({viewModal: true});
    };



    closeModalHandler = () => {
        this.setState({playTrailer: false});
        this.setState({viewModal: false});
    };

    handleScroll = () => {
        const colPosition = this.trendingColRef.current.scrollTop;
        const nowShowingPosition = this.nowShowingRef.current.scrollLeft;
        const upcomingPosition = this.upcomingRef.current.scrollLeft;

        if(colPosition > 0 ) {
            this.setState({trendingScroll: 1});
        }

        if (colPosition === 0) {
            this.setState({trendingScroll: 0});
        }

        if(nowShowingPosition > 0 ) {
            this.setState({nowShowingScroll: 1});
        }

        if (nowShowingPosition === 0) {
            this.setState({nowShowingScroll: 0});
        }

        if(upcomingPosition > 0 ) {
            this.setState({upcomingScroll: 1});
        }

        if (upcomingPosition === 0) {
            this.setState({upcomingScroll: 0});
        }
    };

    trendingSlideClick = (scrollTo) => {
        
        this.scrollWrapperRef.current.scrollLeft += scrollTo;

    };


    
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

        const trendingFade = [];
        const nowShowingFade = [];
        const upcomingFade = [];

        if (this.state.trendingScroll === 0) {
            trendingFade.push(classes.TrendingFade);
        }
        if (this.state.trendingScroll > 0) {
            trendingFade.push(classes.HideFade);
        }

        if (this.state.nowShowingScroll === 0) {
            nowShowingFade.push(classes.ShowingFade);
        }
        if (this.state.nowShowingScroll > 0) {
            nowShowingFade.push(classes.HideFade);
        }

        if (this.state.upcomingScroll === 0) {
            upcomingFade.push(classes.ShowingFade);
        }
        if (this.state.upcomingScroll > 0) {
            upcomingFade.push(classes.HideFade);
        }
        
        
        
        return (
            <div className={classes.HomeDiv}>

                <TrailerModal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                    {this.state.playTrailer && trailerId}
                </TrailerModal>

                <div style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}>

                    <section className={classes.SectionOne}>

                        <Container fluid className={classes.SectionOneContainer}>
                            <Row>
                                <Col className={classes.TrailerCol} lg={8}>
                                    {trailer}
                                </Col>
                                <Col className={classes.TrendingCol} ref={this.trendingColRef} onScroll={this.handleScroll}>
                                    <div className={trendingFade.join(' ')}></div>
                                    <div className={classes.TrendingTitle}>
                                        <span>Trending TV Shows</span>
                                    </div>
                                    <div className={classes.ScrollWrapper} ref={this.scrollWrapperRef}>
                                        <ScrollBtn scroll={() => this.trendingSlideClick(300)} />
                                        {trending}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        
                    </section>

                    <section className={classes.SectionTwo}>

                        <h2 className={classes.SectionTwoTitle}>Now Showing</h2>
                        <Container fluid className={classes.Container}>
                            <div className={classes.Row} ref={this.nowShowingRef} onScroll={this.handleScroll}>
                                <div className={nowShowingFade.join(' ')}></div>
                                {showing}
                            </div>
                        </Container>

                    </section>

                    <section className={classes.SectionThree}>

                        <h2 className={classes.SectionThreeTitle}>Upcoming</h2>
                        <Container fluid className={classes.Container}>
                            <div className={classes.Row} ref={this.upcomingRef} onScroll={this.handleScroll}>
                            <div className={upcomingFade.join(' ')}></div>
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