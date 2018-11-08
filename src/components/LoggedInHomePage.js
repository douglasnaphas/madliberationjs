import React, { Component } from 'react';
import Header from './Header';
import ButtonRow from './ButtonRow';
import { Configs } from '../Configs';
import { CognitoAuth, CognitoIdToken } from 'amazon-cognito-auth-js';
import NavBar from './NavBar';
import PublicHomePage from './PublicHomePage';

class LoggedInHomePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ButtonRow text="Start a seder" />
        <ButtonRow text="Join a seder" />
      </div>
    );
  }
}

export default LoggedInHomePage;
