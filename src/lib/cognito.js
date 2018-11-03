import { CognitoAuth } from 'amazon-cognito-auth-js';
import { Configs } from '../Configs';

function signInViaURL(url, { onSuccess, onFailure }) {
  const authData = Configs.authData();
  const auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess: ({ idToken }) => {
      const {
        ['cognito:username']: id,
        email,
        nickname,
      } = idToken.decodePayload();
      onSuccess({ id, email, nickname });
    },
    onFailure,
  };
  auth.parseCognitoWebResponse(window.location.href);
}

export { signInViaURL };
