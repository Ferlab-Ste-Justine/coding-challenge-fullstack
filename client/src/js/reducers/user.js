import { UPDATE_USER, RESET_USER } from '../actions/user';

const initialState = {
  username: '',
  authenticated: false,
  connected: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.update
      };

    case RESET_USER:
      return {
        ...initialState,
        connected: true
      };

    default:
      return state;
  }
};

export default user;
