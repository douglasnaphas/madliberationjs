class Configs {
  static redirectUri() {
    switch (process.env.NODE_ENV) {
      case 'development':
        return 'http://localhost:3000/index.html';
      default:
        return 'https://madliberationgame.com/index.html';
    }
  }

  static authData() {
    return {
      ClientId: '6ktt0mtpks03r8sfticc3h1o6',
      AppWebDomain: 'madliberationfederated.auth.us-east-1.amazoncognito.com',
      TokenScopesArray: ['email'],
      RedirectUriSignIn: Configs.redirectUri(),
      RedirectUriSignOut: 'https://madliberationgame.com/logout.html',
      UserPoolId: 'us-east-1_Yn89yKizn',
    };
  }

  static loginUrl() {
    const { AppWebDomain, ClientId } = this.authData();

    return `https://${AppWebDomain}/login?response_type=token&client_id=${ClientId}&redirect_uri=${this.redirectUri()}`;
  }
}

export { Configs };
