import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addWatchItemFail = (error) => {
    return {
        type: actionTypes.ADD_WATCHITEM_FAIL,
        error: error
    };
};

export const addWatchItemSuccess = (id, watchData) => {
    return {
        type: actionTypes.ADD_WATCHITEM_SUCCESS,
        itemId: id,
        watchData: watchData
    };
};

export const addWatchItem = (watchData, token) => {
    return dispatch => {
        axios.post('https://what2watch-cf980.firebaseio.com/userData.json?auth=' + token, watchData)
            .then( response => {
                dispatch(addWatchItemSuccess(response.data, watchData))
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
        axios.get('https://what2watch-cf980.firebaseio.com/userData.json' + queryParams )
            .then(response => {
                const fetchedWatchList = [];
                for (let key in response.data) {
                    fetchedWatchList.push( {
                        ...response.data[key],
                        itemId: key
                    } );
                }
                dispatch((fetchWatchListSuccess(fetchedWatchList)));
            })
            .catch( err => {
                dispatch(fetchWatchListFail(err));
            } );
    }
}


export const removeWatchItem = (token, userId, itemKey) => {
    return dispatch => {
        
        axios.delete(`https://what2watch-cf980.firebaseio.com/userData/${itemKey}.json?auth=${token}`)
            .then( response => {
                dispatch(fetchWatchList(token, userId));
            })
            .catch( err => {
                dispatch(fetchWatchListFail(err));
            })
    }

}