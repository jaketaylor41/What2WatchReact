import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addWatchItemStart = () => {
    return {
        type: actionTypes.ADD_WATCHITEM_START
    };
};

export const addWatchItemFail = (error) => {
    return {
        type: actionTypes.ADD_WATCHITEM_FAIL,
        error: error
    };
};

export const addWatchItem = (watchData, token, userId) => {
    return dispatch => {
        dispatch( addWatchItemStart() );
        const queryParams = '?auth=' + token + '&equalTo="' + userId + watchData + '"';
        axios.post('https://what2watch-cf980.firebaseio.com/watch.json' + queryParams)
            .then( response => {
                console.log(response.data);
            } )
            .catch(error => {
                dispatch( addWatchItemFail(error) );
            } );
    };
};

export const setWatchList = ( watchList ) => {
    return {
        type: actionTypes.SET_WATCHLIST,
        watchList: watchList
    };
};
