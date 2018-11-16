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

function parseURL({ search, hash }) {
  return (search || hash)
    .slice(1)
    .split('&')
    .map(kv => kv.split('='))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

export { signIn };
