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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loggedIn: false
  //   };
  // }
  // setLoginState(user) {}
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="(/|/index.html)" exact component={PublicHomePage} />
          <Route path="/logged-in.html" exact component={LoggedInHomePage} />
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
