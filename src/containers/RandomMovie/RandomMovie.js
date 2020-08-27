import React, { Component } from 'react';
import axios from 'axios';
import Poster from '../../components/Media/Poster/Poster';
import MediaControl from '../../components/Media/MediaControl/MediaControl';
import Modal from '../../components/UI/Modal/Modal';
import Overview from '../../components/Media/Overview/Overview';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './RandomMovie.css';
import Aux from '../../hoc/Aux/Aux';
import moment from 'moment';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class RandomMovie extends Component {

    state = {
        viewModal: false,
        loading: false,
        addToWatchList: false,
        alreadyAdded: false
    }

    componentDidMount () {
        this.props.onFetchRandomMovie();
    }


    toggleMovieHandler = () => {
        
        this.setState({loading: true});
        this.props.onFetchRandomMovie();
        
        setTimeout(() => {
            this.setState({loading: false});
        }, 3000);

    }

    showModalHandler = () => {
        this.setState({viewModal: true});
    }



    closeModalHandler = () => {
        this.setState({viewModal: false});
    }

    addToWatchListHandler = () => {

        if (this.props.isAuthenticated) {
            this.setState({addToWatchList: true});
            this.setState({alreadyAdded: true});
    
            const watchData = {
                id: this.props.randomMovie.id,
                poster: this.props.randomMovie.poster_path,
                userId: this.props.userId
            }
    
            this.props.onAddItem(watchData, this.props.token);
        } else {
            this.props.history.push('/sign-in');
        }

    }

    convertDuration = (runtime) => {
        let num = runtime;
        let hours = (num / 60);
        let roundedHours = Math.floor(hours);
        let minutes = (hours - roundedHours) * 60;
        let roundedMin = Math.round(minutes);
        return roundedHours + 'h ' + roundedMin + 'min'
    }

    
    render () {
        
        let movie = null;
        let overview = null;

        let disabledInfo = false;

        if (this.state.alreadyAdded === true) {
            disabledInfo = true;
        }

        if (this.props.randomMovie) {
            movie = (
                    <Poster
                        poster={this.props.randomMovie.poster_path}
                        backdrop={this.props.randomMovie.backdrop_path}
                        clicked={this.showModalHandler}
                        loading={this.state.loading}
                    />
    
            );
            overview = <Overview
                            title={this.props.randomMovie.title}
                            rating={this.props.randomMovie.vote_average}
                            numVotes={this.props.randomMovie.vote_count}
                            duration={this.convertDuration(this.props.randomMovie.runtime)}
                            genre={this.props.randomMovie.genres.map((genres, index) => ( (index ? ', ' : '') + genres.name))}
                            mpaa={this.props.randomMovie.mpaa ? this.props.randomMovie.mpaa : 'NR'}
                            date={moment(this.props.randomMovie.release_date).format('MMMM Do, YYYY')}
                            overview={this.props.randomMovie.overview}/>
        }

        if (this.state.loading) {
            movie = (
                <div style={{marginTop: '50%'}}>
                    <Spinner />
                </div>
            );
        }

        return (
            <Aux>
                <div className={classes.RandomMovieDiv}>
                    <Modal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                        {overview}
                    </Modal>
                    
                    <div className={classes.MovieContainer} style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}> 
                        <div>
                            <div className={classes.ImageWrapper}>
                                {movie}
                            </div>
                        </div>
                    </div>

                <MediaControl
                toggleMovie={this.toggleMovieHandler}
                addToList={this.addToWatchListHandler}
                disabled={disabledInfo}
                added={this.state.addToWatchList} />

                </div>



            </Aux>

        );
    }

}

const mapStateToProps = state => {
    return {
        randomMovie: state.randomMovie.randomMovie,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRandomMovie: () => dispatch( actions.fetchRandomMovie()),
        onAddItem: (watchData, token) => dispatch(actions.addWatchItem(watchData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RandomMovie, axios));