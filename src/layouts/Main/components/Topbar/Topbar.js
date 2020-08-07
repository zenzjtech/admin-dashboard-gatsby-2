import React, { useState } from 'react';
import { connect } from 'react-redux'
import { userActions} from '../../../../actions'
import { Link } from 'gatsby'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Tooltip, Zoom } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import logo from '../../../../assets/logos/logo--white.svg';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  
  const classes = useStyles();
  
  const [notifications] = useState([]);
  
  return (
      <AppBar
          {...rest}
          className={clsx(classes.root, className)}
      >
        <Toolbar>
          <Link to="/">
            <img
                alt="Logo"
                src={logo}
            />
          </Link>
          <div className={classes.flexGrow} />
          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                  badgeContent={notifications.length}
                  color="primary"
                  variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Click here to logout" TransitionComponent={Zoom}>
              <IconButton
                  className={classes.signOutButton}
                  onClick={() => props.logout()}
                  color="inherit"
              >
                <InputIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden lgUp>
            <IconButton
                color="inherit"
                onClick={onSidebarOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Topbar);
