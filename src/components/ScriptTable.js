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
    return createFourThings();
  }
}

export default withStyles(styles)(ScriptTable);
