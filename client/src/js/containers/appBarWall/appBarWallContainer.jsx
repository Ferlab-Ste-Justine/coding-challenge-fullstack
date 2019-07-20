import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import AppBarWall from '../../components/appBarWall';
import { isUserLoggedIn } from '../../redux/selectors/user';

function appBarWallContainer(props) {
  const { isUserConnected } = props;
  return <AppBarWall isUserConnected={isUserConnected} />;
}

appBarWallContainer.propTypes = {
  isUserConnected: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { isUserConnected: isUserLoggedIn(state) };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(appBarWallContainer);
