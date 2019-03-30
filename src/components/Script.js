import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});
class Script extends React.Component {
  state = {
    fetchingScript: false,
    script: false
  };
  _isMounted = false;
  getScript = () => {
    const { confirmedRoomCode, confirmedGameName, script } = this.props;
    if (this._isMounted) this.setState({ fetchingScript: true });
    script(confirmedRoomCode, confirmedGameName).then(d => {
      if (!this._isMounted) return;
      if (d.status === 200) {
        this.setState({ script: d.data });
      }
      this.setState({ fetchingScript: false });
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.getScript();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (this.state.fetchingScript) {
      return <CircularProgress />;
    }
    return <div>Script fetched</div>;
  }
}
export default withStyles(styles)(Script);
