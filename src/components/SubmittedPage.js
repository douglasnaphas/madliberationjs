import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lib from './Lib';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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

class SubmittedPage extends Component {
  state = {};
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { confirmedRoomCode, confirmedGameName } = this.props;
    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <div>
          <Typography variant="h4" gutterBottom>
            You submitted your answers!
          </Typography>
        </div>
        <div>
          <Typography component="p" paragraph gutterBottom>
            You've done your part for this seder. Your answers will be plugged
            into the script in funny places. Now, a question:
          </Typography>
        </div>
        <div>
          <Typography variant="h4" gutterBottom>
            Do you want to read the haggadah from this device?
          </Typography>
        </div>
        <div>
          <Typography component="p" paragraph gutterBottom>
            It's usually best for just one person to receive the script on their
            device, and to pass it around for all to read. The script says when
            to pass the device to the next person.
          </Typography>
        </div>
        <div>
          <Button variant="contained">Yes, I want the script</Button>{' '}
        </div>
        <br />
        <div>
          <Button variant="contained">
            No, we'll use someone else's device
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(SubmittedPage);
