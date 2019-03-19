import { madLiberationStyles } from '../madLiberationStyles';
import MenuAppBar from './MenuAppBar';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => madLiberationStyles;

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
    const { lib, classes } = this.props;
    return (
      <div>
        <div>
          <Typography variant="h5" gutterBottom>
            Enter a word or phrase to replace...
          </Typography>
          <Typography component="p" paragraph>
            <Paper component="span" className={classes.paperPadding}>
              {lib ? lib.prompt : ''}
            </Paper>
          </Typography>
          <TextField variant="outlined" fullWidth />
          {lib && lib.sentence ? (
            <div>
              <br />
              <Typography component="span">
                Your answer should complete the sentence:{' '}
                <span className={classes.blue}>
                  {lib.sentence.replace(/_/, '__')}
                </span>
              </Typography>
            </div>
          ) : (
            ''
          )}
          {lib && lib.example ? (
            <div>
              <br />
              <Typography component="span">
                For example, you could write:{' '}
                <span className={classes.blue}>{lib.example}</span>
              </Typography>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Lib);
