import { signIn } from './lib/cognito';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MadUtils } from './MadUtils';
import renderer from 'react-test-renderer';

jest.mock('./lib/cognito');
signIn.mockReturnValue(Promise.reject(null));

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

function findOneComponentByText(rootComponent, regex) {
  return rootComponent.findAll(
    e => e.props.text && e.props.text.match(regex)
  )[0];
}

test('when the user sign in fails it shows a sign in button', () => {
  // mock out cognito so signinFailed is called when sign in is attempted
  const component = createComponent();
  expect(findLoginButton(component)).toBeTruthy();
  expect(getDisabledTexts(component)).toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});

test('when user sign-in succeeds it hides the sign in button, enables others', () => {
  const user = {
    id: '123',
    email: 'sederer@example.com',
    nickname: 'the dude',
  };

  signIn.mockReturnValue({
    then: cb => {
      cb(user);
      return { catch: () => undefined };
    },
  });

  const component = createComponent();
  expect(findOneComponentByText(component, /log in/i)).toBeFalsy();
  expect(getDisabledTexts(component)).not.toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
  expect(findOneComponentByText(component, /Start a seder/i)).toBeTruthy();
});
