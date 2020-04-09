import SedersPage from './SedersPage';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import { Configs } from '../Configs';

let mount;
let globalFetch = global.fetch;

beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
  global.fetch = globalFetch;
});

describe('SedersPage', () => {
  const selectSederByRoomCode = (wrapper, roomCode) => {
    expect(
      wrapper.findWhere(n => n.is(Radio) && n.is(`#radio-${roomCode}`)).exists()
    ).toBe(true);
    act(() => {
      wrapper
        .findWhere(n => n.is(Radio) && n.is(`#radio-${roomCode}`))
        .prop('onChange')({
        target: { value: `${roomCode}` }
      });
      wrapper.update();
    });
  };
  describe('Re-join Case 1: user started the seder, non-closed, user un-named', () => {
    // should drop the user back at /your-room-code
    test('user rejoins an open seder 1', async () => {
      const user = {
        email: 'user1@gmail.com',
        nickname: 'Mister One',
        sub: '11-aa-m1-gha-one'
      };
      const setConfirmedRoomCode = jest.fn();
      const setChosenPath = jest.fn();

      const sedersStarted = [
        {
          created: 1585970508141,
          lib_id: 'seder',
          room_code: 'IJYAQX',
          path: 'madliberation-scripts/005-Practice_Script',
          user_email: 'user1@gmail.com',
          timestamp: '2020-04-04T03:21:48.141Z'
        },
        {
          created: 1585973347633,
          lib_id: 'seder',
          room_code: 'ZLSXQA',
          path: 'madliberation-scripts/006-Practice_Script',
          user_email: 'user1@gmail.com',
          timestamp: '2020-04-04T04:09:07.633Z'
        },
        {
          created: 1585963851309,
          lib_id: 'seder',
          room_code: 'GMKMNB',
          path: 'madliberation-scripts/007-Practice_Script',
          user_email: 'user1@gmail.com',
          timestamp: '2020-04-04T01:30:51.309Z'
        }
      ];
      const sedersJoined = [];
      global.fetch = jest.fn().mockImplementation((url, init) => {
        if (url.pathname === '/seders' || url.pathname === '/seders-started') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersStarted };
              })
            });
          });
        }
        if (url.pathname === '/seders-joined') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersJoined };
              })
            });
          });
        }
      });
      const history = { push: jest.fn() };
      let wrapper;
      await act(async () => {
        wrapper = mount(
          <MemoryRouter>
            <SedersPage
              history={history}
              user={user}
              setConfirmedRoomCode={setConfirmedRoomCode}
              setChosenPath={setChosenPath}
            ></SedersPage>
          </MemoryRouter>
        );
      });
      expect(global.fetch).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.findWhere(n => n.is(Button)).exists()).toBe(true);
      selectSederByRoomCode(wrapper, 'ZLSXQA');
      wrapper.update();
      act(() => {
        const button = wrapper.findWhere(
          n => n.is(Button) && n.is('#resume-this-seder-button')
        );
        button.prop('onClick')();
      });
      expect(setConfirmedRoomCode).toHaveBeenCalled();
      expect(setConfirmedRoomCode).toHaveBeenCalledTimes(1);
      expect(setConfirmedRoomCode).toHaveBeenCalledWith('ZLSXQA');
      expect(setChosenPath).toHaveBeenCalled();
      expect(setChosenPath).toHaveBeenCalledTimes(1);
      expect(setChosenPath).toHaveBeenCalledWith(
        'madliberation-scripts/006-Practice_Script'
      );
      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/your-room-code');
    });
  });
  describe('Re-join Case 2: user started the seder, non-closed, user named', () => {
    // user has a confirmed game name, but has not yet clicked "that's everyone"
    // get a game name cookie, restore state, and send them to /roster
    test('user started some, joined some, 1 overlap', async () => {
      const userEmail = 'munmunny@gmail.com';
      const selectedRoomCode = 'MMEMUN';
      const selectedGameName = 'madame un';
      const userSub = '222-case2-thisiscase-2-x';
      const selectedPath = 'xxx-madliberation-scripts/007-Practice_Script';
      const user = {
        email: userEmail,
        nickname: selectedGameName,
        sub: userSub
      };
      const setConfirmedRoomCode = jest.fn();
      const setChosenPath = jest.fn();
      const setConfirmedGameName = jest.fn();
      const sedersStarted = [
        {
          created: 1585970508141,
          lib_id: 'seder',
          room_code: 'LFEJIK',
          path: 'madliberation-scripts/002-Practice_Script',
          user_email: userEmail,
          timestamp: '2020-04-04T03:21:48.141Z'
        },
        {
          created: 1585973347633,
          lib_id: 'seder',
          room_code: 'RLSXQA',
          path: 'madliberation-scripts/006-Practice_Script',
          user_email: userEmail,
          timestamp: '2020-04-04T04:09:07.633Z'
        },
        {
          created: 1585963851309,
          lib_id: 'seder',
          room_code: selectedRoomCode,
          path: selectedPath,
          user_email: userEmail,
          timestamp: '2020-04-04T01:30:51.309Z'
        }
      ];
      const sedersJoined = [
        {
          lib_id:
            'participant#thiswillactuallybesomethinglikethefirst64charsofthehashofthegamename',
          room_code: selectedRoomCode,
          user_email: userEmail,
          game_name: selectedGameName
        },
        {
          lib_id:
            'participant#4ormaybeitsthewholehash34890fjalfds239ftheg4u398poda',
          room_code: 'FFEMUN',
          user_email: userEmail,
          game_name: 'custom name'
        },
        {
          lib_id: 'participant#kf83q90jflakehash34890fjalfds239ftheg4u398poda',
          room_code: 'NONOVE',
          user_email: userEmail,
          game_name: selectedGameName
        }
      ];
      const expectedRejoinInit = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: selectedGameName,
          roomCode: selectedRoomCode,
          user: userSub
        })
      };
      global.fetch = jest.fn().mockImplementation((url, init) => {
        const postData =
          init && init.body && init.body.length && JSON.parse(init.body);
        if (url.pathname === '/seders' || url.pathname === '/seders-started') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersStarted };
              })
            });
          });
        }
        if (url.pathname === '/seders-joined') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersJoined };
              })
            });
          });
        }
        if (
          url.pathname === '/rejoin' &&
          postData &&
          postData.roomCode &&
          postData.roomCode === selectedRoomCode &&
          postData.gameName &&
          postData.gameName === selectedGameName
        ) {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return {
                  gameName: selectedGameName,
                  roomCode: selectedRoomCode,
                  result: 'success'
                };
              })
            });
          });
        }
        return new Promise((resolve, reject) => {
          reject({ err: 'bad fetch' });
        });
      });
      const history = { push: jest.fn() };
      let wrapper;
      await act(async () => {
        wrapper = mount(
          <MemoryRouter>
            <SedersPage
              history={history}
              user={user}
              setConfirmedRoomCode={setConfirmedRoomCode}
              setChosenPath={setChosenPath}
              setConfirmedGameName={setConfirmedGameName}
            ></SedersPage>
          </MemoryRouter>
        );
      });
      expect(global.fetch).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.findWhere(n => n.is(Button)).exists()).toBe(true);
      selectSederByRoomCode(wrapper, selectedRoomCode);
      wrapper.update();
      await act(async () => {
        const button = wrapper.findWhere(
          n => n.is(Button) && n.is('#resume-this-seder-button')
        );
        await button.prop('onClick')();
      });
      wrapper.update();
      expect(setConfirmedRoomCode).toHaveBeenCalled();
      expect(setConfirmedRoomCode).toHaveBeenCalledTimes(1);
      expect(setConfirmedRoomCode).toHaveBeenCalledWith(selectedRoomCode);
      expect(setChosenPath).toHaveBeenCalled();
      expect(setChosenPath).toHaveBeenCalledTimes(1);
      expect(setChosenPath).toHaveBeenCalledWith(selectedPath);
      expect(setConfirmedGameName).toHaveBeenCalled();
      expect(setConfirmedGameName).toHaveBeenCalledTimes(1);
      expect(setConfirmedGameName).toHaveBeenCalledWith(selectedGameName);
      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/roster');
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch.mock.calls[2][0].pathname).toEqual('/rejoin');
      expect(global.fetch.mock.calls[2][1]).toEqual(expectedRejoinInit);
    });
    test('multiple overlapping seders', () => {});
  });
  describe('Re-join Case 3: user did not start the seder, non-closed', () => {
    // user must have been named (must have gotten their game name confirmed)
    // if they are in a seder that they did not start
    // get a game name cookie, restore state, and send them to /you-have-joined
    // or
    test('user started some, joined some others (disjoint sets)', async () => {
      const userEmail = 'funfunny@yahoo.co';
      const selectedRoomCode = 'FFUNNY';
      const selectedGameName = 'Lapid Sprull';
      const userSub = 'mr3mr3-case3-maybethereareother-cases';
      const selectedPath = 'xxx-madliberation-scripts/010-Three_Script';
      const user = {
        email: userEmail,
        nickname: selectedGameName,
        sub: userSub
      };
      const setConfirmedRoomCode = jest.fn();
      const setChosenPath = jest.fn();
      const setConfirmedGameName = jest.fn();
      const sedersStarted = [
        {
          created: 1585970508141,
          lib_id: 'seder',
          room_code: 'MXIJIK',
          path: 'madliberation-scripts/002-Practice_Script',
          user_email: userEmail,
          timestamp: '2020-04-04T03:21:48.141Z'
        },
        {
          created: 1585973347633,
          lib_id: 'seder',
          room_code: 'TIYXQA',
          path: 'madliberation-scripts/006-Practice_Script',
          user_email: userEmail,
          timestamp: '2020-04-04T04:09:07.633Z'
        },
        {
          created: 1585963851309,
          lib_id: 'seder',
          room_code: 'OTHERR',
          path: selectedPath,
          user_email: userEmail,
          timestamp: '2020-04-04T01:30:51.309Z'
        }
      ];
      const sedersJoined = [
        {
          lib_id:
            'participant#84849343tuallybesomethinglikethefirst64charsofthehashofth00',
          room_code: 'MORXLY',
          user_email: userEmail,
          game_name: selectedGameName
        },
        {
          lib_id:
            'participant#uruuururthewholehash34890fjalfds239ftheg4u398poda',
          room_code: 'SYRXUR',
          user_email: userEmail,
          game_name: 'custom XYR name'
        },
        {
          lib_id: 'participant#123fweretlakehash34890fjalfds239ftheg4u398poda',
          room_code: selectedRoomCode,
          user_email: userEmail,
          game_name: selectedGameName
        }
      ];
      const expectedRejoinInit = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: selectedGameName,
          roomCode: selectedRoomCode,
          user: userSub
        })
      };
      global.fetch = jest.fn().mockImplementation((url, init) => {
        const postData =
          init && init.body && init.body.length && JSON.parse(init.body);
        if (url.pathname === '/seders' || url.pathname === '/seders-started') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersStarted };
              })
            });
          });
        }
        if (url.pathname === '/seders-joined') {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return { Items: sedersJoined };
              })
            });
          });
        }
        if (
          url.pathname === '/rejoin' &&
          postData &&
          postData.roomCode &&
          postData.roomCode === selectedRoomCode &&
          postData.gameName &&
          postData.gameName === selectedGameName
        ) {
          return new Promise((resolve, reject) => {
            resolve({
              json: jest.fn().mockImplementation(() => {
                return {
                  gameName: selectedGameName,
                  roomCode: selectedRoomCode,
                  result: 'success'
                };
              })
            });
          });
        }
        return new Promise((resolve, reject) => {
          reject({ err: 'bad fetch' });
        });
      });
      const history = { push: jest.fn() };
      let wrapper;
      await act(async () => {
        wrapper = mount(
          <MemoryRouter>
            <SedersPage
              history={history}
              user={user}
              setConfirmedRoomCode={setConfirmedRoomCode}
              setChosenPath={setChosenPath}
              setConfirmedGameName={setConfirmedGameName}
            ></SedersPage>
          </MemoryRouter>
        );
      });
      expect(global.fetch).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.findWhere(n => n.is(Button)).exists()).toBe(true);
      selectSederByRoomCode(wrapper, selectedRoomCode);
      wrapper.update();
      await act(async () => {
        const button = wrapper.findWhere(
          n => n.is(Button) && n.is('#resume-this-seder-button')
        );
        await button.prop('onClick')();
      });
      wrapper.update();
      expect(setConfirmedRoomCode).toHaveBeenCalled();
      expect(setConfirmedRoomCode).toHaveBeenCalledTimes(1);
      expect(setConfirmedRoomCode).toHaveBeenCalledWith(selectedRoomCode);
      expect(setChosenPath).not.toHaveBeenCalled();
      expect(setConfirmedGameName).toHaveBeenCalled();
      expect(setConfirmedGameName).toHaveBeenCalledTimes(1);
      expect(setConfirmedGameName).toHaveBeenCalledWith(selectedGameName);
      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/you-have-joined');
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch.mock.calls[2][0].pathname).toEqual('/rejoin');
      expect(global.fetch.mock.calls[2][1]).toEqual(expectedRejoinInit);
    });
  });
  describe('Possible re-join case 3.5: seder closed, assignments not populated', () => {
    // this may suggest routing to /you-have-joined or /let-them-press-buttons,
    // or maybe it can be handled in one of the other cases
    // it may depend on how much /close-seder does
    // we might be ok, since I think the "click button" action just grabs
    // libs that were assigned by /close-seder and doesn't change any state
    // it seems this case is completely handled by Case 3
    // or maybe...
  });
  describe('Re-join Case 4: closed, assignments populated, but not answers', () => {
    // for closed seders it doesn't matter who started it
    // get a game name cookie, restore state, and send them to /play
    // maybe leader should get sent to /let-them-press-buttons, in case they
    // haven't told players to press theirs
    // in fact, maybe players should be sent to /you-have-joined (but maybe
    // /play is ok since the libs are ready...probably best to go with
    // /you-have-joined, in case there are instructions on there that they
    // need to see)
    // well, ... probably this should go right to /play in all cases, otherwise
    // from /you-have-joined or /let-them-press-buttons, /assignments will be
    // called again
  });
  describe('Re-join Case 5: closed, assignments and answers populated', () => {
    // this should allow the user to fetch the script long after the seder
    // get a game name cookie, restore state, and send them to /read-roster
    test('multiple game names used for the same seder under one email', () => {
      // This is allowed. Two people could be on the same device, or sharing a
      // login so that a person without a login (for some reason) can have their
      // work saved.
    });
  });
  describe('Failed fetches', () => {
    test('failed fetch to /seders-started should show an error message', () => {});
    test('failed fetch to /seders-joined should show an error message', () => {});
    test('failed fetch to /rejoin should show an error message', () => {});
  });
});
