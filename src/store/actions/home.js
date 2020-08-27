import axios from 'axios';
import config from '../../config';
import * as actionTypes from './actionTypes';


const {baseUrl, apiKey} = config.tmdb;
const {nowPlaying, upcoming, trending, day} = config.sortBy;
const {movie, tv} = config.categories;
const {videos} = config.append;


//==========================================================================================================
//  NOW SHOWING MOVIES 
//==========================================================================================================

export const fetchNowPlayingSuccess = (nowShowing) => {
    return {
        type: actionTypes.FETCH_NOW_PLAYING_SUCCESS,
        nowShowing: nowShowing
    };
}

export const fetchNowPlayingFail = (error) => {
    return {
        type: actionTypes.FETCH_NOW_PLAYING_FAIL,
        error: error
    };
}


export const fetchNowPlaying = () => {
    return dispatch => {
        axios.get(`${baseUrl}${movie}/${nowPlaying}?region=US&page=1&language=en-US&api_key=${apiKey}`)
            .then( response => {
                const nowPlayingData = response.data.results;
                let filteredNowPlayingData = [];

                nowPlayingData.forEach(function(item) {
                    if(item.poster_path != null) {
                        filteredNowPlayingData.push(item);
                    }
                });


                dispatch(fetchNowPlayingSuccess(filteredNowPlayingData));
                dispatch(fetchVideoKey(filteredNowPlayingData[1].id))
            })
            .catch( err => {
                dispatch(fetchNowPlayingFail(err));
            } );
    }

}


//==========================================================================================================
//  UPCOMING MOVIES 
//==========================================================================================================

export const fetchUpcomingSuccess = (upcoming) => {
    return {
        type: actionTypes.FETCH_UPCOMING_SUCCESS,
        upcoming: upcoming
    };
}

export const fetchUpcomingFail = (error) => {
    return {
        type: actionTypes.FETCH_UPCOMING_FAIL,
        error: error
    };
}


export const fetchUpcoming = () => {
    return dispatch => {
        axios.get(`${baseUrl}${movie}/${upcoming}?region=US&page=1&language=en-US&api_key=${apiKey}`)
            .then( response => {
                const upcomingData = response.data.results;
                let filteredUpcomingData = [];

                upcomingData.forEach(function(item) {
                    if(item.poster_path != null) {
                        filteredUpcomingData.push(item);
                    }
                });
                dispatch(fetchUpcomingSuccess(filteredUpcomingData));
            })
            .catch( err => {
                dispatch(fetchUpcomingFail(err));
            } );
    }

}

//==========================================================================================================
//  TRENDING TV SHOWS
//==========================================================================================================

export const fetchTrendingTv = () => {
    return dispatch => {
        axios.get(`${baseUrl}${trending}/${tv}/${day}?api_key=${apiKey}`)
            .then( response => {
                const trendingData = response.data.results;
                let filteredTrending = [];

                trendingData.forEach(function(item) {
                    if(item.poster_path != null) {
                        filteredTrending.push(item);
                    }
                });
                dispatch(fetchTrendingTvSuccess(filteredTrending));
            })
            .catch( error => {
                dispatch(fetchTrendingTvFail(error));
            } );
    }
}


export const fetchTrendingTvSuccess = (trendingTv) => {
    return {
        type: actionTypes.FETCH_TRENDING_TV_SUCCESS,
        trendingTv: trendingTv
    };
}


export const fetchTrendingTvFail = (error) => {
    return {
        type: actionTypes.FETCH_TRENDING_TV_FAIL,
        error: error
    };
}


//==========================================================================================================
//  VIDEO KEY
//==========================================================================================================

export const fetchVideoKey = (id) => {
    return dispatch => {
        axios.get(`${baseUrl}${movie}/${id}?api_key=${apiKey}&language=en-US&append_to_response=${videos}`)
            .then( response => {
                const youtubeKey = response.data.videos.results[0].key;
                dispatch(fetchVideoKeySuccess(youtubeKey));
            })
            .catch(error => {
                dispatch(fetchVideoKeyFail(error));
            })
    }
}

export const fetchVideoKeySuccess = (videoKey) => {
    return {
        type: actionTypes.FETCH_VIDEO_KEY_SUCCESS,
        videoKey: videoKey
    };
}

export const fetchVideoKeyFail = (error) => {
    return {
        type: actionTypes.FETCH_VIDEO_KEY_FAIL,
        error: error
    };
}



