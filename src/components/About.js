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
    const { classes } = this.props;

    return (
      <div>
        <MenuAppBar />
        <div madliberationid="about-page">
          <br />
          <Typography variant="h2" gutterBottom>
            About
          </Typography>
          <Typography component="p">
            Mad Liberation is a game of mad lib haggadahs.
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(About);
