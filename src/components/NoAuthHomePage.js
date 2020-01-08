import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RedSeaImage from '../background-red-sea.jpg';
import MadLiberationLogo from '../mad-liberation-logo.png';
import VeryAwesomePassoverLogo from '../VAPLogo-white.png';
import { Configs } from '../Configs';

const styles = () => {
  return {
    homePageBackground: {
      backgroundImage: `url(${RedSeaImage})`,
      minHeight: '100%',
      width: '100%',
      height: 'auto',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    madliberationLogo: {
      height: '200px'
    },
    veryAwesomePassoverLogo: {
      height: '70px'
    }
  };
};

class NoAuthHomePage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.homePageBackground}>
        <div>
          <br />
          <br />
          <div>
            <img
              alt="Mad Liberation: Let My People LOL"
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
              // component={Link}
              // to={Configs.loginUrl()}
              // href={Configs.loginUrl()}
            >
              <a href={Configs.loginUrl()}>Log in</a>
            </Button>
          </div>
          <br />
          <div>
            <Button
              madliberationid="join-a-seder-button"
              title="Join a seder"
              variant="contained"
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
              component={Link}
              to="/explain"
            >
              Lead a seder
            </Button>
          </div>
          <br />
          <br />
          <br />
          <img
            alt="Very Awesome Passover"
            src={VeryAwesomePassoverLogo}
            className={classes.veryAwesomePassoverLogo}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NoAuthHomePage);
