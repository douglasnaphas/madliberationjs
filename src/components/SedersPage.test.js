import SedersPage from './SedersPage';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';

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

      const items = [
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
      global.fetch = jest.fn().mockImplementation((url, init) => {
        // if(url === )
        return new Promise((resolve, reject) => {
          resolve({
            json: jest.fn().mockImplementation(() => {
              return { Items: items };
            })
          });
        });
      });
      let wrapper;
      await act(async () => {
        wrapper = mount(
          <MemoryRouter>
            <SedersPage
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
      expect(
        wrapper
          .findWhere(n => n.is(Link) && n.prop('to') === '/your-room-code')
          .exists()
      ).toBe(true);
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
    });
  });
  describe('Re-join Case 2: user started the seder, non-closed, user named', () => {
    // user has a confirmed game name, but has not yet clicked "that's everyone"
  });
  describe('Re-join Case 3: user did not start the seder, non-closed', () => {
    // user must have been named (must have gotten their game name confirmed)
    // if they are in a seder that they did not start
  });
  describe('Re-join Case 4: closed, assignments populated, but not answers', () => {
    // for closed seders it doesn't matter who started it
  });
  describe('Re-join Case 5: closed, assignments and answers populated', () => {
    // this should allow the user to fetch the script long after the seder
  });
});
