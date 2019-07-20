import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

const useStyles = makeStyles(() => ({
  inline: {
    display: 'inline'
  }
}));

export default function Comment(props) {
  const { userName, text, isoDate, avatar } = props;
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={userName}
        secondary={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {text}
            </Typography>
            <br />
            <TimeAgo date={isoDate} />
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

Comment.propTypes = {
  userName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isoDate: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};
