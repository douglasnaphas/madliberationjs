import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MadUtils } from './MadUtils';
import { CognitoAuth } from 'amazon-cognito-auth-js';
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

test('userOrFalse() can be called', () => {
  let app = new App();
  //  app.userOrFalse();
});

test("when there's no logged in user, userOrFalse() should return false", () => {
  // mock so that AmazonCognitoIdentity.CognitoIdToken returns an object with
  // payload == {}
  // let auth = new CognitoAuth("hi");
  // console.log(auth);
  const resp = { myResp: 'response' };
  let x = App.getAuth();
  // console.log(CognitoAuth);
  // I want to test:
  // when that function was called
});

test('when the user sign in fails it shows a sign in button and disabled start/join buttons', () => {
  CognitoAuth.mockImplementation(() => {
    return {
      parseCognitoWebResponse: function(s) {
        this.userhandler.onFailure({});
      }
    };
  });

  const component = renderer.create(<App />).root;
  expect(
    component.find(e => e.props.text && e.props.text.match(/log in/i))
  ).toBeTruthy();
  const disabledButtonTexts = component
    .findAllByProps({ disabled: true })
    .map(e => e.props.text);
  expect(disabledButtonTexts).toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});

test('when user signin succeeds there is no login button', () => {
  CognitoAuth.mockImplementation(() => {
    return {
      parseCognitoWebResponse: function(s) {
        this.userhandler.onSuccess({});
      }
    };
  });
  const component = renderer.create(<App />).root;
  expect(
    component.findAll(e => e.props.text && e.props.text.match(/log in/i))
  ).toHaveLength(0);
});

test('when user signin succeeds, join/start buttons are enabled', () => {
  CognitoAuth.mockImplementation(() => {
    return {
      parseCognitoWebResponse: function(s) {
        this.userhandler.onSuccess({});
      }
    };
  });
  const component = renderer.create(<App />).root;
  const disabledButtonTexts = component
    .findAllByProps({ disabled: true })
    .map(e => e.props.text);
  expect(disabledButtonTexts).toHaveLength(0);
  expect(
    component.find(e => e.props.text && e.props.text.match(/start a seder/i))
  ).toBeTruthy();
  expect(
    component.find(e => e.props.text && e.props.text.match(/join a seder/i))
  ).toBeTruthy();
});

test('when the user sign in succeeds it shows the user name', () => {
  // does not have a log in button
  // start and join are enabled

  const component = renderer.create(<App />);
  // would raise if nothing is found
  // component.root.findByProps({className: "App"}).find(e => e.props.text && e.props.text.match(/Doug/) );
});
