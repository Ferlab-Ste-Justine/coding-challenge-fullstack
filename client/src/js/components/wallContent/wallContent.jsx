import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CommentsContainer from '../../containers/comments';
import CommentInputContainer from '../../containers/commentInputContainer';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function WallContent() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CommentInputContainer />
      <CommentsContainer />
    </div>
  );
}
