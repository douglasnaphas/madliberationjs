import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';

import About from './components/About';
import './App.css';
import { getScriptsFromApi } from './lib/getScriptsFromApi';
import HowToPlay from './components/HowToPlay';
import NoAuthHomePage from './components/NoAuthHomePage';
import history from './history';
import { Configs } from './Configs';
import PickScriptPage from './components/PickScriptPage';
import EnterRoomCodePage from './components/EnterRoomCodePage';
import YourRoomCodePage from './components/YourRoomCodePage';

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
              render={props => (
                <PickScriptPage {...props} getScripts={getScriptsFromApi} />
              )}
            />
            <Route path="/about" exact render={props => <About {...props} />} />
            <Route
              path="/how-to-play"
              exact
              render={props => <HowToPlay {...props} />}
            />
            <Route
              path="/enter-room-code"
              exact
              render={props => <EnterRoomCodePage {...props} />}
            />
            <Route
              path="/your-room-code"
              exact
              render={props => <YourRoomCodePage {...props} />}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
