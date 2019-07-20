import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comments from '../../components/comments';
import { selectAllComments } from '../../redux/selectors/comments';

const sortCommentsByDate = comments =>
  comments
    .sort((a, b) => {
      if (a.isoDate < b.isoDate) {
        return -1;
      }
      return a.isoDate > b.isoDate ? 1 : 0;
    })
    .reverse();

function CommentsContainer(props) {
  const { comments } = props;
  return <Comments comments={sortCommentsByDate(comments)} />;
}

const mapStateToProps = state => {
  return { comments: selectAllComments(state) };
};

const mapDispatchToProps = () => {
  return {};
};

CommentsContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
