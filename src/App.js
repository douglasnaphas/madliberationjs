import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonRow from './components/ButtonRow';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { CognitoAuth, CognitoIdToken } from 'amazon-cognito-auth-js';
import { Configs } from './Configs';
import LoggedInHomePage from './components/LoggedInHomePage';
import PublicHomePage from './components/PublicHomePage';

class App extends Component {
  state = { user: undefined, isSigningIn: true };

  componentDidMount() {
    const authData = Configs.authData();
    const auth = new CognitoAuth(authData);
    auth.userhandler = {
      onSuccess: result => {
        this.setState({ user: result });
      },
      onFailure: error => {
        this.setState({ user: null });
      }
    };
    auth.parseCognitoWebResponse(window.location.href);
  }

  userOrFalse() {
    let auth = new CognitoAuth(Configs.authData());
    return false;
  }

  static getAuth() {
    return new CognitoAuth(Configs.authData());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="(/|/index.html)"
            exact
            render={() =>
              this.state.user ? <LoggedInHomePage /> : <PublicHomePage />
            }
          />
          <Route
            path="/r2"
            exact
            render={() => {
              return (
                <div>
                  <h1>This is R2</h1>
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
