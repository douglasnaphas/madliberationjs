import React, { Component } from "react";
import Header from "./Header";
import ButtonRow from "./ButtonRow";
import { Configs } from "../Configs";
import { CognitoAuth, CognitoIdToken } from "amazon-cognito-auth-js";

class PublicHomePage extends Component {
  render() {
    console.log("PublicHomePage.render() called at " + Date.now());
    let authData = Configs.authData();
    let auth = new CognitoAuth(authData);
    if (
      auth.getCurrentUser == null ||
      auth.getCurrentUser == undefined ||
      auth.getCurrentUser() == null
    ) {
      console.log(Date.now() + " PublicHomePage: the current user is no one");
    } else {
      let myIdToken = new CognitoIdToken(
        auth.signInUserSession.idToken.jwtToken
      );
      console.log(Date.now() + " PublicHomePage: myIdToken: " + myIdToken);
      console.log(
        Date.now() +
          " PublicHomePage: myIdToken.decodePayload()" +
          myIdToken.decodePayload()
      );
    }
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
