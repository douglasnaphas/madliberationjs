import Button from '@material-ui/core/Button';
import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class GetLibsAndPlayButton extends React.Component {
  render() {
    const { history, getLibsAndPlay, disabled } = this.props;
    const clickThisButtonClick = event => {
      getLibsAndPlay(history);
    };

    return (
      <div>
        <Button
          madliberationid="click-this-buttons"
          disabled={this.props.disabled}
          onClick={clickThisButtonClick}
        >
          click this button
        </Button>
      </div>
    );
  }
}
const GetLibsAndPlayButtonWithRouter = withRouter(GetLibsAndPlayButton);
export default withStyles(styles)(GetLibsAndPlayButtonWithRouter);
