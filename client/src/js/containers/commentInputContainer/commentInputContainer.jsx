import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { ADD_COMMENT_REQUEST } from '../../appConstants';
import CommentInput from '../../components/commentInput/commentInput';
import { addComment } from '../../redux/actions/comments';
import { webSocketSendMessage } from '../../redux/actions/websocket';
import { isUserLoggedIn, selectUserName } from '../../redux/selectors/user';

function CommentInputContainer(props) {
  const [text, setText] = useState('');

  const { isConnected, onAddComment, onAddCommentToServer, userName } = props;

  const handleChange = event => {
    setText(event.target.value);
  };

  const onAddCommentHandler = () => {
    const comm = {
      userName,
      id: uuidv4(),
      avatar: 'https://via.placeholder.com/40',
      isoDate: new Date().toISOString(),
      text
    };
    onAddComment({ ...comm });
    onAddCommentToServer({ request: ADD_COMMENT_REQUEST, message: { ...comm } });
    setText('');
  };

  return isConnected ? (
    <CommentInput
      text={text}
      handleChange={handleChange}
      onAddCommentHandler={onAddCommentHandler}
    />
  ) : null;
}

CommentInputContainer.defaultProps = {
  isConnected: false
};

CommentInputContainer.propTypes = {
  isConnected: PropTypes.bool
};

const mapStateToProps = state => {
  return { isConnected: isUserLoggedIn(state), userName: selectUserName(state) };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: comment => dispatch(addComment(comment)),
    onAddCommentToServer: message => dispatch(webSocketSendMessage(message))
  };
};

CommentInputContainer.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  onAddCommentToServer: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer);
