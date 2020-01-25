import { Button } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { Configs } from '../Configs';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  let mount;
  const leadSederButton = (
    <Button
      title="Lead a seder"
      variant="contained"
      component={Link}
      to="/explain"
    >
      Lead a seder
    </Button>
  );
  const joinSederButton = (
    <Button
      title="Join a seder"
      variant="contained"
      component={Link}
      to="/enter-room-code"
    >
      Join a seder
    </Button>
  );
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('Should render a HomePage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(wrapper.containsMatchingElement(<HomePage />)).toBe(true);
  });
  test('Should render buttons with the right links', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(wrapper.containsMatchingElement(leadSederButton)).toBe(true);
    expect(wrapper.containsMatchingElement(joinSederButton)).toBe(true);
  });
  test('The Log In button should have an href to the login page', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HomePage></HomePage>
      </MemoryRouter>
    );
    expect(
      wrapper.containsMatchingElement(
        <Button>
          <a>Log in</a>
        </Button>
      )
    ).toBe(true);
    expect(
      wrapper.containsMatchingElement(
        <Button>
          <a href={Configs.loginUrl()}>Log in</a>
        </Button>
      )
    ).toBe(true);
  });
  test('The Log Out button should...', () => {});
});
