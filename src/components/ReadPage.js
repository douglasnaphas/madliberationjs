import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import ReadRoster from './ReadRoster';
import MenuAppBar from './MenuAppBar';
import Script from './Script';
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
    const { setConfirmedRoomCode, setConfirmedGameName } = this.props;
    let { confirmedRoomCode, confirmedGameName } = this.props;
    if (
      !confirmedRoomCode &&
      !confirmedGameName &&
      localStorage.getItem('roomCode') &&
      localStorage.getItem('gameName')
    ) {
      confirmedRoomCode = localStorage.getItem('roomCode');
      setConfirmedRoomCode(confirmedRoomCode);
      confirmedGameName = localStorage.getItem('gameName');
      setConfirmedGameName(confirmedGameName);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { confirmedRoomCode, confirmedGameName, roster, script } = this.props;
    const readRoster = this.state.readyForScript ? (
      <div />
    ) : (
      <ReadRoster
        roster={roster}
        confirmedRoomCode={confirmedRoomCode}
        confirmedGameName={confirmedGameName}
        requestScript={this.requestScript}
      />
    );
    const scriptComponent = this.state.readyForScript ? (
      <Script
        script={script}
        confirmedRoomCode={confirmedRoomCode}
        confirmedGameName={confirmedGameName}
      />
    ) : (
      <div />
    );
    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        {readRoster}
        {scriptComponent}
      </div>
    );
  }
}

export default withStyles(styles)(ReadPage);
