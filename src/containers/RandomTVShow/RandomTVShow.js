import React, { Component } from 'react';
import axios from 'axios';
import Poster from '../../components/Movie/Poster/Poster';
import MovieControl from '../../components/Movie/MovieControl/MovieControl';
import Modal from '../../components/UI/Modal/Modal';
import MovieOverview from '../../components/Movie/MovieOverview/MovieOverview';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './RandomShow.css';
import Aux from '../../hoc/Aux/Aux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class RandomTVshow extends Component {

    state = {
        randomPage: Math.floor(Math.random() * 57),
        randomShow: null,
        viewModal: false,
        loading: false,
        addToWatchList: false,
        alreadyAdded: false
    }

    componentDidMount () {
        this.fetchData();
    }


    fetchData = () => {

        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=b2b33767c6b429003530678acd077911&language=en-US&page=${this.state.randomPage}`)
        .then(response => {
            
            const allShows = response.data.results;
            let filteredShows = [];
            for (let i = 0; i < allShows.length; i++) {
                if (allShows[i].poster_path != null && allShows[i].backdrop_path != null) {
                    filteredShows.push(allShows[i]);
                }
            }
            console.log(filteredShows)
            const randomIndex = Math.floor(Math.random() * filteredShows.length);
            const randomShow = filteredShows[randomIndex];
            
            this.setState({randomShow: randomShow});
            this.setState({randomPage: Math.floor(Math.random() * 57) + 1});
            this.setState({alreadyAdded: false});
            
            console.log(allShows);
            console.log(this.state.randomPage);
            console.log(this.state.randomShow);

        })
        .catch(error => {
            console.log(error);
        });
        
    }



    toggleMovieHandler = () => {
        
        this.setState({loading: true});
        this.fetchData();
        
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

        this.setState({addToWatchList: true});
        this.setState({alreadyAdded: true});

        const watchData = {
            title: this.state.randomShow.original_title,
            poster: this.state.randomShow.poster_path,
            userId: this.props.userId
        }

        this.props.onAddItem(watchData, this.props.token);

    }

    
    render () {
        
        let show = null;
        let overview = null;

        let disabledInfo = false;

        if (this.state.alreadyAdded === true) {
            disabledInfo = true;
        }

        if (this.state.randomShow) {
            show = (
                <div className={!this.state.loading && classes.Load}>
                    <Poster
                        poster={this.state.randomShow.poster_path}
                        backdrop={this.state.randomShow.backdrop_path}
                        clicked={this.showModalHandler}
                        loading={this.state.loading}
                    />                        
                </div>
    
            );
            overview = <MovieOverview title={this.state.randomShow.name}
                            date={this.state.randomShow.first_air_date}
                            overview={this.state.randomShow.overview}/>
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
                <div>
                    <Modal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                        {overview}
                    </Modal>
                    
                    <div className={classes.MovieContainer} style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}> 
                        <div>
                            <div className={classes.ImageWrapper}>
                                {show}
                            </div>
                        </div>
                    </div>


                </div>

                <MovieControl
                toggleMovie={this.toggleMovieHandler}
                addToList={this.addToWatchListHandler}
                disabled={disabledInfo}
                added={this.state.addToWatchList} />


            </Aux>

        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (watchData, token, userId) => dispatch(actions.addWatchItem(watchData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RandomTVshow, axios));