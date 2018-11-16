
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';

import './App.css';
import LoggedInHomePage from './components/LoggedInHomePage';
import MenuAppBar from './components/MenuAppBar';
import PublicHomePage from './components/PublicHomePage';
import history from './history';
import { Configs } from './Configs';
import { signIn } from './lib/cognito';

class App extends Component {

  state = { user: undefined, isSigningIn: true };

  componentDidMount() {
    this._isMounted = true;
    signIn({ url: window.location, storage: window.localStorage })
      .then(user => {
        if (this._isMounted) {
          history.replace(window.location.pathname);
          this.setState({ user, isSigningIn: false });
        }
      })
      .catch(_error => {
        if (this._isMounted) this.setState({ user: null, isSigningIn: false });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  get homePage() {
    return this.state.user ? LoggedInHomePage : PublicHomePage;
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router {...{ history }}>
          <div className="App">
            <Route path="(/|/index.html)" exact component={this.homePage} />
          </div>
        </Router>
      </React.Fragment>

    );
  }
}

export default App;
