import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonRow from "./components/ButtonRow";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import AmazonCognitoIdentity from "amazon-cognito-auth-js";

class App extends Component {
  isLoggedIn() {
    let authData = {
      ClientId: "6ktt0mtpks03r8sfticc3h1o6",
      AppWebDomain: "madliberationfederated.auth.us-east-1.amazoncognito.com",
      TokenScopesArray: ["email"],
      RedirectUriSignIn: "https://madliberationgame.com/pick-script.html",
      RedirectUriSignOut: "https://madliberationgame.com/logout.html",
      UserPoolId: "us-east-1_Yn89yKizn"
    };
    let auth = new AmazonCognitoIdentity.CognitoAuth(authData);

    return "not";
  }

  render() {
    console.log(this.isLoggedIn());
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  <Header />
                  <ButtonRow
                    text="Log in"
                    primary
                    href="https://madliberationfederated.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=6ktt0mtpks03r8sfticc3h1o6&redirect_uri=https://madliberationgame.com/index.html"
                  />
                  <ButtonRow text="Start a seder" disabled />
                  <ButtonRow text="Join a seder" disabled />
                </div>
              );
            }}
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

    // buttonRow
  }
}

export default App;
