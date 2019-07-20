import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Logout from '../../components/logout';
import { logUserOut } from '../../redux/actions/user';
import { isUserLoggedIn } from '../../redux/selectors/user';

function LogOutContainer(props) {
  const { onLogOut } = props;
  function handleDisConnect() {
    onLogOut();
  }
  return <Logout handleDisConnect={handleDisConnect} />;
}

const mapStateToProps = state => {
  return { isConnected: isUserLoggedIn(state) };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: info => dispatch(logUserOut(info))
  };
};

LogOutContainer.propTypes = {
  onLogOut: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOutContainer);
