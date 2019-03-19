import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';

import About from './components/About';
import './App.css';
import { closeSeder } from './lib/closeSeder';
import { Configs } from './Configs';
import { getScriptsFromApi } from './lib/getScriptsFromApi';
import HowToPlay from './components/HowToPlay';
import LetThemPressButtonPage from './components/LetThemPressButtonPage';
import NoAuthHomePage from './components/NoAuthHomePage';
import history from './history';
import { joinSeder } from './lib/joinSeder';
import PickScriptPage from './components/PickScriptPage';
import EnterRoomCodePage from './components/EnterRoomCodePage';
import YourRoomCodePage from './components/YourRoomCodePage';
import RosterPage from './components/RosterPage';
import { roster } from './lib/roster';
import PlayPage from './components/PlayPage';
import { assignments } from './lib/assignments';
import { assignmentsPlaceholder } from './lib/assignmentsPlaceholder';

class App extends Component {
  state = {
    user: undefined,
    isSigningIn: true,
    confirmedRoomCode: false,
    confirmedGameName: false,
    isRingleader: false,
    chosenPath: false,
    answers: []
  };
  _isMounted = false;
  setAnswer = answer => {
    if (this._isMounted) {
      this.setState({ answers: this.state.answers.concat([answer]) });
    }
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
    const setChosenPath = path => {
      this.setState({ chosenPath: path });
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
                <PickScriptPage
                  {...props}
                  getScripts={getScriptsFromApi}
                  setChosenPath={setChosenPath}
                />
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
                  joinSeder={joinSeder}
                  setConfirmedRoomCode={setConfirmedRoomCode}
                  setConfirmedGameName={setConfirmedGameName}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            <Route
              path="/roster"
              exact
              render={props => (
                <RosterPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                  roster={roster}
                  closeSeder={closeSeder}
                  chosenPath={this.state.chosenPath}
                />
              )}
            />
            <Route
              path="/let-them-press-button"
              exact
              render={props => (
                <LetThemPressButtonPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            <Route
              path="/play"
              exact
              render={props => (
                <PlayPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                  assignments={assignmentsPlaceholder}
                  setAnswer={this.setAnswer}
                />
              )}
            />
            {/* <Route path="/read" /> */}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
