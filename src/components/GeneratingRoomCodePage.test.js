import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GeneratingRoomCodePage from './GeneratingRoomCodePage';
import { Typography } from '@material-ui/core';

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
  test('should fetch /room-code', () => {});
  test('chosenPath should be hydrated if not supplied', () => {});
});
// https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
