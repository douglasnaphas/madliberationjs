import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginButtonRow from "./components/ButtonRow";
import ButtonRow from "./components/ButtonRow";
import Button from "./components/Button";
import MiddleThird from "./components/MiddleThird";

class App extends Component {
  render() {
    let button1 = new Button();
    let loginButton = <Button text="Log in" />;
    let loginButtonRow = <MiddleThird comp={loginButton} />;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LoginButtonRow text="Log in" boolProp />
        {loginButtonRow}
      </div>
    );
  }
}

export default App;
