import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

export default function CommentInput(props) {
  const { text, handleChange, onAddCommentHandler } = props;
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="new-comment-textarea"
        label="Make a comment"
        placeholder="What do you have to say?"
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={text}
        onChange={handleChange}
      />
      <IconButton
        onClick={onAddCommentHandler}
        color="primary"
        className={classes.button}
        aria-label="Add"
      >
        <AddIcon />
      </IconButton>
    </form>
  );
}

CommentInput.defaultProps = {
  text: ''
};

CommentInput.propTypes = {
  text: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  onAddCommentHandler: PropTypes.func.isRequired
};
