import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    leftAnchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLeftMenu = event => {
    this.setState({ leftAnchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeftClose = () => {
    this.setState({ leftAnchorEl: null });
  };

  render() {
    const { user, classes } = this.props;
    const { anchorEl, leftAnchorEl } = this.state;
    const open = Boolean(anchorEl);
    const leftOpen = Boolean(leftAnchorEl);
    const leftMenu = (
      <Menu
        id="leftMenu"
        anchorEl={leftAnchorEl}
        open={leftOpen}
        onClose={this.handleLeftClose}
      >
        <MenuItem onClick={this.handleLeftClose}>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem onClick={this.handleLeftClose}>
          <Link to="/about">About</Link>
        </MenuItem>
        <MenuItem onClick={this.handleLeftClose}>
          <Link to="/how-to-play">How to play</Link>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon onClick={this.handleLeftMenu} />
              {leftMenu}
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Mad Liberation
            </Typography>
            {user && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                {user.nickname}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <br />
        <br />
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
