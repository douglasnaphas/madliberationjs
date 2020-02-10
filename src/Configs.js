class Configs {
  static redirectUri() {
    if (process && process.env && process.env.NODE_ENV) {
      if (process.env.NODE_ENV === 'development') {
        const url = new URL('/get-cookies', Configs.apiUrl());
        return url;
      }
      // if test env, return test env value
    }
    return 'https://madliberationgame.com/index.html';
  }

  // https://madliberationfederated.auth.us-east-1.amazoncognito.com/login?client_id=25h54vd0cundt7iaeon1rn8a02&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:3000/index.html

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
    return 'https://api.passover.lol/';
  }

  static roomCodeRegex() {
    return /^[A-Za-z]{6}$/;
  }

  static gameNameBlacklist() {
    return /[^-A-Za-z ,0-9]/g;
  }

  static libBlackList() {
    return /[^-A-Za-z ,0-9."'?!/]/g;
  }

  /**
   * The API's generic error message
   */
  static generic400ErrorMessage() {
    return 'bad request';
  }

  /**
   * @return {Number} The number of milliseconds allowed to elapse before a new
   * seder cannot be joined, according to the API.
   */
  static msToJoinSeder() {
    return 1000 /* ms/s */ * 60 /* s/minute */ * 30 /* minutes */;
  }
}

export { Configs };
