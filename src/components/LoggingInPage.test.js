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
  test.each`
    desc                   | nickname      | email                   | url                                      | expectedUrl                   | query
    ${'strip query'}       | ${'Should'}   | ${'strip@urlquery.com'} | ${'https://passover.lol?ab=cd'}          | ${'https://passover.lol'}     | ${true}
    ${'query, hash'}       | ${'Hash Too'} | ${'clean@theurl.net'}   | ${'http://localhost?qu=ery#/logging-in'} | ${'http://localhost'}         | ${true}
    ${'no query, no hash'} | ${'No query'} | ${'abc@123a.org'}       | ${'https://MLG.mlg'}                     | ${'https://MLG.mlg'}          | ${false}
    ${'hash, no query'}    | ${'Hash'}     | ${'thishas@noq.co'}     | ${'https://xyz.com/#/log-in'}            | ${'https://xyz.com/$/log-in'} | ${false}
  `('$desc', async ({ nickname, email, url, expectedUrl, query }) => {
    const expectedUser = {
      nickname,
      email
    };
    const history = { push: jest.fn() };
    const setUser = jest.fn();
    const browserWindow = {};
    browserWindow.location = {
      toString: () => url
    };
    browserWindow.history = {
      replaceState: jest.fn().mockImplementation(() => {
        expect(history.push).not.toHaveBeenCalled();
      })
    };
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ json: jest.fn().mockImplementation(() => expectedUser) });
      });
    });
    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <MemoryRouter>
          <LoggingInPage
            history={history}
            setUser={setUser}
            browserWindow={browserWindow}
          ></LoggingInPage>
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
    expect(setUser).toHaveBeenCalledWith(expectedUser);
    expect(setUser).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.push).toHaveBeenCalledTimes(1);
    if (query) {
      expect(browserWindow.history.replaceState).toHaveBeenCalled();
      expect(browserWindow.history.replaceState).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expectedUrl
      );
      expect(browserWindow.history.replaceState).toHaveBeenCalledTimes(1);
    } else {
      expect(browserWindow.history.replaceState).not.toHaveBeenCalled();
    }
  });
});
