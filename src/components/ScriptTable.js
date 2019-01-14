import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// takes in JSON collection of scripts, and a function it will call to set
// its parent's state when a selection is made

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const createFourThings = () => {
  const things = [];
  for (let i = 0; i < 4; i++) {
    things[i] = <div>thing {i}</div>;
  }
  return things;
};

class ScriptTable extends React.Component {
  render() {
    const { scripts } = this.props;
    const scriptRows = [];
    for (let i = 0; i < scripts.length; i++) {
      scriptRows[i] = <div>{scripts[i].haggadah_short_desc.S}</div>;
    }
    return scriptRows;
  }
}

export default withStyles(styles)(ScriptTable);
