import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Comment from '../comment/comment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Comments(props) {
  const classes = useStyles();
  const { comments } = props;

  if (!Array.isArray(comments) || comments.length === 0) {
    return <div>No comment to display</div>;
  }

  const commentsLength = comments.length;
  const lastIndex = commentsLength - 1;

  return (
    <List className={classes.root}>
      {comments.map((commentData, index) => {
        const { userName, text, isoDate, avatar, id } = commentData;
        return (
          <React.Fragment key={`${id}-fragment`}>
            <Comment key={id} userName={userName} text={text} isoDate={isoDate} avatar={avatar} />
            {index !== lastIndex && (
              <Divider key={`${id}-divider`} variant="inset" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};
