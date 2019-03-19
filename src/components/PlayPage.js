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
  state = { fetchingPrompts: true, assignmentsData: [] };
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
  componentDidMount() {
    this._isMounted = true;
    this.fetchAssignments();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // increment lib method
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
        </div>
        <div hidden={this.state.fetchingPrompts && this.state.assignmentsData}>
          <Lib lib={this.state.assignmentsData[0]} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PlayPage);
