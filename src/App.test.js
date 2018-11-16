import { signIn } from './lib/cognito';
import React from 'react';
import App from './App';
import { createMount } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import PublicHomePage from './components/PublicHomePage';
import LoggedInHomePage from './components/LoggedInHomePage';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

jest.mock('./lib/cognito');
signIn.mockReturnValue(Promise.reject(null));

describe('testing <App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('when no user is logged in, there should be a log in button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.containsMatchingElement(<PublicHomePage />)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<LoggedInHomePage />)).toBeFalsy();
  });

  test('when the user sign in succeeds it hides the sign in button', () => {
    expect.assertions(2);
    const user = {
      id: '123',
      email: 'sederer@example.com',
      nickname: 'the dude'
    };

    signIn.mockReturnValue(Promise.resolve(user));

    return new Promise(resolveTest => {
      wrapper = mount(<App />);
    }).then(component => {
      expect(wrapper.containsMatchingElement(<PublicHomePage />)).toBeFalsy();
      expect(
        wrapper.containsMatchingElement(<LoggedInHomePage />)
      ).toBeTruthy();
    });
  });
});
