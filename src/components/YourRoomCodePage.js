import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
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

  state = { roomCodeLoading: true, roomCode: '' };
  render() {
    const {
      classes,
      setConfirmedRoomCode,
      setConfirmedGameName,
      confirmedRoomCode,
      confirmedGameName
    } = this.props;
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
            Tell everyone at your seder physically to go to{' '}
            <a target="_blank" href="https://madliberationgame.com">
              madliberationgame.com
            </a>{' '}
            (opens in a new tab) on their computer or mini-computer, click "Join
            a Seder", and enter that Room Code to join you virtually.
          </p>
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
