import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    nowShowing: null,
    upcoming: null,
    trendingTv: null,
    trailerInfo: [],
    videoKey: null
}


//==========================================================================================================
//  NOW SHOWING MOVIES 
//==========================================================================================================

const fetchNowPlayingSuccess = (state, action) => {
    return updateObject( state, {
        nowShowing: action.nowShowing,
        trailerInfo: action.nowShowing[1]
    });
}


const fetchNowPlayingFail = (state, action) => {
    return updateObject( state, {loading: false});

};


//==========================================================================================================
//  UPCOMING MOVIES 
//==========================================================================================================

const fetchUpcomingSuccess = (state, action) => {
    return updateObject( state, {
        upcoming: action.upcoming
    });
}


const fetchUpcomingFail = (state, action) => {
    return updateObject( state, {loading: false});

};

//==========================================================================================================
//  VIDEO KEY
//==========================================================================================================


const fetchVideoKeySuccess = (state, action) => {
    return updateObject( state, {
        videoKey: action.videoKey
    });
};

const fetchVideoKeyFail = (state, action) => {
    return updateObject( state, {loading: false});
};


//==========================================================================================================
//  TRENDING TV
//==========================================================================================================

const fetchTrendingTvSuccess = (state, action) => {
    return updateObject( state, {
        trendingTv: action.trendingTv
    });
}


const fetchTrendingTvFail = (state, action) => {
    return updateObject( state, {loading: false});
}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_NOW_PLAYING_SUCCESS: return fetchNowPlayingSuccess(state, action);
        case actionTypes.FETCH_NOW_PLAYING_FAIL: return fetchNowPlayingFail(state, action);
        case actionTypes.FETCH_UPCOMING_SUCCESS: return fetchUpcomingSuccess(state, action);
        case actionTypes.FETCH_UPCOMING_FAIL: return fetchUpcomingFail(state, action);
        case actionTypes.FETCH_VIDEO_KEY_SUCCESS: return fetchVideoKeySuccess(state, action);
        case actionTypes.FETCH_VIDEO_KEY_FAIL: return fetchVideoKeyFail(state, action);
        case actionTypes.FETCH_TRENDING_TV_SUCCESS: return fetchTrendingTvSuccess(state, action);
        case actionTypes.FETCH_TRENDING_TV_FAIL: return fetchTrendingTvFail(state, action);
        default: return state;
    }
};

export default reducer;