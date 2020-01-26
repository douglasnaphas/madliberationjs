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
  test('login should strip URL query, fetch and set user', async () => {
    const expectedUser = {
      nickname: 'Fetched User',
      email: 'fetched@user.com'
    };
    const history = { push: jest.fn() };
    const setUser = jest.fn().mockImplementation(() => {});
    const browserWindow = {};
    browserWindow.location = {
      toString: () => 'https://passover.lol?abc=123/#/'
    };
    browserWindow.history = { replaceState: jest.fn() };
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
    expect(browserWindow.history.replaceState).toHaveBeenCalled();
    expect(browserWindow.history.replaceState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      'https://passover.lol'
    );
    expect(browserWindow.history.replaceState).toHaveBeenCalledTimes(1);
  });
  test('login should strip URL query (no hash), fetch and set user', async () => {
    const expectedUser = {
      nickname: 'Different User',
      email: 'diff@erent.net'
    };
    const history = { push: jest.fn() };
    const setUser = jest.fn().mockImplementation(() => {});
    const browserWindow = {};
    browserWindow.location = {
      toString: () => 'http://localhost?abc=123'
    };
    browserWindow.history = { replaceState: jest.fn() };
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
    expect(browserWindow.history.replaceState).toHaveBeenCalled();
    expect(browserWindow.history.replaceState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      'http://localhost'
    );
    expect(browserWindow.history.replaceState).toHaveBeenCalledTimes(1);
  });
  test('no query', async () => {
    const expectedUser = {
      nickname: 'NoQuery',
      email: 'some@thing.org'
    };
    const history = { push: jest.fn() };
    const setUser = jest.fn().mockImplementation(() => {});
    const browserWindow = {};
    browserWindow.location = {
      toString: () => 'https://madliberationgame.com/#/logging-in'
    };
    browserWindow.history = { replaceState: jest.fn() };
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
    expect(browserWindow.history.replaceState).not.toHaveBeenCalled();
  });
});
