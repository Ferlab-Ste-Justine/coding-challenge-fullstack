import { ADD_ALL_COMMENTS, ADD_COMMENT } from '../constants/comments';

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      const { userName, id, avatar, isoDate, text } = action;

      return [{ userName, id, avatar, isoDate, text }, ...state];
    }
    case ADD_ALL_COMMENTS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};

export default commentReducer;
