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
  fetchRoster = () => {
    const { confirmedRoomCode, confirmedGameName, roster } = this.props;
    if (this._isMounted) this.setState({ rosterLoading: true });
    roster(confirmedRoomCode, confirmedGameName).then(d => {
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
    this.fetchRoster();
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
          <TableCell key={`participantCell${i}`}>
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
        <div>
          <Typography component="p" paragraph gutterBottom>
            This flock has joined your seder:
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
            variant="contained"
            disabled={
              this.state.rosterLoading || this.state.thatsEveryonePressed
            }
            onClick={this.fetchRoster}
          >
            No, check again
          </Button>
        </div>
        <br />
        <div>
          <ThatsEveryoneButtonWithRouter
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
