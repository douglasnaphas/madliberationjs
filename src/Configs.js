class Configs {
  static redirectUri() {
    if (process && process.env && process.env.NODE_ENV) {
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3000/index.html';
      }
      // if test env, return test env value
    }
    return 'https://madliberationgame.com/index.html';
  }

  static loginUrl() {
    return (
      'https://madliberationfederated.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=25h54vd0cundt7iaeon1rn8a02&redirect_uri=' +
      Configs.redirectUri()
    );
  }

  static apiUrl() {
    if (process && process.env && process.env.REACT_APP_MLJSAPI_URL) {
      return process.env.REACT_APP_MLJSAPI_URL;
    }
    return 'https://api.madliberationgame.com/';
  }

  static roomCodeRegex() {
    return /^[A-Za-z]{6}$/;
  }
}

export { Configs };
