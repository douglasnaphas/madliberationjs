class Configs {
  static redirectUri() {
    if (process && process.env && process.env.NODE_ENV) {
      if (process.env.NODE_ENV == "development") {
        return "http://localhost:3000/index.html";
      }
      // if test env, return test env value
    }
    return "https://madliberationgame.com/index.html";
  }

  static authData() {
    return {
      ClientId: "6ktt0mtpks03r8sfticc3h1o6",
      AppWebDomain: "madliberationfederated.auth.us-east-1.amazoncognito.com",
      TokenScopesArray: ["email"],
      RedirectUriSignIn: Configs.redirectUri(),
      RedirectUriSignOut: "https://madliberationgame.com/logout.html",
      UserPoolId: "us-east-1_Yn89yKizn"
    };
  }

  static loginUrl() {
    return (
      "https://madliberationfederated.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=6ktt0mtpks03r8sfticc3h1o6&redirect_uri=" +
      Configs.redirectUri()
    );
  }
}

export { Configs };
