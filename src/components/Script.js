import CircularProgress from '@material-ui/core/CircularProgress';
import Page from './Page';
import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});
class Script extends React.Component {
  constructor(props) {
    super(props);
    const { setConfirmedRoomCode, setConfirmedGameName } = props;
    let { script, confirmedRoomCode, confirmedGameName } = props;

    this.state = {
      fetchingScript: false,
      script: false,
      pageIndex: 0
    };
  }
  _isMounted = false;
  getScript = (roomCode, gameName) => {
    const { script } = this.props;
    if (this._isMounted) this.setState({ fetchingScript: true });
    script(roomCode, gameName).then(d => {
      if (!this._isMounted) return;
      if (d.status === 200) {
        this.setState({ script: d.data });
      }
      this.setState({ fetchingScript: false });
    });
  };
  incrementPageIndex = () => {
    if (this._isMounted) {
      this.setState({ pageIndex: this.state.pageIndex + 1 });
    }
  };
  componentDidMount() {
    this._isMounted = true;
    const { confirmedRoomCode, confirmedGameName } = this.props;
    this.getScript(confirmedRoomCode, confirmedGameName);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.fetchingScript) {
      return <CircularProgress />;
    }
    if (this.state.script) {
      if (
        !Array.isArray(this.state.script.pages) ||
        this.state.pageIndex >= this.state.script.pages.length
      ) {
        return (
          <div>
            <div>
              <Typography variant="h4" gutterBottom>
                The seder has ended successfully
              </Typography>
            </div>
            <br />
            <div>
              <Typography paragraph>לשנה הבאה בירושלים</Typography>
              <Typography paragraph>Next year in Jerusalem!</Typography>
            </div>
          </div>
        );
      }

      return (
        <Page
          page={this.state.script.pages[this.state.pageIndex]}
          incrementPageIndex={this.incrementPageIndex}
          pageIndex={this.state.pageIndex}
        />
      );
    }
    return <div />;
  }
}
export default withStyles(styles)(Script);
