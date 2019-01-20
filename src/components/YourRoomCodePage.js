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

class YourRoomCodePage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div madliberationid="your-room-code-page">
        <MenuAppBar user={user} />
        <div>
          <br />
          <h2>This is your Room Code</h2>
          <br />
          <p>Tell the world.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(YourRoomCodePage);
