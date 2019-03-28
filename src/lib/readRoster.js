import { Configs } from '../Configs';

/**
 * @return {Object} An object with:
 *   status: the response status, like 200,
 *   data: an object containing:
 *     done: alphabetized Array of String Game Names of participants who have
 *       submitted their answers
 *     notDone: alphabetized Array of String Game Names of participatns who
 *       have not submitted their answers
 *   err: the error if any, or null
 * @param {String} roomCode The Room Code of the seder
 */
async function readRoster(roomCode) {
  const rosterUrl = new URL(
    `/read-roster?roomcode=${roomCode}`,
    Configs.apiUrl()
  );
  if (!roomCode) return {};
  const response = await fetch(rosterUrl, {
    method: 'GET',
    credentials: 'include',
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

export { readRoster };
