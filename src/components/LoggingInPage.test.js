import LoggingInPage from './LoggingInPage';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('Logging In Page', () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  test('...', async () => {
    const history = { push: jest.fn() };
    const setUser = jest.fn();
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ json: jest.fn() });
      });
    });
    const wrapper = await mount(
      <MemoryRouter>
        <LoggingInPage history={history} setUser={setUser}></LoggingInPage>
      </MemoryRouter>
    );
  });
});
