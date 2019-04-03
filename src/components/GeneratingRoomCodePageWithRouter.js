import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

class GeneratingRoomCodePage extends Component {
  componentDidMount() {
    let { chosenPath } = this.props;
    const {
      history,
      setChosenPath,
      setConfirmedRoomCode,
      goToYourRoomCodePage
    } = this.props;
    if (!chosenPath && localStorage.getItem('chosenPath')) {
      chosenPath = localStorage.getItem('chosenPath');
      setChosenPath(chosenPath);
    }
    const roomCodeUrl = new URL('/room-code', Configs.apiUrl());
    fetch(roomCodeUrl, {
      method: 'POST',
      body: JSON.stringify({
        path: chosenPath
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => {
        return r.json();
      })
      .then(j => {
        setConfirmedRoomCode(j.roomCode);
        history.push('/your-room-code');
      });
  }
  render() {
    return (
      <div>
        <MenuAppBar />
        <br />
        <div>
          <Typography variant="h3">Generating a Room Code...</Typography>
        </div>
        <br />
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }
}

const GeneratingRoomCodePageWithRouter = withRouter(GeneratingRoomCodePage);
export default withStyles(styles)(GeneratingRoomCodePageWithRouter);
