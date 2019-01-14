# Mad Liberation JS

The front-end for Mad Liberation.

## Run tests

`npm run-script test -- --watch`

## Run locally

`REACT_APP_MLJSAPI` must be specified, for example like `REACT_APP_MLJSAPI=http://localhost:3002/`. Scripts running on localhost cannot make API calls to the production API.

### Run app

`REACT_APP_MLJSAPI=<Mad Liberation API URL> npm start`

### Run integration tests

`REACT_APP_MLJSAPI=<Mad Liberation API URL> npm start`
`node ./src/App.itest.js http://localhost:3000`
