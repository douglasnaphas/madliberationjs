import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import ReadRoster from './ReadRoster';
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

class ReadPage extends Component {
  state = {
    readyForScript: false
  };
  _isMounted = false;
  requestScript = () => {
    if (this._isMounted) {
      this.setState({ readyForScript: true });
    }
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { confirmedRoomCode, confirmedGameName, roster } = this.props;
    const readRoster = this.state.readyForScript ? (
      <div />
    ) : (
      <ReadRoster
        roster={roster}
        confirmedRoomCode={confirmedRoomCode}
        requestScript={this.requestScript}
      />
    );
    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        {readRoster}
      </div>
    );
  }
}

export default withStyles(styles)(ReadPage);
