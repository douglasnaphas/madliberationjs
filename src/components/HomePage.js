import React, { Component } from "react";
import Header from "./Header";
import ButtonRow from "./ButtonRow";
import { Configs } from "../Configs";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";
import PublicHomePage from "./PublicHomePage";

class HomePage extends Component {
  render() {
    let authData = Configs.authData();
    let auth = new CognitoAuth(authData);
    if (auth.getCurrentUser() == null) {
      return <PublicHomePage />;
    }
    return (
      <div>
        <Header />
        <ButtonRow text="Start a seder" disabled />
        <ButtonRow text="Join a seder" disabled />
      </div>
    );
  }
}

export default HomePage;
