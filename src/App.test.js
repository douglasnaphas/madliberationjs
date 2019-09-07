import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';

import App from './App';
import NoAuthHomePage from './components/NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('/ should show the NoAuthHomePage', async () => {
    const wrapper = await mount(<App />);
    wrapper.update();
    expect(wrapper.containsMatchingElement(<NoAuthHomePage />)).toBeTruthy();
  });
});
