# Mad Liberation JS

The front-end for Mad Liberation.

## Run tests

`npm run-script test -- --watch`

If running on Mac, and you encounter an error like `Error: EMFILE: too many open files, watch`, you may need to run

`brew update`
`brew install watchman`

Details [here](https://github.com/facebook/create-react-app/issues/4540).

## Run locally

`REACT_APP_MLJSAPI_URL` must be specified, for example like `REACT_APP_MLJSAPI_URL=http://localhost:3002/`. Scripts running on localhost cannot make API calls to the production API.

### Run app

`REACT_APP_MLJSAPI_URL=<Mad Liberation API URL> npm start`

### Run integration tests

`REACT_APP_MLJSAPI_URL=<Mad Liberation API URL> npm start`
`node ./src/App.itest.js --site http://localhost:3000`
