import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

let mount;
beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

describe('GeneratingRoomCodePageWithRouter', () => {
  test('...', () => {});
});
