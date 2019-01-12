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

class EnterRoomCodePage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <MenuAppBar user={user} />
        <div>
          <br />
          <h2>You're at a seder!</h2>
          <br />
          <p>
            Prove it. Enter the Room Code that your sedermaker gave you orally.
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EnterRoomCodePage);
