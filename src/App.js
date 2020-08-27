import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';


const asyncRandomMovie = asyncComponent(() => {
  return import('./containers/RandomMovie/RandomMovie');
});

const asyncRandomTVShow = asyncComponent(() => {
  return import('./containers/RandomTVShow/RandomTVShow');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncWatchList = asyncComponent(() => {
  return import('./containers/WatchList/WatchList');
});




class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/sign-in" component={asyncAuth} />
        <Route path="/" exact component={Home} />
        <Route path="/watch-list" component={asyncAuth} />
        <Route path="/random-movie" component={asyncRandomMovie} />
        <Route path="/random-tv-show" component={asyncRandomTVShow} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watch-list" component={asyncWatchList} />
          <Route path="/random-movie" component={asyncRandomMovie} />
          <Route path="/random-tv-show" component={asyncRandomTVShow} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
      </Switch>
      );
    }



    return (
      <div style={{height: '100%'}}>
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
