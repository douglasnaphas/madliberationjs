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

class YesSubmitLibsButton extends React.Component {
  render() {
    const { history, submitLibsAndGoToSubmittedPage, disabled } = this.props;
    const yesSubmitLibsClick = event => {
      submitLibsAndGoToSubmittedPage(history);
    };

    return (
      <div>
        <Button
          madliberationid="yes-submit-libs-buttons"
          disabled={this.props.disabled}
          onClick={yesSubmitLibsClick}
        >
          Yes, submit
        </Button>
      </div>
    );
  }
}
const YesSubmitLibsButtonWithRouter = withRouter(YesSubmitLibsButton);
export default withStyles(styles)(YesSubmitLibsButtonWithRouter);
