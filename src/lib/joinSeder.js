import { Configs } from '../Configs';

/**
 * @return {Object} An object with:
 *   status: the response status, like 200,
 *   roomCode: the Room Code from a successful call, or null,
 *   gameName: the Game Name from a successful call, or null,
 *   err: the error if any, or null
 * @param {String} roomCode The Room Code of the seder to join
 * @param {String} gameName The Game Name of the participant who is joining
 */
async function joinSeder(roomCode, gameName) {
  const joinSederUrl = new URL('/join-seder', Configs.apiUrl());

  const response = await fetch(joinSederUrl, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      roomCode: roomCode,
      gameName: gameName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  const status = response.status;
  return {
    data: data,
    status: status
  };
}

export { joinSeder };
