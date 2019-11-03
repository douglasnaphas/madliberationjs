import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import { Configs } from '../Configs';
import GeneratingRoomCodePage from './GeneratingRoomCodePage';

let mount;

beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

describe('GeneratingRoomCodePageWithRouter', () => {
  test('should display a spinner before fetch returns', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = 'a/b/c';
    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalled();
    const expectedTypography = (
      <Typography variant="h3">Generating a Room Code...</Typography>
    );
    expect(wrapper.find(CircularProgress).exists()).toBe(true);
    expect(
      wrapper.findWhere(n => n.matchesElement(expectedTypography)).exists()
    ).toBe(true);
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
  test('should fetch /room-code', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = 'a/b/c';
    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      new URL('/room-code', Configs.apiUrl()),
      {
        method: 'POST',
        body: JSON.stringify({
          path: chosenPath
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
  test('should set confirmedRoomCode on successful fetch', done => {
    const mockSuccessResponse = { roomCode: 'SUCCES' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = 'a/b/c';
    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    process.nextTick(() => {
      expect(setConfirmedRoomCode).toHaveBeenCalled();
      expect(setConfirmedRoomCode).toHaveBeenCalledTimes(1);
      expect(setConfirmedRoomCode).toHaveBeenCalledWith('SUCCES');
      global.fetch.mockClear();
      done();
    });
  });
  test('should set confirmedRoomCode on successful fetch 2', done => {
    const mockSuccessResponse = { roomCode: 'SECOND' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = 'a/b/c';
    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    process.nextTick(() => {
      expect(setConfirmedRoomCode).toHaveBeenCalled();
      expect(setConfirmedRoomCode).toHaveBeenCalledTimes(1);
      expect(setConfirmedRoomCode).toHaveBeenCalledWith('SECOND');
      global.fetch.mockClear();
      done();
    });
  });
  test('should push onto history', done => {
    const mockSuccessResponse = { roomCode: 'HISTOR' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = 'a/b/c';
    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    process.nextTick(() => {
      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/your-room-code');
      global.fetch.mockClear();
      done();
    });
  });
  test('chosenPath should be hydrated if not supplied, but present in storage', done => {
    const mockSuccessResponse = { roomCode: 'LOCALS' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return mockFetchPromise;
    });
    const history = {
      push: jest.fn()
    };
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    const chosenPath = undefined;
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        return 'script/path/from/storage';
      });

    const wrapper = mount(
      <MemoryRouter>
        <GeneratingRoomCodePage
          history={history}
          setChosenPath={setChosenPath}
          chosenPath={chosenPath}
          setConfirmedRoomCode={setConfirmedRoomCode}
        ></GeneratingRoomCodePage>
      </MemoryRouter>
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      new URL('/room-code', Configs.apiUrl()),
      {
        method: 'POST',
        body: JSON.stringify({
          path: 'script/path/from/storage'
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    );
    Storage.prototype.getItem.mockClear();
    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});
