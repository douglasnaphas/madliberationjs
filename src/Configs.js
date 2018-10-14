class Configs {
  static authData() {
    return {
      ClientId: "6ktt0mtpks03r8sfticc3h1o6",
      AppWebDomain: "madliberationfederated.auth.us-east-1.amazoncognito.com",
      TokenScopesArray: ["email"],
      RedirectUriSignIn: "https://madliberationgame.com/logged-in.html",
      RedirectUriSignOut: "https://madliberationgame.com/logout.html",
      UserPoolId: "us-east-1_Yn89yKizn"
    };
  }

  static loginUrl() {
    return "https://madliberationfederated.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=6ktt0mtpks03r8sfticc3h1o6&redirect_uri=https://madliberationgame.com/logged-in.html";
  }
}

export { Configs };
