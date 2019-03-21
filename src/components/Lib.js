import IconButton from '@material-ui/core/IconButton';
import { madLiberationStyles } from '../madLiberationStyles';
import MenuAppBar from './MenuAppBar';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => madLiberationStyles;

class Lib extends Component {
  state = {};
  _isMounted = false;
  onAnswerChange = event => {
    const { setAnswer, libIndex } = this.props;
    setAnswer(event.target.value, libIndex);
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      lib,
      classes,
      libIndex,
      libCount,
      incrementLibIndex,
      decrementLibIndex
    } = this.props;
    return (
      <div>
        <div>
          <Typography component="p" paragraph gutterBottom>
            Enter a word or phrase to replace...
          </Typography>
          <div>
            <Paper className={classes.paper}>
              <Typography variant="h5">{lib ? lib.prompt : ''}</Typography>
            </Paper>
          </div>
          <br />
          <TextField
            variant="outlined"
            fullWidth
            onChange={this.onAnswerChange}
          />
          {lib && lib.sentence ? (
            <div>
              <br />
              <Typography component="span">
                Your answer should complete the sentence:{' '}
                <span className={classes.blueItalic}>
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
                <span className={classes.blueItalic}>{lib.example}</span>
              </Typography>
            </div>
          ) : (
            ''
          )}
        </div>
        <br />
        <div>
          <IconButton>
            <NavigateBefore onClick={decrementLibIndex} />
          </IconButton>
          {libIndex + 1} / {libCount}
          <IconButton>
            <NavigateNext onClick={incrementLibIndex} />
          </IconButton>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Lib);
