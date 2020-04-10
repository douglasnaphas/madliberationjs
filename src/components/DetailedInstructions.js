import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => {
  return {
    bordered: {
      paddingRight: '20px',
      paddingLeft: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  };
};

class DetailedInstructions extends Component {
  render() {
    return (
      <div>
        <MenuAppBar />
        <div madliberationid="detailed-instructions-page">
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DetailedInstructions);
