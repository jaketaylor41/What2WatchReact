import * as actionTypes from './actionTypes';
import axios from 'axios';



export const fetchWatchListSuccess = (watchList) => {
    return {
        type: actionTypes.FETCH_WATCHLIST_SUCCESS,
        watchList: watchList
    };
};

export const fetchWatchListFail = (error) => {
    return {
        type: actionTypes.FETCH_WATCHLIST_FAIL,
        error: error
    };
};

export const fetchWatchListStart = () => {
    return {
        type: actionTypes.FETCH_WATCHLIST_START
    };
};

export const fetchWatchList = (token, userId) => {
    return dispatch => {
        dispatch(fetchWatchListStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://what2watch-cf980.firebaseio.com/watch.json' + queryParams)
            .then(response => {
    
                const fetchedWatchList = [];
                for (let key in response.data) {
                    fetchedWatchList.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
                dispatch((fetchWatchListSuccess(fetchedWatchList)));
            })
            .catch( err => {
                dispatch(fetchWatchListFail(err));
            } );
    }
}