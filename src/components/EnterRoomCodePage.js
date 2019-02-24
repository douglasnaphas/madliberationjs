import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { Configs } from '../Configs';
import { ENETDOWN } from 'constants';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class EnterRoomCodePage extends Component {
  state = {
    tentativeRoomCode: false,
    tentativeGameName: false,
    confirmedRoomCode: false,
    confirmedGameName: false,
    joinSederResponse: false,
    sederJoined: false,
    joinButtonPressed: false,
    failedAttempt: false,
    failureMessage: ''
  };

  render() {
    const { classes, joinSeder } = this.props;
    const joinSederCatchAllErrorMessage =
      'We could not join you to this ' +
      'seder, please double-check your Room Code, make sure it is not more' +
      ' than ' +
      Configs.msToJoinSeder() / 1000 / 60 +
      ' minutes old, and ' +
      'try again, or try a different Game Name or with a different browser' +
      ' or device';
    const joinSederClick = () => {
      this.setState({ joinButtonPressed: true });
      joinSeder(
        this.state.tentativeRoomCode,
        this.state.tentativeGameName
      ).then(d => {
        this.setState({ joinSederResponse: d });
        if (d.status == 200) {
          this.setState({
            sederJoined: true,
            confirmedRoomCode: d.data.roomCode,
            confirmedGameName: d.data.gameName
          });
        } else {
          this.setState({ failedAttempt: true });
          if (d.err == Configs.generic400ErrorMessage) {
            this.setState({ failureMessage: joinSederCatchAllErrorMessage });
          } else {
            this.setState({ failureMessage: d.data.err });
          }
        }
        this.setState({ joinButtonPressed: false });
      });
    };
    const enableJoinIfCodeValid = event => {
      event.target.value = event.target.value.toUpperCase();
      if (
        event.target.value &&
        event.target.value.match(Configs.roomCodeRegex())
      ) {
        this.setState({ tentativeRoomCode: event.target.value.toUpperCase() });
      } else {
        this.setState({ tentativeRoomCode: false });
      }
    };
    const enableJoinIfNameGiven = event => {
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

    return (
      <div madliberationid="enter-room-code-page">
        <MenuAppBar />
        <div>
          <br />
          <h2>You're at a seder!</h2>
          <br />
        </div>
        <div hidden={this.state.sederJoined}>
          <div>
            <p>
              Prove it. Enter the Room Code that your sedermaker gave you
              orally.
            </p>
          </div>
          <div>
            <TextField
              madliberationid="enter-room-code-text-field"
              helperText="6 letters"
              variant="outlined"
              onChange={enableJoinIfCodeValid}
            />
          </div>
          <br />
          <div>
            <p>Also, what is your game name?</p>
          </div>
          <div>
            <TextField
              madliberationid="game-name-text-field"
              helperText="it's who you are for this seder"
              variant="outlined"
              onChange={enableJoinIfNameGiven}
            />
          </div>
          <br />
          <div>
            <Button
              madliberationid="join-this-seder-button"
              color="primary"
              variant="contained"
              disabled={
                !this.state.tentativeRoomCode ||
                !this.state.tentativeGameName ||
                this.state.joinButtonPressed
              }
              onClick={joinSederClick}
            >
              Join
            </Button>
          </div>
          <div
            hidden={!this.state.failedAttempt || this.state.joinButtonPressed}
          >
            <p style={{ color: 'red' }}>{this.state.failureMessage}</p>
          </div>
        </div>
        <div hidden={!this.state.sederJoined}>
          <p>
            You have joined Seder {this.state.confirmedRoomCode} as{' '}
            {this.state.confirmedGameName}. Congratulations.
          </p>
          <p>
            Now wait until your Sederator tells you to, and then{' '}
            <Button color="primary" variant="contained">
              click this button
            </Button>{' '}
            to get your assignments.
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EnterRoomCodePage);
