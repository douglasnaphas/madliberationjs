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
    joinSederResponse: false,
    sederJoined: false,
    joinButtonPressed: false
  };

  render() {
    const { classes, joinSeder } = this.props;
    const joinSederClick = () => {
      this.setState({ joinButtonPressed: true });
      joinSeder(
        this.state.tentativeRoomCode,
        this.state.tentativeGameName
      ).then(d => {
        this.setState({ joinSederResponse: d });
        if (d.status == 200) {
          this.setState({ sederJoined: true });
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
        </div>
        <div hidden={!this.state.sederJoined}>
          <p>You have joined Seder ... . Congratulations.</p>
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
