import React, { Component } from 'react';
import axios from 'axios';
import InTheatrePoster from '../../components/InTheatres/InTheatresPoster/InTheatresPoster';
import UpcomingPoster from '../../components/Upcoming/UpcomingPoster/UpcomingPoster';
import TrailerModal from '../../components/UI/TrailerModal/TrailerModal';
import {Container} from 'react-bootstrap';
import classes from './Home.css';
import HomeHero from '../../components/UI/HomeHero/HomeHero';
import moment from 'moment';
import Trailer from '../../components/UI/HomeHero/Trailer/Trailer';

class Home extends Component {

    state = {
       nowShowing: null,
       upcoming: null,
       viewModal: false,
       playTrailer: false
    }

    componentDidMount () {
        this.fetchData();
    }

    fetchData = () => {

        axios.all([
            axios.get('https://api.themoviedb.org/3/movie/now_playing?region=US&page=1&language=en-US&api_key=b2b33767c6b429003530678acd077911'),
            axios.get('https://api.themoviedb.org/3/movie/upcoming?region=US&page=1&language=en-US&api_key=b2b33767c6b429003530678acd077911')
        ])
            .then(response => {
                const nowPlayingData = response[0].data.results;
                const upcomingData = response[1].data.results;
                let filteredUpcomingData = [];
                let filteredNowPlayingData = [];

                upcomingData.forEach(function(item) {
                    if(item.backdrop_path != null) {
                        filteredUpcomingData.push(item);
                    }
                });

                nowPlayingData.forEach(function(item) {
                    if(item.poster_path != null) {
                        filteredNowPlayingData.push(item);
                    }
                });

                this.setState({nowShowing: filteredNowPlayingData});
                this.setState({upcoming: filteredUpcomingData});
            })
            .catch(error => console.log(error));
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

        if (this.state.nowShowing) {
            showing = this.state.nowShowing.map((photo) => {
                console.log(photo.voter_average)
                return (
                        <InTheatrePoster
                        key={photo.id}
                        id={photo.id}
                        poster_path={photo.poster_path}
                        original_title={photo.original_title}
                        rating={photo.vote_average}
                        numVotes={photo.vote_count}
                         />
                 );
            })
        }

        if (this.state.upcoming) {
            upcoming = this.state.upcoming.map((photo) => {
                return (
                    <UpcomingPoster
                    key={photo.id}
                    poster_path={photo.poster_path}
                    original_title={photo.original_title}
                    release_date={moment(photo.release_date).format('MM/DD/YYYY')}
                    />
                 );
            })
            trailer = <HomeHero
                        trailerPhoto={this.state.upcoming[1].backdrop_path}
                        trailerTitle={this.state.upcoming[1].original_title}
                        clicked={this.showModalHandler}
                    />
            trailerId = <Trailer id={this.state.upcoming[1].id}/>
        }

        let homeDiv = {
            overflow: 'hidden'
        }
        return (
            <div style={homeDiv}>
                <TrailerModal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                    {this.state.playTrailer && trailerId}
                </TrailerModal>
                <div style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}>
                    <section className={classes.SectionOne}>
                        {trailer}
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

export default Home;