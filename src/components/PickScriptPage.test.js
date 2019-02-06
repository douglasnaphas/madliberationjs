import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router';
import React from 'react';

import PickScriptPage from './PickScriptPage';
import ScriptTable from './ScriptTable';

configure({ adapter: new Adapter() });

describe('<PickScriptPage />', () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  const fourScriptsJson =
    '{"scripts":{"Items":[{"haggadah_description":{"S":"An unoffensive script for the whole family"},"haggadah_name":{"S":"001 - Family Script"},"haggadah_short_desc":{"S":"Family Script"},"path":{"S":"madliberation-scripts/001-Family_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"An offensive script for only part of the family"},"haggadah_name":{"S":"002 - Dirty Script"},"haggadah_short_desc":{"S":"Dirty Script"},"path":{"S":"madliberation-scripts/002-Dirty_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"An offensive script for the whole family"},"haggadah_name":{"S":"003 - Dirty Family Script"},"haggadah_short_desc":{"S":"Dirty Family Script"},"path":{"S":"madliberation-scripts/003-Dirty_Family_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"A script to help you get good at Mad Liberation"},"haggadah_name":{"S":"004 - Practice Script"},"haggadah_short_desc":{"S":"Practice Script"},"path":{"S":"madliberation-scripts/004-Practice_Script"},"haggadah_id":{"N":"4"}}],"Count":4,"ScannedCount":4}}';
  const fourScripts = JSON.parse(fourScriptsJson);
  const getFourScripts = () => {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(fourScriptsJson));
    });
  };
  const scriptTableWithFourScripts = (
    <ScriptTable scripts={fourScripts.scripts.Items} />
  );
  const differentScriptsJson =
    '{"scripts":{"Items":[{"haggadah_description":{"S":"An unoffensive script for a different family"},"haggadah_name":{"S":"001 - Different Family Script"},"haggadah_short_desc":{"S":"Different Family Script"},"path":{"S":"madliberation-scripts/001-Different_Family_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"An offensive different script for only part of the family"},"haggadah_name":{"S":"002 - Dirty Different Script"},"haggadah_short_desc":{"S":"Dirty Script"},"path":{"S":"madliberation-scripts/002-Dirty_Different_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"A different offensive script for the whole family"},"haggadah_name":{"S":"003 - Different Dirty Family Script"},"haggadah_short_desc":{"S":"Different Dirty Family Script"},"path":{"S":"madliberation-scripts/003-Different_Dirty_Family_Script"},"haggadah_id":{"N":"4"}},{"haggadah_description":{"S":"A different script to help you get good at Mad Liberation"},"haggadah_name":{"S":"004 - Different Practice Script"},"haggadah_short_desc":{"S":"Different Practice Script"},"path":{"S":"madliberation-scripts/004-Different_Practice_Script"},"haggadah_id":{"N":"4"}}],"Count":4,"ScannedCount":4}}';
  const differentScripts = JSON.parse(differentScriptsJson);
  const scriptTableWithDifferentScripts = (
    <ScriptTable scripts={differentScripts.scripts.Items} />
  );
  test('JSON from getScripts should be displayed in a table', async () => {
    const wrapper = await mount(
      <MemoryRouter>
        <PickScriptPage getScripts={getFourScripts} />
      </MemoryRouter>
    );
    wrapper.update();
    expect(
      wrapper.containsMatchingElement(scriptTableWithFourScripts)
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(scriptTableWithDifferentScripts)
    ).toBeFalsy();
  });
});
