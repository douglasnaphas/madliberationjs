import MenuAppBar from './MenuAppBar';
import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});
class DoneNotReadingPage extends React.Component {
  render() {
    const { confirmedRoomCode, confirmedGameName } = this.props;
    return (
      <div madliberationid="done-not-reading-page">
        <MenuAppBar
          confirmedRoomCode={confirmedRoomCode}
          confirmedGameName={confirmedGameName}
        />
        <br />
        <div>
          <Typography variant="h4" gutterBottom>
            Happy Passover!
          </Typography>
        </div>
        <div>
          <Typography component="p" paragraph>
            Enjoy the haggadah that you and your friends and family have made
            together.
          </Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(DoneNotReadingPage);
