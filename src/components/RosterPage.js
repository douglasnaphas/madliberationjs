import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ThatsEveryoneButtonWithRouter from './ThatsEveryoneButtonWithRouter';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class RosterPage extends Component {
  state = {
    rosterLoading: true,
    participants: [],
    thatsEveryonePressed: false,
    thatsEveryoneFailed: false
  };
  _isMounted = false;
  fetchRoster = (roomCode, gameName) => {
    const f = () => {
      if (
        !roomCode &&
        !gameName &&
        localStorage.getItem('roomCode') &&
        localStorage.getItem('gameName')
      ) {
        roomCode = localStorage.getItem('roomCode');
        gameName = localStorage.getItem('gameName');
      }
      const { roster } = this.props;
      if (this._isMounted) this.setState({ rosterLoading: true });
      roster(roomCode, gameName).then(d => {
        if (d.status === 200) {
          if (this._isMounted) {
            this.setState({
              rosterLoading: false,
              participants: d.data.participants
            });
          }
        }
      });
    };
    return f;
  };
  closeSederAndPlay = history => {
    const {
      closeSeder,
      confirmedRoomCode,
      confirmedGameName,
      chosenPath
    } = this.props;
    if (this._isMounted) this.setState({ thatsEveryonePressed: true });
    closeSeder(confirmedRoomCode, confirmedGameName, chosenPath).then(d => {
      if (!this._isMounted) return;
      if (d.status === 200) {
        history.push('/let-them-press-button');
        return;
      }
      if (this._isMounted) {
        this.setState({
          thatsEveryonePressed: false,
          thatsEveryoneFailed: true
        });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    const {
      confirmedRoomCode,
      confirmedGameName,
      chosenPath,
      hydrateRoomCodeAndGameName,
      setConfirmedRoomCode,
      setConfirmedGameName,
      setChosenPath
    } = this.props;
    let roomCode = confirmedRoomCode;
    let gameName = confirmedGameName;
    let path = chosenPath;
    if (
      !roomCode &&
      !gameName &&
      !path &&
      localStorage.getItem('roomCode') &&
      localStorage.getItem('gameName') &&
      localStorage.getItem('chosenPath')
    ) {
      roomCode = localStorage.getItem('roomCode');
      setConfirmedRoomCode(roomCode);
      gameName = localStorage.getItem('gameName');
      setConfirmedGameName(gameName);
      path = localStorage.getItem('chosenPath');
      setChosenPath(path);
    }
    this.fetchRoster(roomCode, gameName)();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { confirmedRoomCode, confirmedGameName } = this.props;
    const rosterRows = [];
    for (let i = 0; i < this.state.participants.length; i++) {
      rosterRows.push(
        <TableRow key={`participantRow${i}`}>
          <TableCell key={`participantCell${i}`} madliberationid={`pc${i}`}>
            {this.state.participants[i]}
          </TableCell>
        </TableRow>
      );
    }
    var spinnerOrRoster;
    if (this.state.rosterLoading) {
      spinnerOrRoster = <CircularProgress />;
    } else {
      spinnerOrRoster = (
        <div>
          <Table>
            <TableBody>{rosterRows}</TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <Typography variant="h3" gutterBottom>
          Seder Roster
        </Typography>
        <Typography variant="h3" gutterBottom>
          {this.state.participants.length} people
        </Typography>
        <div>
          <Typography component="p" paragraph gutterBottom>
            have joined your seder:
          </Typography>
        </div>
        <div>{spinnerOrRoster}</div>
        <div>
          <Typography component="p" paragraph gutterBottom>
            Is that everyone?
          </Typography>
        </div>
        <div>
          <Button
            madliberationid="no-check-again-button"
            variant="contained"
            disabled={
              this.state.rosterLoading || this.state.thatsEveryonePressed
            }
            onClick={this.fetchRoster(confirmedRoomCode, confirmedGameName)}
          >
            No, check again
          </Button>
        </div>
        <br />
        <div>
          <ThatsEveryoneButtonWithRouter
            madliberationid="thats-everyone-button-w-router"
            closeSederAndPlay={this.closeSederAndPlay}
            disabled={
              this.state.thatsEveryonePressed || this.state.rosterLoading
            }
          />
        </div>
        <div hidden={!this.state.thatsEveryoneFailed}>
          <Typography component="p" color="secondary">
            There was an unexplained problem, please try again or accept our
            apologies and make a new seder after trying again many times
          </Typography>
        </div>
        <div />
      </div>
    );
  }
}

export default withStyles(styles)(RosterPage);
