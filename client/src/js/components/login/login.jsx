import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function Login(props) {
  const {
    handleClose,
    handleConnect,
    open,
    email,
    userName,
    handleChange,
    handleClickOpen
  } = props;

  const isEmailValid = validateEmail(email);

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit">
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your username and your email address.</DialogContentText>
          <TextField
            value={userName}
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            onChange={handleChange('userName')}
            error={!userName}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleChange('email')}
            error={!isEmailValid}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={!userName || !isEmailValid} onClick={handleConnect} color="primary">
            Connect
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Login.defaultProps = {
  email: '',
  userName: ''
};

Login.propTypes = {
  handleConnect: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  email: PropTypes.string,
  userName: PropTypes.string,
  handleClickOpen: PropTypes.func.isRequired
};
