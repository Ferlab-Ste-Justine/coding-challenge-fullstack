import { ADD_COMMENT } from '../constants/comments';

const addComment = (comment = {}) => {
  const { userName, id, avatar, isoDate, text } = comment;

  return {
    type: ADD_COMMENT,
    userName,
    id,
    avatar,
    isoDate,
    text
  };
};

export { addComment };
