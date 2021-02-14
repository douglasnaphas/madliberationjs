class Configs {
  static redirectUri() {
    if (process && process.env && process.env.NODE_ENV) {
      if (process.env.NODE_ENV === "development") {
        const url = new URL("/get-cookies", Configs.apiUrl());
        return url;
      }
      // if test env, return test env value
    }
    return "https://api.passover.lol/get-cookies";
  }

  static loginUrl() {
    return process.env.REACT_APP_COGNITO_LINK || "/#/";
  }

  static apiUrl() {
    if (process && process.env && process.env.REACT_APP_MLJSAPI_URL) {
      return process.env.REACT_APP_MLJSAPI_URL;
    }
    return "https://api.passover.lol/";
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
    return "bad request";
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
