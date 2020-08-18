import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import RandomMovie from './containers/RandomMovie/RandomMovie';
import RandomTVShow from './containers/RandomTVShow/RandomTVShow';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import WatchList from './containers/WatchList/WatchList';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';



class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/sign-in" component={Auth} />
        <Route path="/" exact component={Home} />
        <Route path="/random-movie" component={RandomMovie} />
        <Route path="/random-tv-show" component={RandomTVShow} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watch-list" component={WatchList} />
          <Route path="/random-movie" component={RandomMovie} />
          <Route path="/random-tv-show" component={RandomTVShow} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
      </Switch>
      );
    }



    return (
      <div>
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
