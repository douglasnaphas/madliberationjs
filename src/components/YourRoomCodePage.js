import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class YourRoomCodePage extends Component {
  componentDidMount() {
    const roomCodeUrl = new URL('/room-code', Configs.apiUrl());
    fetch(roomCodeUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: this.props.location.state.selectedScript.path
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => {
        return r.json();
      })
      .then(j => {
        this.setState({ roomCode: j.roomCode });
        this.setState({ roomCodeLoading: false });
        this.props.setConfirmedRoomCode(j.roomCode);
      });
  }

  state = {
    roomCodeLoading: true,
    roomCode: '',
    tentativeGameName: false,
    thatsMyNameButtonPressed: false
  };
  render() {
    const {
      classes,
      joinSeder,
      setConfirmedRoomCode,
      setConfirmedGameName,
      confirmedRoomCode,
      confirmedGameName
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
    const thatsMyNameClick = event => {
      this.setState({ thatsMyNameButtonPressed: true });
      joinSeder(this.state.roomCode, this.state.tentativeGameName).then(d => {
        if (d.status == 200) {
          this.setState({ confirmedGameName: d.data.gameName });
          setConfirmedGameName(d.data.gameName);
        }
        this.setState({ thatsMyNameButtonPressed: false });
      });
    };
    let spinnerOrRoomCode;
    if (this.state.roomCodeLoading) {
      spinnerOrRoomCode = (
        <div>
          <h2>Generating a Room Code...</h2>
          <br />
          <CircularProgress />
        </div>
      );
    } else {
      spinnerOrRoomCode = (
        <div>
          <h2>Your Room Code is:</h2>
          <br />
          <h2>{this.state.roomCode}</h2>
          <br />
          <p>
            Tell everyone physically at your seder to go to{' '}
            <a target="_blank" href="https://madliberationgame.com">
              madliberationgame.com
            </a>{' '}
            (opens in a new tab) on their computer or mini-computer, click "Join
            a Seder", and enter that Room Code to join you virtually.
          </p>
          <div>
            <Divider />
          </div>
          <div>
            <h2>Meanwhile</h2>
          </div>
          <div>
            <p>
              What's your Game Name? It's how you, personally, will be known
              throughout this seder.
            </p>
          </div>
          <div>
            <TextField
              madliberationid="ringleader-game-name-text-field"
              helperText="your nickname this seder"
              variant="outlined"
              onChange={gameNameChanged}
            />
          </div>
          <br />
          <div>
            <Button
              madliberationid="thats-my-name-button"
              color="primary"
              variant="contained"
              disabled={
                !this.state.tentativeGameName ||
                this.state.thatsMyNameButtonPressed
              }
              onClick={thatsMyNameClick}
            >
              That's my name
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div madliberationid="your-room-code-page">
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        {spinnerOrRoomCode}
      </div>
    );
  }
}

export default withStyles(styles)(YourRoomCodePage);
