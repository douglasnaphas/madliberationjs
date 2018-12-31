import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';

import './App.css';
import LoggedInHomePage from './components/LoggedInHomePage';
import MenuAppBar from './components/MenuAppBar';
import NoAuthHomePage from './components/NoAuthHomePage';
import PublicHomePage from './components/PublicHomePage';
import history from './history';
import { Configs } from './Configs';
import { signIn } from './lib/cognito';
import PickScriptPage from './components/PickScriptPage';

class App extends Component {
  state = { user: undefined, isSigningIn: true };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router {...{ history }}>
          <div className="App">
            <Route
              path="(/|/index.html)"
              exact
              render={props => <NoAuthHomePage {...props} />}
            />
            <Route
              path="/pick-script"
              exact
              render={props => <PickScriptPage {...props} />}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
