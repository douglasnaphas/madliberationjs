import React, { Component } from "react";
import Header from "./Header";
import ButtonRow from "./ButtonRow";
import { Configs } from "../Configs";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";
import PublicHomePage from "./PublicHomePage";

class LoggedInHomePage extends Component {
  render() {
    // let authData = Configs.authData();
    // let auth = new CognitoAuth(authData);
    // if (auth.getCurrentUser() == null) {
    //   return <PublicHomePage />;
    // }
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
