#!/usr/bin/env bash

if [[ ! -n ${REACT_APP_COGNITO_LINK} ]]
then
  echo "REACT_APP_COGNITO_LINK is not detected, failing"
  exit 1
fi
react-scripts build