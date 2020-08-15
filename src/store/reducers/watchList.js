import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    watchList: [],
    loading: false
}

const fetchWatchListStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};




const fetchWatchListSuccess = (state, action) => {
    return updateObject( state, {
        watchList: action.watchList,
        loading: false
    } );
};

const fetchWatchListFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_WATCHLIST_START: return fetchWatchListStart( state, action );
        case actionTypes.FETCH_WATCHLIST_SUCCESS: return fetchWatchListSuccess( state, action );
        case actionTypes.FETCH_WATCHLIST_FAIL: return fetchWatchListFail( state, action );
        default: return state;
    }
};

export default reducer;
