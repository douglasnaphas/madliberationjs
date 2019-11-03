import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import YourRoomCodePage from './YourRoomCodePage';

let mount;
beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

describe('YourRoomCodePage', () => {
  test('confirmedRoomCode not received', () => {});
});
