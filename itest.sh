#!/usr/bin/env bash

IT_ROOM_CODE=$(npx madliberation-itest --site https://staging.madliberationgame.com | awk '{print $3}')
[[ -n ${IT_ROOM_CODE} ]] || echo "empty IT_ROOM_CODE: ${IT_ROOM_CODE}" && false
echo "created room code ${IT_ROOM_CODE}"

# cleanup
aws sts get-caller-identity

# there should be 3 items
NUM_ITEMS=$(aws dynamodb query \
  --table-name seders \
  --key-condition-expression "room_code = :rc" \
  --expression-attribute-values '{":rc":{"S":"'${IT_ROOM_CODE}'"}}' \
  --projection-expression 'room_code, lib_id' \
  | \
  jq '.["Items"] | length')
# that should print 3
[[ "${NUM_ITEMS}" -eq "4" ]] || echo "wrong NUM_ITEMS: ${NUM_ITEMS}" && false

# one should be a seder, the other two should start with participant#


# there should be a participant in this seder with the name "ITestLdr <room code>"

# there should be a participant in this seder with the name "ITestP2 <room code>"

# 

# seder
# lib_id should be seder
# closed should be true
