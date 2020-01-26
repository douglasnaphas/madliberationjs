import React, { useEffect } from 'react';
import MenuAppBar from './MenuAppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Configs } from '../Configs';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
});

function LoggingInPage({ history, setUser, browserWindow }) {
  useEffect(() => {
    const idUrl = new URL('/id', Configs.apiUrl());
    fetch(idUrl, {
      method: 'GET',
      credentials: 'include'
    })
      .then(r => {
        return r.json();
      })
      .then(user => {
        setUser(user);
        const uri = browserWindow.location.toString();
        console.log(uri);
        if (uri.indexOf('?') > 0) {
          const clean_uri = uri.substring(0, uri.indexOf('?'));
          browserWindow.history.replaceState({}, document.title, clean_uri);
        }
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }, [history, setUser]);
  return (
    <>
      <MenuAppBar></MenuAppBar>
      <br />
      <div>
        <Typography variant="h4">Logging you in...</Typography>
      </div>
    </>
  );
}
export default withStyles(styles)(LoggingInPage);
