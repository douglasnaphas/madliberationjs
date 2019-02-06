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
  state = { tentativeRoomCode: false, tentativeGameName: false };

  render() {
    const { classes, user } = this.props;
    const enableJoinIfCodeValid = event => {
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
      if (event.target.value.length > 0) {
        this.setState({ tentativeGameName: event.target.value });
      } else {
        this.setState({ tentativeGameName: false });
      }
    };

    return (
      <div madliberationid="enter-room-code-page">
        <MenuAppBar user={user} />
        <div>
          <br />
          <h2>You're at a seder!</h2>
          <br />
          <p>
            Prove it. Enter the Room Code that your sedermaker gave you orally.
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
              !this.state.tentativeRoomCode || !this.state.tentativeGameName
            }
          >
            Join
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EnterRoomCodePage);
