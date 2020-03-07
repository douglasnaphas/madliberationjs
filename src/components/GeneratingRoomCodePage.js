import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({});

class GeneratingRoomCodePage extends Component {
  componentDidMount() {
    let { chosenPath } = this.props;
    const { history, setChosenPath, setConfirmedRoomCode } = this.props;
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
        if (!r.ok) {
          throw r.status;
        }
        return r.json();
      })
      .then(j => {
        setConfirmedRoomCode(j.roomCode);
        history.push('/your-room-code');
      })
      .catch(s => {
        history.push('hi');
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

GeneratingRoomCodePage.propTypes = {
  chosenPath: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  setChosenPath: PropTypes.func.isRequired,
  setConfirmedRoomCode: PropTypes.func.isRequired
};

export default withStyles(styles)(GeneratingRoomCodePage);
