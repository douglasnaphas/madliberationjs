import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuAppBar from './MenuAppBar';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LoggedInHomePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <MenuAppBar />
        <div>
          <br />
          <Button
            title="Start a seder"
            variant="contained"
            className={classes.button}
          >
            Start a seder
          </Button>
        </div>
        <div>
          <Button
            title="Join a seder"
            variant="contained"
            className={classes.button}
          >
            Join a seder
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoggedInHomePage);
