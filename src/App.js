import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonRow from "./components/ButtonRow";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
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

    // buttonRow
  }
}

export default App;
