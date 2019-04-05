import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lib from './Lib';
import { Link } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import YesSubmitLibsButtonWithRouter from './YesSubmitLibsButtonWithRouter';

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
    failedFetch: false,
    assignmentsData: [],
    libIndex: 0,
    dialogOpen: false,
    answers: [],
    submitButtonPressed: false,
    failedSubmitAttempt: false
  };
  _isMounted = false;
  persistState = () => {
    if (this.state.assignmentsData) {
      localStorage.setItem(
        'assignmentsData',
        JSON.stringify(this.state.assignmentsData)
      );
    }
    localStorage.setItem('libIndex', this.state.libIndex);
    if (Array.isArray(this.state.answers) && this.state.answers.length > 0) {
      localStorage.setItem('answers', JSON.stringify(this.state.answers));
    }
  };
  fetchAssignments = () => {
    const { confirmedRoomCode, confirmedGameName, assignments } = this.props;
    if (this._isMounted) this.setState({ fetchingPrompts: true });
    assignments(confirmedRoomCode, confirmedGameName).then(d => {
      if (d.status === 200) {
        if (this._isMounted && Array.isArray(d.data)) {
          this.setState({
            fetchingPrompts: false,
            failedFetch: false,
            assignmentsData: d.data,
            answers: d.data.map(a => {
              return { id: a.id };
            })
          });
        }
      } else {
        if (this._isMounted) {
          this.setState({ fetchingPrompts: false, failedFetch: true });
        }
      }
    });
  };
  tryAgainClick = () => {
    this.fetchAssignments();
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
    if (this._isMounted) this.setState({ dialogOpen: true });
  };
  onDialogClose = event => {
    if (this._isMounted) this.setState({ dialogOpen: false });
  };
  setAnswer = (answer, index) => {
    if (this._isMounted) {
      this.setState(state => {
        const newAnswers = state.answers.map((a, i) => {
          if (i === index) {
            return { answer: answer, id: a.id };
          } else {
            return a;
          }
        });
        return {
          answers: newAnswers
        };
      });
    }
  };
  unansweredPrompts = () => {
    return this.state.answers.reduce((acc, curr) => {
      if (curr.answer && curr.answer.length > 0) {
        return acc - 1;
      }
      return acc;
    }, this.state.answers.length);
  };
  submitLibsAndGoToSubmittedPage = history => {
    const { confirmedRoomCode, confirmedGameName, submitLibs } = this.props;
    if (this._isMounted) this.setState({ submitButtonPressed: true });
    submitLibs(confirmedRoomCode, confirmedGameName, this.state.answers).then(
      d => {
        if (!this._isMounted) return;
        if (d.status === 200) {
          history.push('/submitted');
          return;
        }
        this.setState({
          submitButtonPressed: false,
          failedSubmitAttempt: true,
          dialogOpen: false
        });
      }
    );
  };
  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('beforeunload', this.persistState);
    this.fetchAssignments();
  }
  componentWillUnmount() {
    this.persistState();
    window.removeEventListener('beforeunload', this.persistState);
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
        <div hidden={!this.state.fetchingPrompts}>
          <Typography variant="h4" gutterBottom>
            Fetching your prompts, they'll be ready promptly...
          </Typography>
          <br />
          <CircularProgress />
        </div>
        <div hidden={!this.state.failedFetch}>
          <Typography component="p" color="secondary" gutterBottom>
            Well actually, fetching your prompts failed. Make sure the person
            who started this virtual seder really wants you to click this
            button, then try to
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.tryAgainClick}
            >
              click this button
            </Button>
          </div>
          <div>
            <Typography component="p" color="secondary">
              again to get your assignments.
            </Typography>
          </div>
        </div>
        <div
          hidden={
            this.state.fetchingPrompts ||
            this.state.failedFetch ||
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
              setAnswer={this.setAnswer}
              answer={this.state.answers[this.state.libIndex]}
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
                  You have {this.unansweredPrompts()} unanswered prompts
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={this.state.submitButtonPressed}
                  onClick={this.onDialogClose}
                >
                  Cancel
                </Button>
                <YesSubmitLibsButtonWithRouter
                  submitLibsAndGoToSubmittedPage={
                    this.submitLibsAndGoToSubmittedPage
                  }
                  disabled={this.state.submitButtonPressed}
                />
              </DialogActions>
            </Dialog>
            <div
              hidden={
                !this.state.failedSubmitAttempt ||
                this.state.submitButtonPressed
              }
            >
              <Typography component="p" color="secondary">
                Couldn't submit your answers, please try again.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PlayPage);
