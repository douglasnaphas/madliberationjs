import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonRow from './components/ButtonRow';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { signInViaURL } from './lib/cognito';
import LoggedInHomePage from './components/LoggedInHomePage';
import PublicHomePage from './components/PublicHomePage';

class App extends Component {
  state = { user: undefined, isSigningIn: true };

  componentDidMount() {
    signInViaURL(window.location.href, {
      onSuccess: user => {
        this.setState({ user, isSigningIn: false });
      },
      onFailure: error => {
        this.setState({ user: null, isSigningIn: false });
      },
    });
  }

  get homePage() {
    return this.state.user ? LoggedInHomePage : PublicHomePage;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="(/|/index.html)" exact component={this.homePage} />
        </div>
      </Router>
    );
  }
}

export default App;
