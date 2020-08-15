import React, { Component } from 'react';
import axios from 'axios';
import Poster from '../../components/Movie/Poster/Poster';
import MovieControl from '../../components/Movie/MovieControl/MovieControl';
import Modal from '../../components/UI/Modal/Modal';
import MovieOverview from '../../components/Movie/MovieOverview/MovieOverview';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './RandomMovie.css';
import Aux from '../../hoc/Aux/Aux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class RandomMovie extends Component {

    state = {
        randomPage: Math.floor(Math.random() * 300) + 1,
        randomMovie: null,
        viewModal: false,
        loading: false,
        //addToWatchList: false,
        //alreadyAdded: false
    }

    componentDidMount () {
        this.fetchData();
    }


    fetchData = () => {

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${this.state.randomPage}&language=en-US&api_key=b2b33767c6b429003530678acd077911`)
        .then(response => {
            
            const allMovies = response.data.results;
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const randomMovie = response.data.results[randomIndex];

            this.setState({randomMovie: randomMovie});
            this.setState({randomPage: Math.floor(Math.random() * 300) + 1});
            this.setState({alreadyAdded: false});

            console.log(this.state.randomPage);
            console.log(allMovies);
            console.log(this.state.randomMovie);

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


    addToWatchListHandler = (event) => {
        event.preventDefault();

    
        this.setState({addToWatchList: true});
        this.setState({alreadyAdded: true});

        const watchData = {
            id: this.state.randomMovie.id,
            title: this.state.randomMovie.original_title,
            poster: this.state.randomMovie.poster_path,
            userId: this.props.userId
        }

        this.props.onAddItem(watchData, this.props.token);
        


        // const watch = {
        //         id: this.state.randomMovie.id,
        //         title: this.state.randomMovie.original_title,
        //         poster: this.state.randomMovie.poster_path
        // }
        
        //     axios.post('https://what2watch-cf980.firebaseio.com/watch.json', watch)
        //         .then( response => {
        //             console.log(response);
        //             this.setState({alreadyAdded: true});
        //         })
        //         .catch(error => console.log(error));
    }

    
    render () {
        
        let movie = null;
        let overview = null;

        let disabledInfo = false;

        if (this.state.alreadyAdded === true) {
            disabledInfo = true;
        }

        if (this.state.randomMovie) {
            movie = (
                <div className={classes.MovieContainer} 
                style={{filter: this.state.viewModal ? 'blur(5px)' : 'none'}}>
                    <Poster
                        poster={this.state.randomMovie.poster_path}
                        backdrop={this.state.randomMovie.backdrop_path}
                        clicked={this.showModalHandler}
                        loading={this.state.loading}
                    />                        
                </div>
    
            );
            overview = <MovieOverview title={this.state.randomMovie.original_title}
                            date={this.state.randomMovie.release_date}
                            overview={this.state.randomMovie.overview}/>
        }

        if (this.state.loading) {
            movie = <Spinner />
        }

        return (
            <Aux>
                <div>
                    <Modal show={this.state.viewModal} modalClosed={this.closeModalHandler}>
                        {overview}
                    </Modal>
                    
                    <Aux>
                        {movie}

                    </Aux>


                </div>

                <MovieControl
                toggleMovie={this.toggleMovieHandler}
                addToList={this.addToWatchListHandler}
                disabled={disabledInfo}
                add={this.state.addToWatchList} />


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
        onAddItem: (watchData, token) => dispatch(actions.addWatchItem(watchData, token))
    };
};

export default connect(mapDispatchToProps, mapStateToProps)(withErrorHandler(RandomMovie, axios));