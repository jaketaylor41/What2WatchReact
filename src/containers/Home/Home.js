import React, { Component } from 'react';
import axios from 'axios';
import InTheatrePoster from '../../components/InTheatres/InTheatresPoster/InTheatresPoster';
import UpcomingPoster from '../../components/Upcoming/UpcomingPoster/UpcomingPoster';
import Modal from '../../components/UI/Modal/Modal';
import {Container} from 'react-bootstrap';
import classes from './Home.css';
import HomeHero from '../../components/UI/HomeHero/HomeHero';
import moment from 'moment';
import Trailer from '../../components/UI/HomeHero/Trailer/Trailer';

class Home extends Component {

    state = {
       nowShowing: null,
       upcoming: null,
       homePicture: null,
       homeTitle: null,
       trailerKey: null,
       viewModal: false
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
                const nowPlayingData = response[0].data.results.slice(0, 10);
                const upcomingData = response[1].data.results.slice(0, 10);
                const homePic = response[1].data.results[1].backdrop_path;
                const homeTitle = response[1].data.results[1].original_title;
                this.setState({nowShowing: nowPlayingData});
                this.setState({upcoming: upcomingData});
                this.setState({homePicture: homePic});
                this.setState({homeTitle: homeTitle});
                console.log(response[0]);
                console.log(response[1]);
            })
            .catch(error => console.log(error));
    }

    showModalHandler = () => {
        this.setState({viewModal: true});
    }



    closeModalHandler = () => {
        this.setState({viewModal: false});
    }

    
    render () {


        let showing = null;
        let upcoming = null;

        if (this.state.nowShowing) {
            showing = this.state.nowShowing.map((photo) => {
                return (
                        <InTheatrePoster
                        key={photo.id}
                        poster_path={photo.poster_path}
                        original_title={photo.original_title}
                        release_date={moment(photo.release_date).format('MM/DD/YYYY')}
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
        }

        let homeDiv = {
            overflow: 'hidden'
        }



        return (
            <div style={homeDiv}>
                <Modal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                    <Trailer/>
                </Modal>
                <section className={classes.SectionOne}>
                    <HomeHero trailerPhoto={this.state.homePicture} trailerTitle={this.state.homeTitle} clicked={this.showModalHandler}/>
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

        );
    }
}

export default Home;