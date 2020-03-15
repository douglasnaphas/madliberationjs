#!/usr/bin/env bash

IT_ROOM_CODE=$(npx madliberation-itest --site https://staging.madliberationgame.com | awk '{print $3}')
if [[ -z ${IT_ROOM_CODE} ]]
then
  echo "empty IT_ROOM_CODE: ${IT_ROOM_CODE}"
  exit 1
fi
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
if [[ "${NUM_ITEMS}" -ne "4" ]] # made 4 to test error path in the build
then                            # it will actually be 3
  echo "wrong NUM_ITEMS: ${NUM_ITEMS}"
  exit 1
fi

# one should be a seder, the other two should start with participant#


# there should be a participant in this seder with the name "ITestLdr <room code>"

# there should be a participant in this seder with the name "ITestP2 <room code>"

# 

# seder
# lib_id should be seder
# closed should be true
