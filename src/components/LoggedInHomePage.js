import React, { Component } from 'react';
import Header from './Header';
import ButtonRow from './ButtonRow';

class LoggedInHomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ButtonRow text="Start a seder" />
        <ButtonRow text="Join a seder" />
      </div>
    );
  }
}

export default LoggedInHomePage;
