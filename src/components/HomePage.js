import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RedSeaImage from '../background-red-sea.jpg';
import MadLiberationLogo from '../mad-liberation-logo.png';
import VeryAwesomePassoverLogo from '../VAPLogo-white.png';
import { Configs } from '../Configs';
import { madLiberationStyles } from '../madLiberationStyles';
import Paper from '@material-ui/core/Paper';

const styles = () => {
  return {
    ...madLiberationStyles,
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
    },
    loginLink: {
      textDecoration: 'none',
      color: 'black'
    }
  };
};

class HomePage extends Component {
  render() {
    const { classes, user, setUser } = this.props;

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
              component={Link}
              color="primary"
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
          {!user && (
            <div id="login-container">
              <a href={Configs.loginUrl()} className={classes.loginLink}>
                <Button
                  madliberationid="login-button"
                  title="Log in"
                  variant="contained"
                >
                  Log in
                </Button>
              </a>
            </div>
          )}
          <br />
          <br />
          <br />
          <img
            alt="Very Awesome Passover"
            src={VeryAwesomePassoverLogo}
            className={classes.veryAwesomePassoverLogo}
          />
          {user && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                id="logout-container"
              >
                <br />
                <Paper style={{ padding: '8px' }}>
                  <Typography component="p">
                    Logged in as {user.nickname}
                  </Typography>
                  <Typography component="p">
                    <Button
                      onClick={() => {
                        setUser(false);
                      }}
                      madliberationid="logout-button"
                    >
                      Log out
                    </Button>
                  </Typography>
                </Paper>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
