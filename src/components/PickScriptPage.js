import CircularProgress from '@material-ui/core/CircularProgress';
import { Configs } from '../Configs';
import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar';
import { scripts2table } from '../lib/scripts2table';
import ScriptTable from './ScriptTable';
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
        console.log(r);
        return r.json();
      })
      .then(j => {
        console.log(j);
        this.setState({ scripts: j.scripts.Items });
        this.setState({ isMounting: false });
        scripts2table();
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
      spinnerOrScriptMenu = <ScriptTable scripts={this.state.scripts} />;
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
