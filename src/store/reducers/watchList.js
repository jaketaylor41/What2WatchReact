import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    watchList: [],
    loading: false
}


const addWatchItemSuccess = ( state, action ) => {

    const newItem = updateObject(action.watchData, {id: action.itemId});
    return updateObject( state, {
        loading: false,
        watchList: state.watchList.concat( newItem ) 
    });
};


const addWatchItemFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};




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
        case actionTypes.ADD_WATCHITEM_SUCCESS: return addWatchItemSuccess(state, action);
        case actionTypes.ADD_WATCHITEM_FAIL: return addWatchItemFail(state, action);
        case actionTypes.FETCH_WATCHLIST_START: return fetchWatchListStart( state, action );
        case actionTypes.FETCH_WATCHLIST_SUCCESS: return fetchWatchListSuccess( state, action );
        case actionTypes.FETCH_WATCHLIST_FAIL: return fetchWatchListFail( state, action );
        default: return state;
    }
};

export default reducer;
