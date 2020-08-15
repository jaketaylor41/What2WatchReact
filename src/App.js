import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import RandomMovie from './containers/RandomMovie/RandomMovie';
import RandomTVShow from './containers/RandomTVShow/RandomTVShow';
import { Route, Switch } from 'react-router-dom';
import WatchList from './containers/WatchList/WatchList';
import Auth from './containers/Auth/Auth';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/watch-list" component={WatchList} />
            <Route path="/random-movie" component={RandomMovie} />
            <Route path="/random-tv-show" component={RandomTVShow} />
            <Route path="/sign-in" component={Auth} />
          </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
