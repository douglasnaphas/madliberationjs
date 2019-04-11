import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { madLiberationStyles } from '../madLiberationStyles';
import { Configs } from '../Configs';
import RedSeaImage from '../background-red-sea.jpg';
import MadLiberationLogo from '../mad-liberation-logo.png';
import VeryAwesomePassoverLogo from '../very-awesome-passover-logo.png';

const styles = theme => {
  return {
    paperContainer: {
      height: '800px',
      backgroundImage: `url(${RedSeaImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    madliberationLogo: {
      height: '200px'
    },
    veryAwesomePassoverLogo: {
      height: '120px'
    }
  };
};

class NoAuthHomePage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <div className={classes.paperContainer}>
          <br />
          <br />
          <div>
            <img
              src={MadLiberationLogo}
              className={classes.madliberationLogo}
            />
          </div>
          <br />
          <div>
            <Button
              madliberationid="join-a-seder-button"
              title="Join a seder"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              component={Link}
              to="/enter-room-code"
            >
              Join a seder
            </Button>
          </div>
          <div>
            <br />
            <Button
              madliberationid="lead-a-seder-button"
              title="Lead a seder"
              variant="contained"
              className={classes.button}
              component={Link}
              to="/pick-script"
            >
              Lead a seder
            </Button>
          </div>
          <br />
          <br />
          <br />
          <img
            src={VeryAwesomePassoverLogo}
            className={classes.veryAwesomePassoverLogo}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoAuthHomePage);
