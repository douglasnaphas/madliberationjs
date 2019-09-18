import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
});

class NoAuthHomePage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <MenuAppBar user={user} />
        <div>
          <br />
          <Button
            madliberationid="start-a-seder-button"
            title="Start a seder"
            variant="contained"
            className={classes.button}
            component={Link}
            to="/pick-script"
          >
            Start a seder
          </Button>
        </div>
        <div>
          <Button
            madliberationid="join-a-seder-button"
            title="Join a seder"
            variant="contained"
            className={classes.button}
            component={Link}
            to="/enter-room-code"
          >
            Join a seder
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoAuthHomePage);
