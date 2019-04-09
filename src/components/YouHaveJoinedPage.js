import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Configs } from '../Configs';
import { madLiberationStyles } from '../madLiberationStyles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class EnterRoomCodePage extends Component {
  componentDidMount() {
    let {
      confirmedRoomCode,
      confirmedGameName,
      setConfirmedRoomCode,
      setConfirmedGameName
    } = this.props;
    if (
      !confirmedRoomCode &&
      !confirmedGameName &&
      localStorage.getItem('roomCode') &&
      localStorage.getItem('gameName')
    ) {
      setConfirmedRoomCode(localStorage.getItem('roomCode'));
      setConfirmedGameName(localStorage.getItem('gameName'));
    }
  }
  render() {
    let { confirmedRoomCode, confirmedGameName } = this.props;
    return (
      <div madliberationid="you-have-joined-page">
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <div>
          <Typography component="p" paragraph gutterBottom>
            You have joined Seder{' '}
            <span style={madLiberationStyles.lightGrayBackround}>
              {confirmedRoomCode}
            </span>{' '}
            as{' '}
            <span style={madLiberationStyles.lightGrayBackround}>
              {confirmedGameName}
            </span>
            . Congratulations.
          </Typography>
          <Typography component="p" paragraph gutterBottom>
            Now wait until your Sederator tells you to, and then
          </Typography>
          <div>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/fetching-prompts"
            >
              click this button
            </Button>
          </div>
          <br />
          <Typography component="p" paragraph gutterBottom>
            to get your assignments.
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EnterRoomCodePage);
