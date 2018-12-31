import React, { Component } from 'react';
import { Configs } from '../Configs';
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

class About extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <MenuAppBar user={user} />
        <div>
          <br />
          <h1>About</h1>
          <p>Mad Liberation is a game of mad lib haggadahs.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(About);
