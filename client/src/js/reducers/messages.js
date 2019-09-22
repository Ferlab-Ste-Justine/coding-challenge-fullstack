import { UPDATE_MESSAGES } from '../actions/messages';

const initalMessageState = {};

const messages = (state = initalMessageState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES:
      return {
        ...action.messages
      };

    default:
      return state;
  }
}

export default messages;
