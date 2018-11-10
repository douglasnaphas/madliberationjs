import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { CognitoAuth } from 'amazon-cognito-auth-js';
import { Configs } from './Configs';
import LoggedInHomePage from './components/LoggedInHomePage';
import PublicHomePage from './components/PublicHomePage';
import MenuAppBar from './components/MenuAppBar';

class App extends Component {
  state = { user: undefined, isSigningIn: true };

  componentDidMount() {
    const authData = Configs.authData();
    const auth = new CognitoAuth(authData);
    auth.userhandler = {
      onSuccess: ({ idToken }) => {
        const {
          ['cognito:username']: id,
          email,
          nickname
        } = idToken.decodePayload();
        this.setState({ user: { id, email, nickname }, isSigningIn: false });
      },
      onFailure: error => {
        this.setState({ user: null, isSigningIn: false });
      }
    };
    auth.parseCognitoWebResponse(window.location.href);
  }

  get homePage() {
    return this.state.user ? LoggedInHomePage : PublicHomePage;
  }

  render() {
    console.log('App rendered.....');
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div className="App">
            <Route path="(/|/index.html)" exact component={this.homePage} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
