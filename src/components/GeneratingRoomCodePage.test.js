import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import GeneratingRoomCodePage from './GeneratingRoomCodePage';

let mount;
beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

describe('GeneratingRoomCodePageWithRouter', () => {
  test('should display a spinner before fetch returns', () => {});
  test('should fetch /room-code', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => {});
    const history = jest.fn();
    const setChosenPath = jest.fn();
    const setConfirmedRoomCode = jest.fn();
    <MemoryRouter>
      <GeneratingRoomCodePage></GeneratingRoomCodePage>
    </MemoryRouter>;
  });
  test('chosenPath should be hydrated if not supplied', () => {});
});
