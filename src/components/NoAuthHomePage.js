import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { madLiberationStyles } from '../madLiberationStyles';

import { Configs } from '../Configs';
import MyImage from '../background-red-sea.jpg';
const styles = theme => {
  return {
    paperContainer: {
      height: '900px',
      backgroundImage: `url(${MyImage})`,
      backgroundSize: 'cover'
    }
  };
};

class NoAuthHomePage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <div className={classes.paperContainer}>
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
          <br />
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
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoAuthHomePage);
