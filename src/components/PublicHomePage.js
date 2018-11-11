import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Configs } from '../Configs';
import MenuAppBar from './MenuAppBar';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class PublicHomePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <MenuAppBar />
        <div>
          <br />
          <Button
            title="Log in"
            variant="contained"
            color="primary"
            className={classes.button}
            href={Configs.loginUrl()}
          >
            Log in
          </Button>
        </div>
        <div>
          <Button
            title="Start a seder"
            variant="contained"
            className={classes.button}
            disabled
          >
            Start a seder
          </Button>
        </div>
        <div>
          <Button
            title="Join a seder"
            variant="contained"
            className={classes.button}
            disabled
          >
            Join a seder
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PublicHomePage);
