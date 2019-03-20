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

class PlayPage extends Component {
  state = {
    fetchingPrompts: true,
    assignmentsData: [],
    libIndex: 0,
    dialogOpen: false
  };
  _isMounted = false;
  fetchAssignments = () => {
    const { confirmedRoomCode, confirmedGameName, assignments } = this.props;
    if (this._isMounted) this.setState({ fetchingPrompts: true });
    assignments(confirmedRoomCode, confirmedGameName).then(d => {
      if (d.status === 200) {
        if (this._isMounted) {
          this.setState({
            fetchingPrompts: false,
            assignmentsData: d.data
          });
        }
      }
    });
  };
  incrementLibIndex = () => {
    if (this._isMounted && this.state.assignmentsData.length > 0) {
      this.setState({
        libIndex: (this.state.libIndex + 1) % this.state.assignmentsData.length
      });
    }
  };
  decrementLibIndex = () => {
    if (this._isMounted) {
      if (this.state.libIndex == 0) {
        this.setState({ libIndex: this.state.assignmentsData.length - 1 });
      } else {
        this.setState({ libIndex: this.state.libIndex - 1 });
      }
    }
  };
  submitAllClick = event => {
    this.setState({ dialogOpen: true });
  };
  onDialogClose = event => {
    this.setState({ dialogOpen: false });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchAssignments();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { confirmedRoomCode, confirmedGameName, answers } = this.props;
    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <div hidden={!this.state.fetchingPrompts}>
          <Typography variant="h4" gutterBottom>
            Fetching your prompts, they'll be ready promptly...
          </Typography>
          <br />
          <CircularProgress />
        </div>
        <div
          hidden={
            this.state.fetchingPrompts ||
            !this.state.assignmentsData ||
            !Array.isArray(this.state.assignmentsData) ||
            this.state.assignmentsData < 1
          }
        >
          <div>
            <Lib
              lib={this.state.assignmentsData[this.state.libIndex]}
              libIndex={this.state.libIndex}
              libCount={this.state.assignmentsData.length}
              incrementLibIndex={this.incrementLibIndex}
              decrementLibIndex={this.decrementLibIndex}
            />
          </div>
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={this.submitAllClick}
              aria-labelledby="submit-your-answers-dialog"
              aria-describedby="submit-your-answers-dialog-description"
            >
              Submit all of these
            </Button>
            <Dialog open={this.state.dialogOpen} onClose={this.onDialogClose}>
              <DialogTitle id="submit-your-answers-dialog">
                Submit your answers?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="submit-your-answers-dialog-description">
                  You have {this.state.assignmentsData.length - answers.length}{' '}
                  unanswered prompts
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onDialogClose}>Cancel</Button>
                <Button>Yes, submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PlayPage);
