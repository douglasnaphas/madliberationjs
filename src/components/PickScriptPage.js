import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class PickScriptPage extends Component {
  state = { isMounting: true };

  componentDidMount() {
    this._isMounted = true;
    const scriptsUrl = new URL('/scripts', Configs.apiUrl());
    fetch(scriptsUrl)
      .then(r => {
        this.setState({ isMounting: false });
        console.log(r);
        return r.json();
      })
      .then(j => {
        console.log(j);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes, user } = this.props;
    var spinnerOrScriptMenu;
    if (this.state.isMounting) {
      spinnerOrScriptMenu = <CircularProgress />;
    } else {
      spinnerOrScriptMenu = <p>table of scripts</p>;
    }

    return (
      <div madliberationid="pick-your-script-page">
        <MenuAppBar user={user} />
        <div>
          <br />
          <h2>Which script would you like to use?</h2>
        </div>
        <div>{spinnerOrScriptMenu}</div>
      </div>
    );
  }
}

export default withStyles(styles)(PickScriptPage);
