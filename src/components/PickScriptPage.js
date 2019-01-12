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

class PickScriptPage extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <MenuAppBar user={user} />
        <div>
          <br />
          <h2>Which script would you like to use?</h2>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PickScriptPage);
