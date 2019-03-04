import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
  state = { rosterLoading: true, participants: [] };
  _isMounted = false;
  fetchRoster = () => {
    const { confirmedRoomCode, confirmedGameName, roster } = this.props;
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
          <TableCell key={`participantLeftCell${i}`} />
          <TableCell key={`participantCell${i}`}>
            {this.state.participants[i]}
          </TableCell>
          <TableCell key={`participantRightCell${i}`} />
        </TableRow>
      );
    }
    var spinnerOrRoster;
    if (this.state.rosterLoading) {
      spinnerOrRoster = <CircularProgress />;
    } else {
      spinnerOrRoster = (
        <Table>
          <TableBody>{rosterRows}</TableBody>
        </Table>
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
        {spinnerOrRoster}
      </div>
    );
  }
}

export default withStyles(styles)(RosterPage);
