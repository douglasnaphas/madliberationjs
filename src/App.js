import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonRow from "./components/ButtonRow";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";
import { Configs } from "./Configs";
import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="(/|/index.html)" exact component={HomePage} />
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
