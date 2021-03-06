import * as actionTypes from './actionTypes';
import axios from 'axios';
import config from '../../config';


const {baseUrl, apiKey} = config.tmdb;
const {topRated} = config.sortBy;
const {movie, tv} = config.categories;
const {videos, ratings, tvRatings} = config.append;


//==========================================================================================================
//  RANDOM MOVIE
//==========================================================================================================

export const fetchRandomMovieSuccess = (randomMovie) => {
    return {
        type: actionTypes.FETCH_RANDOM_MOVIE_SUCCESS,
        randomMovie: randomMovie
    };
};

export const fetchRandomMovieFail = (error) => {
    return {
        type: actionTypes.FETCH_RANDOM_MOVIE_FAIL,
        error: error
    };
};

export const fetchRandomMovie = () => {
    return dispatch => {
        const randomMoviePage = Math.floor(Math.random() * 300) + 1;
        axios.get(`${baseUrl}${movie}/${topRated}?page=${randomMoviePage}&language=en-US&api_key=${apiKey}`)
            .then( response => {
                const allMovies = response.data.results;
                const filteredMovies = [];
                for (let i = 0; i < allMovies.length; i++) {
                    if (allMovies[i].poster_path != null && allMovies[i].backdrop_path != null) {
                        filteredMovies.push(allMovies[i]);
                    }
                }

                const randomIndex = Math.floor(Math.random() * filteredMovies.length);
                const randomMovie = filteredMovies[randomIndex];
                dispatch(fetchMovieDetails(randomMovie.id));
            })
            .catch( err => {
                dispatch(fetchRandomMovieFail(err));
            } );
    }

}

export const fetchMovieDetails = (id) => {
    return dispatch => {
        axios.get(`${baseUrl}${movie}/${id}?api_key=${apiKey}&language=en-US&append_to_response=${videos},${ratings}`)
            .then(response => {
                let randomMovieDetails = response.data;
                const rating = response.data.release_dates.results;

                let movieDetails = [];
                for (let i = 0; i < rating.length; i++) {
                    if (rating[i].iso_3166_1 === "US") {
                        movieDetails.push({
                            ...randomMovieDetails,
                            mpaa: rating[i].release_dates[0].certification
                        });
                    }
                }

                if (movieDetails.length === 0) {
                    movieDetails.push(randomMovieDetails)
                }
                dispatch(fetchRandomMovieSuccess(movieDetails));
            })
            .catch(err => {
                dispatch(fetchRandomMovieFail(err));
            } );
    }

}

export const fetchMovieDetailsSuccess = (movieDetails) => {
    return {
        type: actionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
        movieDetails: movieDetails
    };
}


//==========================================================================================================
//  RANDOM SHOW
//==========================================================================================================



export const fetchRandomShow = () => {
    return dispatch => {
        const randomTvPage = Math.floor(Math.random() * 50);
        axios.get(`${baseUrl}${tv}/${topRated}?api_key=${apiKey}&language=en-US&page=${randomTvPage}`)
        .then( response => {
            const allShows = response.data.results;
            let filteredShows = [];
            for (let i = 0; i < allShows.length; i++) {
                if (allShows[i].poster_path != null && allShows[i].backdrop_path != null) {
                    filteredShows.push(allShows[i]);
                }
            }
            
            const randomIndex = Math.floor(Math.random() * filteredShows.length);
            const randomShow = filteredShows[randomIndex];

            dispatch(fetchShowDetails(randomShow.id));
        })
        .catch( err => {
            dispatch(fetchRandomShowFail(err));
        } );
    }
    
}



export const fetchShowDetails = (id) => {
    return dispatch => {
        axios.get(`${baseUrl}${tv}/${id}?api_key=${apiKey}&language=en-US&append_to_response=${videos},${tvRatings}`)
        .then(response => {
            let randomShowDetails = response.data;
            const rating = response.data.content_ratings.results;
            
            let showDetails = [];
            for (let i = 0; i < rating.length; i++) {
                if (rating[i].iso_3166_1 === "US") {
                    showDetails.push({
                        ...randomShowDetails,
                        mpaa: rating[i].rating
                    });
                }
            }
            if (showDetails.length === 0) {
                showDetails.push(randomShowDetails)
            }
            dispatch(fetchRandomShowSuccess(showDetails));
        })
        .catch(err => {
            dispatch(fetchRandomShowFail(err));
        } );
    }
    
}

export const fetchRandomShowSuccess = (randomShow) => {
    return {
        type: actionTypes.FETCH_RANDOM_SHOW_SUCCESS,
        randomShow: randomShow
    };

}
        
export const fetchRandomShowFail = (error) => {
    return {
        type: actionTypes.FETCH_RANDOM_SHOW_FAIL,
        error: error
    };
}