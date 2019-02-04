import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import PickScriptPage from './PickScriptPage';
import React from 'react';
import { wrap } from 'module';

import EnterRoomCodePage from './EnterRoomCodePage';
import NoAuthHomePage from './NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('<EnterRoomCodePage />', () => {
  let mount;
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

  test('Join button should be disabled with no code entered', async () => {
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
  });
});
