import React, { Component } from 'react';
import { madLiberationStyles } from '../madLiberationStyles';
import { Typography } from '@material-ui/core';

class StageDirection extends Component {
  render() {
    const { text, sayStageDirection } = this.props;
    return (
      <span style={madLiberationStyles.boldItalicLightBlueBackground}>
        {(sayStageDirection ? "[Don't read this]:" : '') + text }
      </span>
    );
  }
}
export default StageDirection;
