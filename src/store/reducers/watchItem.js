import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    addToWatchList: false,
    aleradyAdded: false,
    loading: false,
    error: false
}

const addWatchItemStart = ( state, action ) => {
    return updateObject( state, {loading: false});
};

const addWatchItemSuccess = ( state, action ) => {

    updatedState = action.added;
    const updatedState = updateObject(state.addToWatchList, updatedState);
    return updateObject( state, updatedState);

};


const addWatchItemFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.ADD_WATCHITEM_START: return addWatchItemStart(state, action);
        case actionTypes.ADD_WATCHITEM_SUCCESS: return addWatchItemSuccess(state, action);
        case actionTypes.ADD_WATCHITEM_FAIL: return addWatchItemFail(state, action);
        default: return state;
    }
};

export default reducer;