import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './assets/fonts/SF-Pro.ttf';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import randomReducer from './store/reducers/random';
import watchListReducer from './store/reducers/watchList';
import homeReducer from './store/reducers/home';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    nowShowing: homeReducer,
    upcoming: homeReducer,
    randomShow: randomReducer,
    randomMovie: randomReducer,
    trendingTv: homeReducer,
    trailerInfo: homeReducer,
    ratings: homeReducer,
    genres: homeReducer,
    videoKey: homeReducer,
    watchList: watchListReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
