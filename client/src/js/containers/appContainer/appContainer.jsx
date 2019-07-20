import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import App from '../../components/app';
import { webSocketConnect } from '../../redux/actions/websocket';
import { selectHasInitComments } from '../../redux/selectors/app';
import { initCommentsFetch } from '../../redux/actions/app';

function AppContainer(props) {
  const { initWebSocketConnection, hasInitCommentsFetch, initCommentsFetching } = props;
  const initFetch = true;

  useEffect(() => {
    if (!hasInitCommentsFetch) {
      initCommentsFetching(initFetch);
      initWebSocketConnection(undefined, initFetch);
    }
  });

  return <App />;
}

const mapStateToProps = state => {
  return { hasInitCommentsFetch: selectHasInitComments(state) };
};

const mapDispatchToProps = dispatch => {
  return {
    initWebSocketConnection: (url, initCommentsRetrieval) =>
      dispatch(webSocketConnect(url, initCommentsRetrieval)),

    initCommentsFetching: init => dispatch(initCommentsFetch(init))
  };
};

AppContainer.propTypes = {
  initWebSocketConnection: PropTypes.func.isRequired,
  hasInitCommentsFetch: PropTypes.bool.isRequired,
  initCommentsFetching: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
