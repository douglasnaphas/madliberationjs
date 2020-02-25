import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
});

class ContactUs extends Component {
  render() {
    return (
      <div>
        <MenuAppBar />
        <div madliberationid="contact-us-page">
          <br />
          <Typography variant="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography component="p" paragraph gutterBottom>
            Email <a href="mailto:admin@passover.lol">admin@passover.lol</a>{' '}
            with any concerns.
          </Typography>
          <Typography component="p" paragraph gutterBottom>
            In particular, you can contact us if we sent you an email as part of
            our account verification process, and you did not intend to sign up.
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContactUs);
