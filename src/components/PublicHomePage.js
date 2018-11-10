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

class PublicHomePage extends Component {
  render() {
    console.log('PublicHomePage render called....');
    const { classes } = this.props;

    return (
      <div>
        <MenuAppBar />
        <div data-x="x">
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
        <div>xyz</div>
      </div>
    );
  }
}

export default withStyles(styles)(PublicHomePage);
