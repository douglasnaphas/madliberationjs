import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router';
import React from 'react';
import { wrap } from 'module';

import App from '../App';
import NoAuthHomePage from './NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('testing <App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('/ should show the NoAuthHomePage', async () => {
    const wrapper = await mount(
      <MemoryRouter>
        <NoAuthHomePage />
      </MemoryRouter>
    );
    wrapper.update();
    expect(wrapper.containsMatchingElement(<NoAuthHomePage />)).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <Button
          title="Start a seder"
          variant="contained"
          // className={classes.button}
        >
          Start a seder
        </Button>
      )
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <Button
          title="Join a seder"
          variant="contained"
          // className={classes.button}
        >
          Join a seder
        </Button>
      )
    ).toBeTruthy();
  });
});
