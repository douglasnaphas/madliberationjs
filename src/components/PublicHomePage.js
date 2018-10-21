import React, { Component } from "react";
import Header from "./Header";
import ButtonRow from "./ButtonRow";
import { Configs } from "../Configs";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";

class PublicHomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ButtonRow text="Log in" primary href={Configs.loginUrl()} />
        <ButtonRow text="Start a seder" disabled />
        <ButtonRow text="Join a seder" disabled />
      </div>
    );
  }
}

export default PublicHomePage;
