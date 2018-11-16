import './App.css';
import LoggedInHomePage from './components/LoggedInHomePage';
import PublicHomePage from './components/PublicHomePage';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import { Router } from 'react-router-dom';
import { signIn } from './lib/cognito';
import history from './history';

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
      <Router {...{ history }}>
        <React.Fragment>
          {this.state.user ? <div>you're signed in</div> : null}
          <div className="App">
            <Route path="(/|/index.html)" exact component={this.homePage} />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
