import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import React from 'react';

import NoAuthHomePage from './NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('<NoAuthHomePage />', () => {
  let mount;
  const leadSederButton = (
    <Button
      title="Lead a seder"
      variant="contained"
      // className={classes.button}
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
      // className={classes.button}
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

  test('Should render buttons with the right links', async () => {
    const wrapper = await mount(
      <MemoryRouter>
        <NoAuthHomePage />
      </MemoryRouter>
    );
    wrapper.update();
    expect(wrapper.containsMatchingElement(<NoAuthHomePage />)).toBeTruthy();
    expect(wrapper.containsMatchingElement(leadSederButton)).toBeTruthy();
    expect(wrapper.containsMatchingElement(joinSederButton)).toBeTruthy();
    expect(
      wrapper.find('[title="Join a seder"]')
      // .simulate('click')
      // .containsMatchingElement(<PickScriptPage />)
    ).toBeTruthy();
    // console.log(wrapper.find('Button[title="Join a seder"]').debug());
    // console.log(
    //   wrapper
    //     .find('Button[title="Join a seder"]')
    //     .simulate('click')
    //     .debug()
    // );
  });
});
