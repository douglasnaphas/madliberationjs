import { madLiberationStyles } from '../madLiberationStyles';
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

class Lib extends Component {
  state = {};
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { lib } = this.props;
    return (
      <div>
        <div>
          <Typography variant="h5" gutterBottom>
            Enter a word or phrase to replace...
          </Typography>
          <Typography component="p" paragraph>
            <span style={madLiberationStyles.lightGrayBackround}>
              {lib ? lib.prompt : ''}
            </span>
          </Typography>
          <TextField variant="outlined" />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Lib);
