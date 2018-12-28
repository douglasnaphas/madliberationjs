'use strict';

var test = require('unit.js');
var helloWorld = require('../hello-world.js');
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');

describe('Tests index', function() {
  it('verifies successful response', function(done) {
    helloWorld.get(
      {
        /* event */
      },
      {
        /* context */
      },
      (err, result) => {
        try {
          test.number(result.statusCode).is(200);
          test.string(result.body).is('{"contents":"hello, world"}');
          test.value(result).hasHeader('content-type', 'application/json');
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });
});

describe('JWTs', () => {
  it('verify signature', () => {
    const myJwk = {
      alg: 'RS256',
      e: 'AQAB',
      kid: 'uTryj5OLEcTmz+jRWybXfH55IBgKi9hrkyc5S6oEU3A=',
      kty: 'RSA',
      n:
        'lQ_bci9EYeWFNodR37DyZ9WU2fvBbqzhQMAEGtvNxT6or_Rp687REhxWLDcUAPPrTOjKV5ZF8yPv-fIg921GTgmGL8kzg0MxD9-SuxO1PvNopVPVrLH7GL-gFj3Qj4SeTQHQMFYYPrZIQGcuOsz1LpgMSjNOw1qohfIo39lK7EO_GAfOgMpEKgE1tNg2AGIvrMJkTTUSQfwXVY1XZu0OmoR4xi6gbhHcqDq8M57s09c77kqyo5NhpaoDYfuJu1oA2DsjWHKmN84PIc-44ec7Eo7miFsgk5rZVH41r8rj-t8j7RudVMBYdoYtFzr9l_eADnRsytLILUl5yxs1IC73qw',
      use: 'sig'
    };
    const myAccessToken =
      'eyJraWQiOiJ1VHJ5ajVPTEVjVG16K2pSV3liWGZINTVJQmdLaTlocmt5YzVTNm9FVTNBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5OTQwNjdjZi05OWQxLTQ0ZDktYjU2Ni0yNDlkYjIxNmM0MzkiLCJldmVudF9pZCI6Ijg3OGVmZTgyLWYzODctMTFlOC04NjdjLTE3YThiOGY3M2FhMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE1NDM0NjI0MDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1luODl5S2l6biIsImV4cCI6MTU0MzQ2NjAwNSwiaWF0IjoxNTQzNDYyNDA1LCJ2ZXJzaW9uIjoyLCJqdGkiOiI5MTNmMDIwOC1kZWM5LTQzYTktYjQyMS0xMDFjYWQ5NjZjMjIiLCJjbGllbnRfaWQiOiI2a3R0MG10cGtzMDNyOHNmdGljYzNoMW82IiwidXNlcm5hbWUiOiI5OTQwNjdjZi05OWQxLTQ0ZDktYjU2Ni0yNDlkYjIxNmM0MzkifQ.A_6LpjJ0sx7p4Hbo6OKoyPcgwYPN6Td-KoW-VSMjLMPW1OdNjvZW-arCg6znHXJSdXLng236B8y2V4EcUSzZZim1YwxvK-rIe60rN7Y4N8kNqeSg7i5Sye18ZW21w9guYsHPNychHQoj3cINHB2SjbNX-wRapwEdxudGJ41O5wDgpFbqlVn7d67a6CeDYlxccaWAS3Lhbqph2sMDLhg7RC4xCOxrRU6prw2zzmUJbKC_nl_tNrCPNuQvQxzuUZ2Quyh0P1FUS5zkPk5vWNmlO6O9yZjZJ9XzGmmXi3crzulAPw2UlyQK1IPYmAgLQ0jkGnffg_MI3pRLyjQemINUmQ';

    const pem = jwkToPem(myJwk);
    jwt.verify(myAccessToken, pem, { algorithms: ['RS256'] }, function(
      err,
      decodedToken
    ) {
      if (err) {
        console.log('error: ' + err);
      }
      if (decodedToken) {
        console.log('decoded token: ' + decodedToken);
        console.log(decodedToken);
        console.log('must have been valid');
      }
    });
    try {
      jwt.verify(myAccessToken, pem);
    } catch (err) {
      console.log('error: ' + err);
    }
  });
});
