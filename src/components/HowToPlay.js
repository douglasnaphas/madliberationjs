import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class HowToPlay extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <MenuAppBar user={user} />
        <div>
          <br />
          <h1>How to Play</h1>
          <p>
            Mad Liberation is a game of seeking freedom through imagination and
            creativity
          </p>
          <br />
          <p>Do as you're told on each screen.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HowToPlay);
