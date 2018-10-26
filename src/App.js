import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonRow from "./components/ButtonRow";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";
import { Configs } from "./Configs";
import LoggedInHomePage from "./components/LoggedInHomePage";
import PublicHomePage from "./components/PublicHomePage";

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  userOrFalse() {
    let auth = new CognitoAuth(Configs.authData());
    return false;
  }

  /**
   * post: this.state.loggedIn == true iff (either there is a logged-in user
   * in local storage, or in the URL)
   * // TODO: this should validate the token as well
   */
  checkLoginStatus() {
    let auth = new CognitoAuth(Configs.authData());
    // TODO: check based on #abc=xyz, to see if onSuccess/onFailure callbacks work for setting state
  }

  setLogin(loggedIn) {
    if (loggedIn === true) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  static getAuth() {
    return new CognitoAuth(Configs.authData());
  }

  render() {
    // console.log("App.render() called at " + Date.now());
    let authData = Configs.authData();
    let auth = new CognitoAuth(authData);
    if (
      auth.getCurrentUser == null ||
      auth.getCurrentUser == undefined ||
      auth.getCurrentUser() == null
    ) {
      // console.log(Date.now() + " App: the current user is no one");
    } else {
      let myIdToken = new CognitoIdToken(
        auth.signInUserSession.idToken.jwtToken
      );
      // console.log(Date.now() + " App: myIdToken: " + myIdToken);
      // console.log(
      //   Date.now() +
      //     " App: myIdToken.decodePayload()" +
      //     myIdToken.decodePayload()
      // );
    }
    return (
      <Router>
        <div className="App">
          <Route path="(/|/index.html)" exact component={PublicHomePage} />
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

    // buttonRow
  }
}

export default App;
