import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import PickScriptPage from './PickScriptPage';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { wrap } from 'module';

import EnterRoomCodePage from './EnterRoomCodePage';
import NoAuthHomePage from './NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('<EnterRoomCodePage />', () => {
  let mount;
  const roomCodeTextField = (
    <TextField
      madliberationid="enter-room-code-text-field"
      helperText="6 capital letters"
      variant="outlined"
      // onChange={enableJoinIfCodeValid}
    />
  );
  const disabledJoinButton = (
    <Button
      madliberationid="join-this-seder-button"
      color="primary"
      variant="contained"
      disabled
    >
      Join
    </Button>
  );
  const enabledJoinButton = (
    <Button
      madliberationid="join-this-seder-button"
      color="primary"
      variant="contained"
      disabled={false}
    >
      Join
    </Button>
  );

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('Join button should be enabled based on supplied code and name', async () => {
    const wrapper = await mount(
      <MemoryRouter>
        <EnterRoomCodePage />
      </MemoryRouter>
    );
    wrapper.update();
    expect(wrapper.containsMatchingElement(<EnterRoomCodePage />)).toBeTruthy();
    expect(
      wrapper.find('[madliberationid="join-this-seder-button"]')
    ).toBeTruthy();
    expect(wrapper.containsMatchingElement(disabledJoinButton)).toBeTruthy();
    expect(wrapper.find(roomCodeTextField)).toBeTruthy();
    wrapper
      .find('[madliberationid="enter-room-code-text-field"]')
      .find('input')
      .simulate('change', { target: { value: 'ABCDEF' } });
    wrapper
      .find('[madliberationid="game-name-text-field"]')
      .find('input')
      .simulate('change', { target: { value: 'My Name' } });
    wrapper.update();
    expect(wrapper.containsMatchingElement(enabledJoinButton)).toBeTruthy();
    wrapper
      .find('[madliberationid="enter-room-code-text-field"]')
      .find('input')
      .simulate('change', { target: { value: 'XYZXYZA' } });
    wrapper.update();
    expect(wrapper.containsMatchingElement(enabledJoinButton)).toBeFalsy();
    wrapper
      .find('[madliberationid="enter-room-code-text-field"]')
      .find('input')
      .simulate('change', { target: { value: 'RASNAM' } });
    wrapper.update();
    expect(wrapper.containsMatchingElement(enabledJoinButton)).toBeTruthy();
    wrapper
      .find('[madliberationid="game-name-text-field"]')
      .find('input')
      .simulate('change', { target: { value: '' } });
    wrapper.update();
    expect(wrapper.containsMatchingElement(enabledJoinButton)).toBeFalsy();
  });
});
