import LoggingInPage from './LoggingInPage';
import { createMount } from '@material-ui/core/test-utils';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Configs } from '../Configs';
import { act } from 'react-dom/test-utils';

describe('Logging In Page', () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  test('...', async () => {
    const expectedUser = {
      nickname: 'Fetched User',
      email: 'fetched@user.com'
    };
    const history = { push: jest.fn() };
    const setUser = jest.fn().mockImplementation(() => {
      console.log('called setUser');
    });
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ json: jest.fn().mockImplementation(() => expectedUser) });
      });
    });
    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <LoggingInPage history={history} setUser={setUser}></LoggingInPage>
        </MemoryRouter>
      );
    });
    const expectedIdUrl = new URL('/id', Configs.apiUrl());
    const expectedInit = {
      method: 'GET',
      credentials: 'include'
    };
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(expectedIdUrl, expectedInit);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(setUser).toHaveBeenCalled();
  });
});
