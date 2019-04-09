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
  constructor(props) {
    super(props);
    const {
      setConfirmedRoomCode,
      setConfirmedGameName,
      setAssignmentsData
    } = props;
    let { confirmedRoomCode, confirmedGameName, assignmentsData } = props;
    if (confirmedRoomCode && confirmedGameName && assignmentsData) {
      localStorage.removeItem('libIndex');
      localStorage.removeItem('answers');
    }
    if (
      !confirmedRoomCode &&
      !confirmedGameName &&
      !assignmentsData &&
      localStorage.getItem('roomCode') &&
      localStorage.getItem('gameName') &&
      localStorage.getItem('assignmentsData')
    ) {
      confirmedRoomCode = localStorage.getItem('roomCode');
      setConfirmedRoomCode(confirmedRoomCode);
      confirmedGameName = localStorage.getItem('gameName');
      setConfirmedGameName(confirmedGameName);
      assignmentsData = JSON.parse(localStorage.getItem('assignmentsData'));
      setAssignmentsData(assignmentsData);
    }
    const answers =
      (localStorage.getItem('libIndex') &&
        JSON.parse(localStorage.getItem('answers'))) ||
      assignmentsData.map(a => {
        return { id: a.id };
      });
    this.state = {
      libIndex: parseInt(localStorage.getItem('libIndex')) || 0,
      dialogOpen: false,
      answers: answers,
      submitButtonPressed: false,
      failedSubmitAttempt: false,
      confirmedRoomCode: confirmedRoomCode,
      confirmedGameName: confirmedGameName
    };
  }
  _isMounted = false;
  persistState = () => {
    localStorage.setItem('libIndex', this.state.libIndex);
    if (Array.isArray(this.state.answers) && this.state.answers.length > 0) {
      localStorage.setItem('answers', JSON.stringify(this.state.answers));
    }
  };
  incrementLibIndex = () => {
    if (this._isMounted && this.state.answers.length > 0) {
      this.setState({
        libIndex: (this.state.libIndex + 1) % this.state.answers.length
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
  }
  componentWillUnmount() {
    this.persistState();
    window.removeEventListener('beforeunload', this.persistState);
    this._isMounted = false;
  }

  render() {
    const {
      confirmedRoomCode,
      confirmedGameName,
      assignmentsData
    } = this.props;
    return (
      <div>
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <div>
          <div>
            <Lib
              lib={assignmentsData[this.state.libIndex]}
              libIndex={this.state.libIndex}
              libCount={assignmentsData.length}
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
