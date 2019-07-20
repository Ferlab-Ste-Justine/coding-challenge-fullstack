import { LOGIN_USER, LOGOUT_USER } from '../constants/user';

const userReducer = (state = { userName: '', email: '' }, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      const { userName, email } = action;

      return { userName, email };
    }
    case LOGOUT_USER: {
      return { userName: '', email: '' };
    }
    default:
      return state;
  }
};

export default userReducer;
