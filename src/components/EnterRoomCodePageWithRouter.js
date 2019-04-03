import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

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
  state = {
    tentativeRoomCode: false,
    tentativeGameName: false,
    joinSederResponse: false,
    joinButtonPressed: false,
    failedAttempt: false,
    failureMessage: ''
  };
  _isMounted = false;
  joinSederCatchAllErrorMessage =
    'We could not join you to this ' +
    'seder, please double-check your Room Code, make sure it is not more' +
    ' than ' +
    Configs.msToJoinSeder() / 1000 / 60 +
    ' minutes old, and ' +
    'try again, or try a different Game Name or with a different browser' +
    ' or device';
  enableJoinIfCodeValid = event => {
    event.target.value = event.target.value.toUpperCase();
    if (
      event.target.value &&
      event.target.value.match(Configs.roomCodeRegex())
    ) {
      this.setState({ tentativeRoomCode: event.target.value.toUpperCase() });
    } else {
      this.setState({ tentativeRoomCode: false });
    }
  };
  enableJoinIfNameGiven = event => {
    event.target.value = event.target.value.replace(
      Configs.gameNameBlacklist(),
      ''
    );
    if (event.target.value.length > 0) {
      this.setState({ tentativeGameName: event.target.value });
    } else {
      this.setState({ tentativeGameName: false });
    }
  };
  joinSederClick = () => {
    const {
      setConfirmedRoomCode,
      setConfirmedGameName,
      joinSeder,
      history
    } = this.props;
    this.setState({ joinButtonPressed: true });
    joinSeder(this.state.tentativeRoomCode, this.state.tentativeGameName).then(
      d => {
        this.setState({ joinSederResponse: d });
        if (d.status == 200) {
          setConfirmedRoomCode(d.data.roomCode);
          setConfirmedGameName(d.data.gameName);
          history.push('/you-have-joined');
        } else {
          this.setState({ failedAttempt: true });
          if (d.data.err == Configs.generic400ErrorMessage) {
            this.setState({
              failureMessage: this.joinSederCatchAllErrorMessage
            });
          } else {
            this.setState({ failureMessage: d.data.err });
          }
        }
        if (this._isMounted) this.setState({ joinButtonPressed: false });
      }
    );
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      classes,
      joinSeder,
      setConfirmedRoomCode,
      setConfirmedGameName
    } = this.props;

    return (
      <div madliberationid="enter-room-code-page">
        <MenuAppBar />
        <div>
          <br />
          <Typography variant="h3" gutterBottom>
            You're at a seder!
          </Typography>
          <br />
        </div>
        <div>
          <div>
            <Typography component="p" paragraph gutterBottom>
              Prove it. Enter the Room Code that your sedermaker gave you
              orally.
            </Typography>
          </div>
          <div>
            <TextField
              madliberationid="enter-room-code-text-field"
              helperText="6 letters"
              variant="outlined"
              onChange={this.enableJoinIfCodeValid}
            />
          </div>
          <br />
          <div>
            <Typography component="p" paragraph>
              Also, what is your game name?
            </Typography>
          </div>
          <div>
            <TextField
              madliberationid="game-name-text-field"
              helperText="it's who you are for this seder"
              variant="outlined"
              onChange={this.enableJoinIfNameGiven}
            />
          </div>
          <br />
          <div>
            <Button
              madliberationid="join-this-seder-button"
              color="primary"
              variant="contained"
              disabled={
                !this.state.tentativeRoomCode ||
                !this.state.tentativeGameName ||
                this.state.joinButtonPressed
              }
              onClick={this.joinSederClick}
            >
              Join
            </Button>
          </div>
          <div
            hidden={!this.state.failedAttempt || this.state.joinButtonPressed}
          >
            <Typography component="p" color="secondary">
              {this.state.failureMessage}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
const EnterRoomCodePageWithRouter = withRouter(EnterRoomCodePage);
export default withStyles(styles)(EnterRoomCodePageWithRouter);