import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { wrap } from 'module';

import App from './App';
import LoggedInHomePage from './components/LoggedInHomePage';
import NoAuthHomePage from './components/NoAuthHomePage';
import PublicHomePage from './components/PublicHomePage';
import { signIn } from './lib/cognito';

configure({ adapter: new Adapter() });

jest.mock('./lib/cognito');
// signIn.mockReturnValue(Promise.reject(null));

describe('testing <App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test.skip('when no user is logged in, there should be a log in button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.containsMatchingElement(<PublicHomePage />)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<LoggedInHomePage />)).toBeFalsy();
  });

  test.skip('when the user sign in succeeds it shows the logged-in home page', async () => {
    const user = {
      id: '123',
      email: 'sederer@example.com',
      nickname: 'the dude'
    };
    signIn.mockReturnValue(Promise.resolve(user));
    const wrapper = await mount(<App />);
    wrapper.update();
    expect(wrapper.containsMatchingElement(<LoggedInHomePage />)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<PublicHomePage />)).toBeFalsy();
  });

  test('a test', () => {});

  test('/ should show the NoAuthHomePage', async () => {
    const wrapper = await mount(<App />);
    wrapper.update();
    expect(wrapper.containsMatchingElement(<NoAuthHomePage />)).toBeTruthy();
  });
});
