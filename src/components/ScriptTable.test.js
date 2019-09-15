import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';

import ScriptTable from './ScriptTable';

let mount;
beforeEach(() => {
  mount = createMount();
});
afterEach(() => {
  mount.cleanUp();
});

function fourScripts() {
  return [
    {
      haggadah_description: 'An unoffensive script for the whole family',
      lib_id: 'script#0001',
      haggadah_short_desc: 'Family Script',
      room_code: 'AAAAAA',
      path: 'madliberation-scripts/001-Family_Script',
      is_script: 1,
      haggadah_name: '0001 - Family Script',
      script_number: 1
    },
    {
      haggadah_description: 'An offensive script for only part of the family',
      lib_id: 'script#0002',
      haggadah_short_desc: 'Dirty Script',
      room_code: 'AAAAAB',
      path: 'madliberation-scripts/002-Dirty_Script',
      is_script: 1,
      haggadah_name: '0002 - Dirty Script',
      script_number: 2
    },
    {
      haggadah_description: 'An offensive script for the whole family',
      lib_id: 'script#0003',
      haggadah_short_desc: 'Dirty Family Script',
      room_code: 'AAAAAC',
      path: 'madliberation-scripts/003-Dirty_Family_Script',
      is_script: 1,
      haggadah_name: '0003 - Dirty Family Script',
      script_number: 3
    },
    {
      haggadah_description: 'A script to help you get good at Mad Liberation',
      lib_id: 'script#0004',
      haggadah_short_desc: 'Practice Script',
      room_code: 'AAAAAD',
      path: 'madliberation-scripts/004-Practice_Script',
      is_script: 1,
      haggadah_name: '0004 - Practice Script',
      script_number: 4
    }
  ];
}
function differentScripts() {
  return [
    {
      haggadah_description:
        'An unoffensive script for the whole different family',
      lib_id: 'script#0005',
      haggadah_short_desc: 'Different Family Script',
      room_code: 'AAAAAE',
      path: 'madliberation-scripts/005-Family_Script',
      is_script: 1,
      haggadah_name: '0005 - Family Script',
      script_number: 5
    },
    {
      haggadah_description:
        'An offensive script for a different part of the family',
      lib_id: 'script#0007',
      haggadah_short_desc: 'Dirty Script',
      room_code: 'AAAAAF',
      path: 'madliberation-scripts/007-Dirty_Script',
      is_script: 1,
      haggadah_name: '0007 - Dirty Script',
      script_number: 7
    },
    {
      haggadah_description:
        'An offensive script for the whole different family',
      lib_id: 'script#0008',
      haggadah_short_desc: 'Dirty Family Script',
      room_code: 'AAAAAG',
      path: 'madliberation-scripts/008-Dirty_Family_Script',
      is_script: 1,
      haggadah_name: '0008 - Dirty Family Script',
      script_number: 8
    },
    {
      haggadah_description: 'A script to help you get good at Mad Liberation',
      lib_id: 'script#0006',
      haggadah_short_desc: 'Practice Script',
      room_code: 'AAAAAH',
      path: 'madliberation-scripts/006-Practice_Script',
      is_script: 1,
      haggadah_name: '0006 - Practice Script',
      script_number: 6
    }
  ];
}
function getProps({ scripts }) {
  return {
    scripts,
    setChosenPath: jest.fn()
  };
}

describe('<ScriptTable />', () => {
  test('scripts in props should appear in a table', async () => {
    const props = getProps({ scripts: fourScripts() });
    const wrapper = await mount(
      <MemoryRouter>
        <ScriptTable {...props} />
      </MemoryRouter>
    );
    wrapper.update();
    const expectedScriptTable = (
      <TableCell>
        <Radio checked={true} value={`0`} id={`script-0`} />
      </TableCell>
    );
    expect(wrapper.containsMatchingElement(expectedScriptTable)).toBe(true);
  });
  test('script table should have three columns', () => {});
  test('do not display scripts with missing short desc ', () => {});
  test('each row should have a radio button', () => {});
  test(
    'the Use This One button should call setChosenPath with the selected' +
      ' script',
    () => {}
  );
  test(
    'the Use This One button should call setChosenPath with the selected' +
      ' script, after others have been clicked',
    () => {}
  );
  test('scripts should be ordered by...', () => {});
});
