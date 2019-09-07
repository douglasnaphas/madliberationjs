import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router';
import React from 'react';

import MenuAppBar from './MenuAppBar';

describe('testing <App />', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test.skip('Menu should link to Home, About, and How to Play', async () => {
    const wrapper = await mount(
      <MemoryRouter>
        <MenuAppBar />
      </MemoryRouter>
    );
    wrapper.update();
  });
});
