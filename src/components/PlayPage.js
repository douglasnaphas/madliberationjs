import CircularProgress from '@material-ui/core/CircularProgress';
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
  state = { fetchingPrompts: true, assignmentsData: [], libIndex: 0 };
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
  componentDidMount() {
    this._isMounted = true;
    this.fetchAssignments();
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
          <Lib
            lib={this.state.assignmentsData[this.state.libIndex]}
            libIndex={this.state.libIndex}
            libCount={this.state.assignmentsData.length}
            incrementLibIndex={this.incrementLibIndex}
            decrementLibIndex={this.decrementLibIndex}
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PlayPage);
