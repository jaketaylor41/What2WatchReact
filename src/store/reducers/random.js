import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    randomMovie: null,
    randomShow: null,
    videos: null,
    loading: false
}

const fetchRandomMovieSuccess = (state, action) => {
    return updateObject( state, {
        randomMovie: action.randomMovie[0]
    });
}


const fetchRandomMovieFail = (state, action) => {
    return updateObject( state, {loading: false});

};


const fetchRandomShowSuccess = (state, action) => {
    return updateObject( state, {
        randomShow: action.randomShow[0]
    });
}


const fetchRandomShowFail = (state, action) => {
    return updateObject( state, {loading: false});
}



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_RANDOM_MOVIE_SUCCESS: return fetchRandomMovieSuccess(state, action);
        case actionTypes.FETCH_RANDOM_MOVIE_FAIL: return fetchRandomMovieFail(state, action);
        case actionTypes.FETCH_RANDOM_SHOW_SUCCESS: return fetchRandomShowSuccess( state, action );
        case actionTypes.FETCH_RANDOM_SHOW_FAIL: return fetchRandomShowFail( state, action );
        default: return state;
    }
};

export default reducer;