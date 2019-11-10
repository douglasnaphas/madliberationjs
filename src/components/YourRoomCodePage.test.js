import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import YourRoomCodePage from './YourRoomCodePage';

let mount;
beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

const getProps = ({ joinSeder, roomCode }) => {
  const props = {
    joinSeder: jest.fn(),
    setConfirmedRoomCode: jest.fn(),
    setConfirmedGameName: jest.fn(),
    confirmedRoomCode: roomCode
  };
  if (typeof joinSeder === 'function') {
    props.joinSeder = jest.fn(joinSeder);
  }
  return props;
};

describe('YourRoomCodePage', () => {
  test('confirmedRoomCode not received, should be pulled from storage', () => {
    const joinSeder = jest.fn(
      () =>
        new Promise(resolve => {
          resolve({ data: { gameName: 'Good Name' } });
        })
    );
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        return 'STORCO';
      });
    const props = getProps({ joinSeder });
    const wrapper = mount(
      <MemoryRouter>
        <YourRoomCodePage {...props}></YourRoomCodePage>
      </MemoryRouter>
    );
    expect(props.setConfirmedRoomCode).toHaveBeenCalled();
    expect(props.setConfirmedRoomCode).toHaveBeenCalledWith('STORCO');
    expect(
      wrapper.find("[madliberationid='thats-my-name-button']").exists()
    ).toBe(true);
    let button = wrapper.find("[madliberationid='thats-my-name-button']");
    let realButton = button.find('button');
    expect(realButton.exists()).toBe(true);
    console.log(realButton.prop('onClick'));
    realButton.prop('onClick')();
    // console.log(button.prop('onClick'));
    // click button, then:
    // wrapper.update();
    expect(props.joinSeder).toHaveBeenCalled();
    // expect(props.joinSeder).toHaveBeenCalledWith('STORCO', 'Good Name');
    Storage.prototype.getItem.mockClear();
  });
  test(
    'confirmedRoomCode not received -- button should be disabled until ' +
      'roomCode is pulled from storage',
    () => {}
  );
  test('confirmedRoomCode should be present in top bar', () => {});
  test("that's my name button should be disabled when input empty", () => {});
  test('one character of input should enable the button', () => {});
  test('several characters of input should leave the button enabled', () => {});
  test('the button should return to disabled after deleted input', () => {});
  test('button should be disabled during join attempt', () => {});
  test('confirmedRoomCode not received or in storage', () => {});
});
