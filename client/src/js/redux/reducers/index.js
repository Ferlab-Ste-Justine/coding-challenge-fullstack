import { combineReducers } from 'redux';
import webSocketReducer from './websocket';
import commentReducer from './comments';
import userReducer from './user';
import appReducer from './app';

export default combineReducers({
  comments: commentReducer,
  webSocketReducer,
  user: userReducer,
  hasInitCommentsFetch: appReducer
});
