#!/usr/bin/env bash

IT_ROOM_CODE=$(npx madliberation-itest --site https://staging.madliberationgame.com | awk '{print $3}')
[[ -n ${IT_ROOM_CODE} ]]
echo "created room code ${IT_ROOM_CODE}"