import { Configs } from '../Configs';

/**
 * @return {Object} An object with:
 *   status: the response status, like 200,
 *   err: the error if any, or null
 * @param {String} roomCode The Room Code of the seder
 * @param {String} gameName The Game Name of the requestor
 */
async function closeSeder(roomCode, gameName) {
  const closeSederUrl = new URL(`/close-seder`, Configs.apiUrl());
  if (!roomCode || !gameName) return {};
  const response = await fetch(closeSederUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ roomCode: roomCode, gameName: gameName })
  });
  const data = await response.json();
  const status = response.status;
  return {
    data: data,
    status: status
  };
}

export { closeSeder };
