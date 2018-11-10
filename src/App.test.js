import { CognitoAuth } from 'amazon-cognito-auth-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MadUtils } from './MadUtils';
import renderer from 'react-test-renderer';
import { createMount } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import PublicHomePage from './components/PublicHomePage';
import { wrap } from 'module';
import { Button } from '@material-ui/core';

configure({ adapter: new Adapter() });
jest.mock('amazon-cognito-auth-js');

describe('<App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(
      <div>
        <div data-foo="foo">Hello</div>
      </div>
    );
    console.log(
      wrapper.containsMatchingElement(<div data-foo="foo">Hello</div>)
    );
    expect(
      wrapper.containsMatchingElement(<div data-foo="foo">Hello</div>)
    ).toBeTruthy();
    // expect(wrapper.find('.button')).to.have.lengthOf(0);
  });

  it('renders div1', () => {
    const wrapper = mount(<div data-div="div1">div1</div>);
    expect(
      wrapper.containsMatchingElement(<div data-div="div1">div1</div>)
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(<div data-div="div2">div2</div>)
    ).toBeFalsy();
    expect(
      wrapper.containsMatchingElement(<div data-div="div3">div3</div>)
    ).toBeFalsy();
    console.log(window.document.body.innerHTML);
  });

  it('renders div2', () => {
    const wrapper = mount(<div data-div="div2">div2</div>);
    expect(
      wrapper.containsMatchingElement(<div data-div="div1">div1</div>)
    ).toBeFalsy();
    expect(
      wrapper.containsMatchingElement(<div data-div="div2">div2</div>)
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(<div data-div="div3">div3</div>)
    ).toBeFalsy();
    console.log(window.document.body.innerHTML);
  });

  it.skip('should work App', () => {
    const wrapper = mount(<App />);
    console.log(
      wrapper.containsMatchingElement(<Button>Start a seder</Button>)
    );
    console.log(wrapper.containsMatchingElement(<div data-x="x" />));
    console.log(wrapper.is('.App'));
    console.log(wrapper.hasClass('App'));
    console.log(wrapper.exists('.App'));
    console.log(wrapper.exists('.Button'));
    console.log(wrapper.text());
    // console.log(wrapper.find(Button).text());
    console.log(wrapper.containsMatchingElement(<div>xyz</div>));
    console.log(
      wrapper.containsMatchingElement(<Button>Start a seder</Button>)
    );
    // expect(wrapper.find('.button')).to.have.lengthOf(0);
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

function findLoginButton(component) {
  component.findAll;
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

test.skip('when the user sign in fails it shows a sign in button', () => {
  // mock out cognito so signinFailed is called when sign in is attempted
  const component = createComponent();
  expect(findLoginButton(component)).toBeTruthy();
  expect(getDisabledTexts(component)).toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});

test.skip('when the user sign in succeeds it hides the sign in button', () => {
  const user = { id: '123', email: 'sader@example.com', nickname: 'the dude' };
  CognitoAuth.mockImplementation(() => ({
    parseCognitoWebResponse: function() {
      this.userhandler.onSuccess({ idToken: { decodePayload: () => user } });
    }
  }));

  const component = createComponent();
  expect(findLoginButton(component)).toBeFalsy();
  expect(getDisabledTexts(component)).not.toEqual(
    expect.arrayContaining(['Start a seder', 'Join a seder'])
  );
});
