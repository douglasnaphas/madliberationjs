import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { HashRouter as Router } from 'react-router-dom';

import About from './components/About';
import './App.css';
import { closeSeder } from './lib/closeSeder';
import { Configs } from './Configs';
import DoneNotReadingPage from './components/DoneNotReadingPage';
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
import { assignmentsFailure } from './lib/assignmentsFailure';
import SubmittedPage from './components/SubmittedPage';
import { submitLibs } from './lib/submitLibs';
import ReadPage from './components/ReadPage';
import { readRoster } from './lib/readRoster';
import { readRosterDone } from './lib/readRosterDone';
import { readRosterSplit } from './lib/readRosterSplit';
import { script } from './lib/script';
import { scriptPractice } from './lib/scriptPractice';
import GeneratingRoomCodePageWithRouter from './components/GeneratingRoomCodePageWithRouter';
import EnterRoomCodePageWithRouter from './components/EnterRoomCodePageWithRouter';
import YouHaveJoinedPage from './components/YouHaveJoinedPage';

class App extends Component {
  state = {
    user: undefined,
    isSigningIn: true,
    confirmedRoomCode: false,
    confirmedGameName: false,
    isRingleader: false,
    chosenPath: false
  };
  _isMounted = false;
  persistState = () => {
    if (this.state.confirmedRoomCode) {
      localStorage.setItem('roomCode', this.state.confirmedRoomCode);
    }
    if (this.state.confirmedGameName) {
      localStorage.setItem('gameName', this.state.confirmedGameName);
    }
    if (this.state.chosenPath) {
      localStorage.setItem('chosenPath', this.state.chosenPath);
    }
  };
  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('beforeunload', this.persistState);
  }
  componentWillUnmount() {
    this.persistState();
    window.removeEventListener('beforeunload', this.persistState);
    this._isMounted = false;
  }
  setConfirmedRoomCode = roomCode => {
    this.setState({ confirmedRoomCode: roomCode });
  };
  setConfirmedGameName = gameName => {
    this.setState({ confirmedGameName: gameName });
  };
  setChosenPath = path => {
    this.setState({ chosenPath: path });
  };
  goToYourRoomCodePage = history => {
    history.push('/your-room-code');
  };
  hydrateRoomCodeAndGameName = (roomCode, gameName) => {
    if (
      !roomCode &&
      !gameName &&
      localStorage.getItem('roomCode') &&
      localStorage.getItem('gameName')
    ) {
      this.setState({ confirmedRoomCode: localStorage.getItem('roomCode') });
      this.setState({ confirmedGameName: localStorage.getItem('gameName') });
    }
  };
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
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
                  setChosenPath={this.setChosenPath}
                />
              )}
            />
            <Route
              path="/generating-room-code"
              exact
              render={props => (
                <GeneratingRoomCodePageWithRouter
                  {...props}
                  goToYourRoomCodePage={this.goToYourRoomCodePage}
                  setChosenPath={this.setChosenPath}
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
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
                <EnterRoomCodePageWithRouter
                  {...props}
                  joinSeder={joinSeder}
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
                  setConfirmedGameName={this.setConfirmedGameName}
                />
              )}
            />
            <Route
              path="/you-have-joined"
              exact
              render={props => (
                <YouHaveJoinedPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
                  setConfirmedGameName={this.setConfirmedGameName}
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
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
                  setConfirmedGameName={this.setConfirmedGameName}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                  chosenPath={this.state.chosenPath}
                  setChosenPath={this.setChosenPath}
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
                  hydrateRoomCodeAndGameName={this.hydrateRoomCodeAndGameName}
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
                  setConfirmedGameName={this.setConfirmedGameName}
                  setChosenPath={this.setChosenPath}
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
                  setConfirmedRoomCode={this.setConfirmedRoomCode}
                  setConfirmedGameName={this.setConfirmedGameName}
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
                  assignments={assignments}
                  submitLibs={submitLibs}
                />
              )}
            />
            <Route
              path="/submitted"
              exact
              render={props => (
                <SubmittedPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            <Route
              path="/done-not-reading"
              exact
              render={props => (
                <DoneNotReadingPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                />
              )}
            />
            <Route
              path="/read"
              exact
              render={props => (
                <ReadPage
                  {...props}
                  confirmedRoomCode={this.state.confirmedRoomCode}
                  confirmedGameName={this.state.confirmedGameName}
                  roster={readRoster}
                  script={script}
                />
              )}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
