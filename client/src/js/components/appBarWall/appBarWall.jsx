import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import LoginContainer from '../../containers/loginContainer';
import LogoutContainer from '../../containers/logoutContainer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function AppBarWall(props) {
  const { isUserConnected } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Wall
          </Typography>
          {isUserConnected ? <LogoutContainer /> : <LoginContainer />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBarWall.propTypes = {
  isUserConnected: PropTypes.bool.isRequired
};
