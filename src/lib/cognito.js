function signIn({ url, storage }) {
  return new Promise((resolve, reject) => {
    const query = parseURL(url);
    ['id_token', 'access_token'].forEach(key => {
      const value = query[key];
      if (value) {
        storage.setItem(`cognito.${key}`, query[key]);
      }
    });
    const id_token = storage.getItem('cognito.id_token');
    if (id_token) resolve(toUser(id_token));
    else {
      reject(null);
    }
  });
}

function toUser(idToken) {
  return JSON.parse(atob(idToken.split('.')[1]));
}

// FIXME: this isn't used... maybe will need it for sign out?
function getIdTokenFromAuthCode(authCode) {
  const env = str => process.env[`REACT_APP_COGNITO_${str}`];

  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const data = {
      grant_type: 'authorization_code',
      client_id: env('CLIENT_ID'),
      redirect_uri: env('REDIRECT_URI'),
      code: authCode,
    };
    fetch(`https://${env('APP_WEB_DOMAIN')}/oauth2/token`, {
      method: 'POST',
      body: Object.keys(data).reduce((formData, key) => {
        formData.assign(key, data[key]);
        return formData;
      }, new FormData()),
    })
      .then(resolve)
      .catch(reject);
  });
}

function parseURL({ search, hash }) {
  return (search || hash)
    .slice(1)
    .split('&')
    .map(kv => kv.split('='))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export { signIn };
