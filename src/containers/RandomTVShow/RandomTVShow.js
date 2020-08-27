import React, { Component } from 'react';
import axios from 'axios';
import Poster from '../../components/Media/Poster/Poster';
import MediaControl from '../../components/Media/MediaControl/MediaControl';
import Modal from '../../components/UI/Modal/Modal';
import Overview from '../../components/Media/Overview/Overview';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './RandomShow.css';
import Aux from '../../hoc/Aux/Aux';
import moment from 'moment';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class RandomTVshow extends Component {

    state = {
        viewModal: false,
        loading: false,
        addToWatchList: false,
        alreadyAdded: false
    }

    componentDidMount () {
        this.props.onFetchRandomShow();
    }



    toggleMovieHandler = () => {
        
        this.setState({loading: true});
        this.props.onFetchRandomShow();
        
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
                id: this.props.randomShow.id,
                poster: this.props.randomShow.poster_path,
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
        
        let show = null;
        let overview = null;

        let disabledInfo = false;

        if (this.state.alreadyAdded === true) {
            disabledInfo = true;
        }

        if (this.props.randomShow) {
            show = (
                <div className={!this.state.loading && classes.Load}>
                    <Poster
                        poster={this.props.randomShow.poster_path}
                        backdrop={this.props.randomShow.backdrop_path}
                        clicked={this.showModalHandler}
                        loading={this.state.loading}
                    />                        
                </div>
    
            );
            overview = <Overview
                            title={this.props.randomShow.name}
                            rating={this.props.randomShow.vote_average}
                            numVotes={this.props.randomShow.vote_count}
                            duration={this.convertDuration(this.props.randomShow.episode_run_time)}
                            genre={this.props.randomShow.genres.map((genres, index) => ( (index ? ', ' : '') + genres.name))}
                            mpaa={this.props.randomShow.mpaa ? this.props.randomShow.mpaa : 'NR'}
                            date={moment(this.props.randomShow.first_air_date).format('MMMM Do, YYYY')}
                            overview={this.props.randomShow.overview}
                        />
        }

        if (this.state.loading) {
            show = (
                <div style={{marginTop: '50%'}}>
                    <Spinner />
                </div>
            );
        }

        return (
            <Aux>
                <div className={classes.RandomShowDiv}>
                    <Modal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                        {overview}
                    </Modal>
                    
                    <div className={classes.ShowContainer} style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}> 
                        <div>
                            <div className={classes.ImageWrapper}>
                                {show}
                            </div>
                        </div>
                    </div>

                    <MediaControl
                        toggleMovie={this.toggleMovieHandler}
                        addToList={this.addToWatchListHandler}
                        disabled={disabledInfo}
                        added={this.state.addToWatchList}
                    />

                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        randomShow: state.randomShow.randomShow,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRandomShow: () => dispatch(actions.fetchRandomShow()),
        onAddItem: (watchData, token) => dispatch(actions.addWatchItem(watchData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RandomTVshow, axios));