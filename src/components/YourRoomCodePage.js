import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import ThatsMyNameButtonWithRouter from './ThatsMyNameButtonWithRouter';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class YourRoomCodePage extends Component {
  state = {
    tentativeGameName: false,
    thatsMyNameButtonPressed: false,
    failedAttempt: false,
    failureMessage: ''
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { confirmedRoomCode, setConfirmedRoomCode } = this.props;
    if (!confirmedRoomCode && localStorage.getItem('roomCode')) {
      setConfirmedRoomCode(localStorage.getItem('roomCode'));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      classes,
      joinSeder,
      setConfirmedGameName,
      confirmedRoomCode
    } = this.props;
    const gameNameChanged = event => {
      event.target.value = event.target.value.replace(
        Configs.gameNameBlacklist(),
        ''
      );
      if (event.target.value.length > 0) {
        this.setState({ tentativeGameName: event.target.value });
      } else {
        this.setState({ tentativeGameName: false });
      }
    };
    const setThatsMyNameButtonPressed = bool => {
      this.setState({ thatsMyNameButtonPressed: bool });
    };
    const setFailedAttempt = bool => {
      this.setState({ failedAttempt: bool });
    };
    const joinSederAndGoToRoster = history => {
      this.setState({ thatsMyNameButtonPressed: true });
      joinSeder(confirmedRoomCode, this.state.tentativeGameName).then(d => {
        if (!this._isMounted) return;
        if (d.status === 200) {
          this.setState({ confirmedGameName: d.data.gameName });
          setConfirmedGameName(d.data.gameName);
          history.push('/roster');
        } else {
          this.setState({ failedAttempt: true });
          if (d.err === Configs.generic400ErrorMessage) {
            this.setState({
              failureMessage:
                'We could not join you to your own seder with that Game Name. ' +
                'Please make sure it has not been more than ' +
                Configs.msToJoinSeder() / 1000 / 60 +
                ' minutes since you got your code, and ' +
                'try again, or try a different Game Name'
            });
          } else {
            this.setState({ failureMessage: d.data.err });
          }
        }
        if (this._isMounted) this.setState({ thatsMyNameButtonPressed: false });
      });
    };
    let spinnerOrRoomCode = (
      <div>
        <Typography variant="h3" gutterBottom>
          Your Room Code is:
        </Typography>
        <br />
        <Typography variant="h3" gutterBottom>
          {confirmedRoomCode}
        </Typography>
        <br />
        <Typography component="p">
          Tell everyone physically at your seder to go to{' '}
          <a target="_blank" href="https://passover.lol">
            passover.lol
          </a>{' '}
          (opens in a new tab) on their computer or mini-computer, click "Join a
          Seder", and enter that Room Code to join you virtually.
        </Typography>
        <br />
        <div>
          <Divider />
        </div>
        <div>
          <Typography variant="h3" gutterBottom>
            Meanwhile
          </Typography>
        </div>
        <div>
          <Typography component="p" paragraph gutterBottom>
            What's your <label for="leader-game-name">Game Name</label>? It's
            how you, personally, will be known throughout this seder.
          </Typography>
        </div>
        <div>
          <TextField
            madliberationid="ringleader-game-name-text-field"
            helperText="your nickname this seder"
            variant="outlined"
            onChange={gameNameChanged}
            id="leader-game-name"
          />
        </div>
        <br />
        <div>
          <ThatsMyNameButtonWithRouter
            joinSederAndGoToRoster={joinSederAndGoToRoster}
            tentativeGameName={this.state.tentativeGameName}
            thatsMyNameButtonPressed={this.state.thatsMyNameButtonPressed}
          />
        </div>
        <div
          hidden={
            !this.state.failedAttempt || this.state.thatsMyNameButtonPressed
          }
        >
          <Typography component="p" color="secondary">
            {this.state.failureMessage}
          </Typography>
        </div>
      </div>
    );

    return (
      <div madliberationid="your-room-code-page">
        <MenuAppBar confirmedRoomCode={confirmedRoomCode} />
        <br />
        {spinnerOrRoomCode}
      </div>
    );
  }
}

export default withStyles(styles)(YourRoomCodePage);
