import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import Typography from '@material-ui/core/Typography';
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
        <div madliberationid="about-page">
          <br />
          <Typography variant="h2" gutterBottom>
            About
          </Typography>
          <Typography variant="body2">
            Mad Liberation is a game of mad lib haggadahs.
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(About);
