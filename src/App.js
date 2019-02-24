import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';

import About from './components/About';
import './App.css';
import { Configs } from './Configs';
import { getScriptsFromApi } from './lib/getScriptsFromApi';
import HowToPlay from './components/HowToPlay';
import NoAuthHomePage from './components/NoAuthHomePage';
import history from './history';
import { joinSeder } from './lib/joinSeder';
import PickScriptPage from './components/PickScriptPage';
import EnterRoomCodePage from './components/EnterRoomCodePage';
import YourRoomCodePage from './components/YourRoomCodePage';

class App extends Component {
  state = {
    user: undefined,
    isSigningIn: true,
    confirmedRoomCode: false,
    confirmedGameName: false,
    isRingleader: false
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const setConfirmedRoomCode = roomCode => {
      this.setState({ confirmedRoomCode: roomCode });
    };
    const setConfirmedGameName = gameName => {
      this.setState({ confirmedGameName: gameName });
    };
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
              render={props => (
                <EnterRoomCodePage
                  {...props}
                  joinSeder={joinSeder}
                  setConfirmedRoomCode={setConfirmedRoomCode}
                  setConfirmedGameName={setConfirmedGameName}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            <Route
              path="/your-room-code"
              exact
              render={props => (
                <YourRoomCodePage
                  {...props}
                  setConfirmedRoomCode={setConfirmedRoomCode}
                  setConfirmedGameName={setConfirmedGameName}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            {/* <Route path="/play" /> */}
            {/* <Route path="/read" /> */}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
