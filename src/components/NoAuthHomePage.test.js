import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { configure } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import NoAuthHomePage from './NoAuthHomePage';

configure({ adapter: new Adapter() });

describe('<NoAuthHomePage />', () => {
  let mount;
  let shallow;
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
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('Should render a NoAuthHomePage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <NoAuthHomePage />
      </MemoryRouter>
    );
    expect(wrapper.containsMatchingElement(<NoAuthHomePage />)).toBe(true);
  });
  test('Should render buttons with the right links', () => {
    const wrapper = mount(
      <MemoryRouter>
        <NoAuthHomePage />
      </MemoryRouter>
    );
    expect(wrapper.containsMatchingElement(leadSederButton)).toBe(true);
    expect(wrapper.containsMatchingElement(joinSederButton)).toBe(true);
  });
});
