import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/login';
import { logUserIn } from '../../redux/actions/user';
import { isUserLoggedIn } from '../../redux/selectors/user';

function LoginContainer(props) {
  const { onLogIn } = props;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    userName: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleConnect() {
    onLogIn({ userName: values.userName, email: values.email });
  }

  return (
    <Login
      open={open}
      handleClose={handleClose}
      handleConnect={handleConnect}
      handleClickOpen={handleClickOpen}
      handleChange={handleChange}
      email={values.email}
      userName={values.userName}
    />
  );
}

const mapStateToProps = state => {
  return { isConnected: isUserLoggedIn(state) };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: info => dispatch(logUserIn(info))
  };
};

LoginContainer.propTypes = {
  onLogIn: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
