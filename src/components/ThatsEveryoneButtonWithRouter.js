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

class ThatsEveryoneButton extends React.Component {
  render() {
    const { history, closeSederAndPlay, disabled } = this.props;
    const thatsEveryoneClick = event => {
      closeSederAndPlay(history);
    };

    return (
      <div>
        <Button
          madliberationid="thats-everyone-button"
          variant="contained"
          disabled={this.props.disabled}
          onClick={thatsEveryoneClick}
        >
          That's everyone
        </Button>
      </div>
    );
  }
}
const ThatsEveryoneButtonWithRouter = withRouter(ThatsEveryoneButton);
export default withStyles(styles)(ThatsEveryoneButtonWithRouter);
