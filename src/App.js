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
        <ButtonRow text="Log in" />
        <ButtonRow text="Start a seder" />
        <ButtonRow text="Join a seder" />
      </div>
    );

    // buttonRow
  }
}

export default App;
