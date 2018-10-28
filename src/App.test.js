import { CognitoAuth } from 'amazon-cognito-auth-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MadUtils } from './MadUtils';
import renderer from 'react-test-renderer';

jest.mock('amazon-cognito-auth-js');

test('adds 1 + 2 to equal 3', () => {
  expect(MadUtils.addNums(1, 2)).toBe(3);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

function findLoginButton(component) {
  return component.findAll(
    e => e.props.text && e.props.text.match(/log in/i)
  )[0];
}

function createComponent() {
  return renderer.create(<App />).root;
}

function getDisabledTexts(component) {
  return component.findAllByProps({ disabled: true }).map(e => e.props.text);
}

test('when the user sign in fails it shows a sign in button', () => {
  // mock out cognito so signinFailed is called when sign in is attempted
  const component = createComponent();
  expect(findLoginButton(component)).toBeTruthy();
  expect(getDisabledTexts(component)).toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});

test('when the user sign in succeeds it hides the sign in button', () => {
  const user = { id: '123', email: 'sader@example.com', nickname: 'the dude' };
  CognitoAuth.mockImplementation(() => ({
    parseCognitoWebResponse: function() {
      this.userhandler.onSuccess({ idToken: { decodePayload: () => user } });
    },
  }));

  const component = createComponent();
  expect(findLoginButton(component)).toBeFalsy();
  expect(getDisabledTexts(component)).not.toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});
