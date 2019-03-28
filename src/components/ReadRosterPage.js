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

class ReadRosterPage extends Component {
  state = {
    rosterLoading: true,
    done: [],
    notDone: [],
    thatsEveryonePressed: false,
    thatsEveryoneFailed: false
  };
  _isMounted = false;
  fetchRoster = () => {
    const { confirmedRoomCode, roster } = this.props;
    if (this._isMounted) this.setState({ rosterLoading: true });
    roster(confirmedRoomCode).then(d => {
      if (d.status === 200) {
        if (this._isMounted) {
          this.setState({
            rosterLoading: false,
            done: d.data.done,
            notDone: d.data.notDone
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
    const doneRows = [];
    for (let i = 0; i < this.state.done.length; i++) {
      doneRows.push(
        <TableRow key={`doneRow${i}`}>
          <TableCell key={`doneCell${i}`}>{this.state.done[i]}</TableCell>
        </TableRow>
      );
    }
    const notDoneRows = [];
    for (let i = 0; i < this.state.notDone.length; i++) {
      notDoneRows.push(
        <TableRow key={`notDoneRow${i}`}>
          <TableCell key={`notDoneCell${i}`}>{this.state.notDone[i]}</TableCell>
        </TableRow>
      );
    }
    var doneHeading;
    var doneTable;
    var notDoneHeading;
    var notDoneTable;
    var spinnerOrRoster;
    if (this.state.rosterLoading) {
      spinnerOrRoster = <CircularProgress />;
    } else {
      spinnerOrRoster = (
        <div>
          <div>
            <Typography component="p" paragraph gutterBottom>
              These sedergoers have submitted their answers:
            </Typography>
          </div>
          <div>
            <Table>
              <TableBody>{doneRows}</TableBody>
            </Table>
          </div>
          <div>
            <Typography component="p" paragraph gutterBottom>
              These have not:
            </Typography>
          </div>
          <div>
            <Table>
              <TableBody>{notDoneRows}</TableBody>
            </Table>
          </div>
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
          <Button
            variant="contained"
            disabled={
              this.state.thatsEveryonePressed || this.state.rosterLoading
            }
          >
            That's everyone
          </Button>
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

export default withStyles(styles)(ReadRosterPage);
