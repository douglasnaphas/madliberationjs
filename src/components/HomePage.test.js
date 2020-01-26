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
  const loginButton = (
    <a href={Configs.loginUrl()}>
      <Button>Log in</Button>
    </a>
  );
  const logoutButton = <Button>Log out</Button>;
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
        <a>
          <Button>Log in</Button>
        </a>
      )
    ).toBe(true);
    expect(wrapper.containsMatchingElement(loginButton)).toBe(true);
    expect(wrapper.containsMatchingElement(logoutButton)).toBe(false);
  });
  test('There should be no Log Out button with an undefined user', () => {});
  test(
    'When a user is passed in as a prop, the Log Out panel should show' +
      ', instead of the Log In button',
    () => {
      const user = { nickname: 'My Nick Name', email: 'myemail@mail.com' };
      const wrapper = mount(
        <MemoryRouter>
          <HomePage user={user}></HomePage>
        </MemoryRouter>
      );
      expect(wrapper.containsMatchingElement(loginButton)).toBe(false);
      expect(wrapper.findWhere(n => n.text() === 'Log out').exists()).toBe(
        true
      );
      expect(
        wrapper
          .findWhere(n => n.text() === 'Logged in as My Nick Name')
          .exists()
      ).toBe(true);
      expect(wrapper.containsMatchingElement(logoutButton)).toBe(true);
    }
  );
  test('Clicking Log Out should unset the user', () => {
    const user = { nickname: 'My Other Nick Name', email: 'other@gmail.com' };
    const setUser = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <HomePage user={user} setUser={setUser}></HomePage>
      </MemoryRouter>
    );
    const clickLogout = wrapper
      .findWhere(n => n.matchesElement(logoutButton))
      .prop('onClick');
    clickLogout();
    expect(setUser).toHaveBeenCalled();
    expect(setUser).toHaveBeenCalledWith(false);
  });
});
