import React, { Component } from 'react';
import Header from './Header';
import ButtonRow from './ButtonRow';
import { Configs } from '../Configs';
import { CognitoAuth, CognitoIdToken } from 'amazon-cognito-auth-js';
import NavBar from './NavBar';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class LoggedInHomePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <MenuAppBar />
        <div>
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
