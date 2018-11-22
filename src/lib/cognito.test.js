import {
  ID_TOKEN,
  ACCESS_TOKEN,
  COGNITO,
  signIn,
  toUser,
  parseURL,
  signOut,
  getAccessToken
} from './cognito';

class MockStorage {
  constructor() {}
  setItem = (k, v) => {
    this[k] = v;
  };
  getItem = k => this[k] || null;
  removeItem = k => {
    delete this[k];
  };
}

const idTokenInHash =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
  '.eyJhdF9oYXNoIjoiaTNQUVJrVHRQQ3Zyejl4eGo3dVZtQSIsInN1YiI6Ijk5NDA2N2NmLTk5ZDEtNDRkOS1iNTY2LTI0OWRiMjE2YzQzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3VzLWVhc3QtMV9Zbjg5eUtpem4iLCJjb2duaXRvOnVzZXJuYW1lIjoiOTk0MDY3Y2YtOTlkMS00NGQ5LWI1NjYtMjQ5ZGIyMTZjNDM5IiwiYXVkIjoiNmt0dDBtdHBrczAzcjhzZnRpY2MzaDFvNiIsImV2ZW50X2lkIjoiNGEwZDJhODQtYjE2NS0xMWU4LWE3NTktMGQ4ZmM4YzI5ZTBlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MzYxOTA5MjIsIm5pY2tuYW1lIjoiSGFzaCIsImV4cCI6MTU0Mjg5ODEwMSwiaWF0IjoxNTM2MTkwOTIyLCJlbWFpbCI6Imhhc2hAZXhhbXBsZS5jb20iLCJqdGkiOiIwMzEyNjI0MS1lNGE2LTQ1OTEtOThkYS05MzZjOGQ3NGRiMDUifQ' +
  '.ZVIobZ1aC-hwGOAUSAEqPmAmBD-hz-WJumyKUFb_TCU';
const accessTokenInHash =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
  '.eyJzdWIiOiI5OTQwNjdjZi05OWQxLTQ0ZDktYjU2Ni0yNDlkYjIxNmM0MzkiLCJldmVudF9pZCI6IjRhMGQyYTg0LWIxNjUtMTFlOC1hNzU5LTBkOGZjOGMyOWUwZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1MzYxOTA5MjIsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xX1luODl5S2l6biIsImV4cCI6MTU0Mjg5OTAwNSwiaWF0IjoxNTM2MTkwOTIyLCJ2ZXJzaW9uIjoyLCJqdGkiOiI3YTMxMTUwZS1lYmQ0LTQ3NmEtOTBkNi03ZjQ0NDM4Y2EzZjgiLCJjbGllbnRfaWQiOiJoYXNoOG50cGtzMDNyOHNmdGljYzNoMW82IiwidXNlcm5hbWUiOiI5OTQwNjdjZi05OWQxLTQ0ZDktYjU2Ni0yNDlkYjIxNmM0MzkifQ' +
  '.0wBmYZ20RC5Oi2I7a6lNh0VI6ahzJhTS6v36nu25Q6E';
const hashWithTokens =
  '#id_token=' +
  idTokenInHash +
  '&access_token=' +
  accessTokenInHash +
  '&expires_in=3600' +
  '&token_type=Bearer';
const parsedHashWithTokens = {
  id_token: idTokenInHash,
  access_token: accessTokenInHash,
  expires_in: '3600',
  token_type: 'Bearer'
};
const userInHash = {
  at_hash: 'i3PQRkTtPCvrz9xxj7uVmA',
  sub: '994067cf-99d1-44d9-b566-249db216c439',
  email_verified: true,
  iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Yn89yKizn',
  'cognito:username': '994067cf-99d1-44d9-b566-249db216c439',
  aud: '6ktt0mtpks03r8sfticc3h1o6',
  event_id: '4a0d2a84-b165-11e8-a759-0d8fc8c29e0e',
  token_use: 'id',
  auth_time: 1536190922,
  nickname: 'Hash',
  exp: 1542898101,
  iat: 1536190922,
  email: 'hash@example.com',
  jti: '03126241-e4a6-4591-98da-936c8d74db05'
};

const idTokenInSearch =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
  '.eyJhdF9oYXNoIjoiaTNQUVJrVHRQQ3Zyejl4eGo3dVZtQSIsInN1YiI6Ijk5NDA2N2NmLTk5ZDEtNDRkOS1iNTY2LTI0OWRiMjE2YzQzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3VzLWVhc3QtMV9Zbjg5eUtpem4iLCJjb2duaXRvOnVzZXJuYW1lIjoiOTk0MDY3Y2YtOTlkMS00NGQ5LWI1NjYtMjQ5ZGIyMTZjNDM5IiwiYXVkIjoiNmt0dDBtdHBrczAzcjhzZnRpY2MzaDFvNiIsImV2ZW50X2lkIjoiNGEwZDJhODQtYjE2NS0xMWU4LWE3NTktMGQ4ZmM4YzI5ZTBlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MzYxOTA5MjIsIm5pY2tuYW1lIjoiU2VhcmNoIiwiZXhwIjoxNTQyODk5NjEwLCJpYXQiOjE1MzYxOTA5MjIsImVtYWlsIjoic2VhcmNoQGV4YW1wbGUuY29tIiwianRpIjoiMDMxMjYyNDEtZTRhNi00NTkxLTk4ZGEtOTM2YzhkNzRkYjA1In0' +
  '.XvRG-2TUiAxG3Cq5q53nQ86XM4lriNSSGu5auC-PX98';
const accessTokenInSearch =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' +
  '.eyJzdWIiOiI5OTQwNjdjZi05OWQxLTQ0ZDktYjU2Ni0yNDlkYjIxNmM0MzkiLCJldmVudF9pZCI6IjRhMGQyYTg0LWIxNjUtMTFlOC1hNzU5LTBkOGZjOGMyOWUwZSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1MzYxOTA5MjIsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xX1luODl5S2l6biIsImV4cCI6MTU0MjkwMDA4OSwiaWF0IjoxNTM2MTkwOTIyLCJ2ZXJzaW9uIjoyLCJqdGkiOiI3YTMxMTUwZS1lYmQ0LTQ3NmEtOTBkNi03ZjQ0NDM4Y2EzZjgiLCJjbGllbnRfaWQiOiJzZWFyY2g4bnRwa3MwM3I4c2Z0aWNjM2gxbzYiLCJ1c2VybmFtZSI6Ijk5NDA2N2NmLTk5ZDEtNDRkOS1iNTY2LTI0OWRiMjE2YzQzOSJ9' +
  '.nkmT3eLnr8OyaCHHzY5QIDAzL7-opyNWvylPx9fHO8I';
const searchWithTokens =
  '#id_token=' +
  idTokenInSearch +
  '&access_token=' +
  accessTokenInSearch +
  '&expires_in=3600' +
  '&token_type=Bearer';
const parsedSearchWithTokens = {
  id_token: idTokenInSearch,
  access_token: accessTokenInSearch,
  expires_in: '3600',
  token_type: 'Bearer'
};
const userInSearch = {
  at_hash: 'i3PQRkTtPCvrz9xxj7uVmA',
  sub: '994067cf-99d1-44d9-b566-249db216c439',
  email_verified: true,
  iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Yn89yKizn',
  'cognito:username': '994067cf-99d1-44d9-b566-249db216c439',
  aud: '6ktt0mtpks03r8sfticc3h1o6',
  event_id: '4a0d2a84-b165-11e8-a759-0d8fc8c29e0e',
  token_use: 'id',
  auth_time: 1536190922,
  nickname: 'Search',
  exp: 1542899610,
  iat: 1536190922,
  email: 'search@example.com',
  jti: '03126241-e4a6-4591-98da-936c8d74db05'
};

const urlWithHashWithTokens = {
  hash: hashWithTokens
};
const urlWithSearchWithTokens = {
  search: searchWithTokens
};
const urlWithSearchAndHashWithTokens = {
  hash: hashWithTokens,
  search: searchWithTokens
};

describe('signIn', () => {
  test('tokens in url, empty storage', () => {
    expect.assertions(3);
    const storage = new MockStorage();
    signIn({ url: urlWithSearchWithTokens, storage: storage }).then(u => {
      expect(u).toEqual(userInSearch);
      expect(storage.getItem(`${COGNITO}.${ID_TOKEN}`)).toEqual(
        idTokenInSearch
      );
      expect(storage.getItem(`${COGNITO}.${ACCESS_TOKEN}`)).toEqual(
        accessTokenInSearch
      );
    });
  });
  test('no tokens in url, tokens in storage', () => {});
});

describe('parseURL', () => {
  test('parseURL on a URL with only search', () => {
    expect(parseURL(urlWithSearchWithTokens)).toEqual(parsedSearchWithTokens);
  });
  test('parseURL on a URL with only hash', () => {
    expect(parseURL(urlWithHashWithTokens)).toEqual(parsedHashWithTokens);
  });
  test('parseURL on a URL with search and hash, should take search', () => {
    expect(parseURL(urlWithSearchAndHashWithTokens)).toEqual(
      parsedSearchWithTokens
    );
  });
  test('parseURL no search no hash', () => {
    expect(
      parseURL({ notSearch: 'no search', hashNot: 'no hash' })
    ).toBeUndefined();
  });
});

describe('toUser', () => {
  test('toUser on a valid id token', () => {
    expect(toUser(idTokenInHash)).toEqual(userInHash);
  });
  test('toUser on another valid id token', () => {
    expect(toUser(idTokenInSearch)).toEqual(userInSearch);
  });
  test('toUser on a number, should be undefined', () => {
    expect(toUser(2)).toBeUndefined();
  });
  test('toUser on a token with no body, should be undefined', () => {
    expect(toUser('abcdef.')).toBeUndefined();
  });
  test('toUser on a token with no ., should be undefined', () => {
    expect(toUser('abcdef')).toBeUndefined();
  });
  test('toUser on a token with invalid Base64, should be undefined', () => {
    expect(toUser('abcdef.HnM8*#@.45h')).toBeUndefined();
  });
});
