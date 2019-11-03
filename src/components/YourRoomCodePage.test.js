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

const getProps = ({ joinSeder, roomCode, gameName }) => {
  const props = {
    joinSeder: jest.fn(),
    setConfirmedRoomCode: jest.fn(),
    setConfirmedGameName: jest.fn(),
    confirmedRoomCode: roomCode,
    confirmedGameName: gameName
  };
  if (typeof joinSeder === 'function') {
    props.joinSeder = jest.fn(joinSeder);
  }
  return props;
};

describe('YourRoomCodePage', () => {
  test('confirmedRoomCode not received', () => {
    const props = getProps({});
    const wrapper = mount(
      <MemoryRouter>
        <YourRoomCodePage {...props}></YourRoomCodePage>
      </MemoryRouter>
    );
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
    wrapper.update();
    expect(props.joinSeder).toHaveBeenCalled();
  });
  test('chosenPath not received', () => {});
  test('confirmedRoomCode should be present in top bar', () => {});
  test("that's my name button should be disabled when input empty", () => {});
  test('one character of input should enable the button', () => {});
  test('several characters of input should leave the button enabled', () => {});
  test('the button should return to disabled after deleted input', () => {});
  test('button should be disabled during join attempt', () => {});
});
