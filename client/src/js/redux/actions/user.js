import { LOGIN_USER, LOGOUT_USER } from '../constants/user';

const logUserIn = (user = {}) => {
  const { userName, email } = user;

  return {
    type: LOGIN_USER,
    email,
    userName
  };
};

const logUserOut = () => {
  return {
    type: LOGOUT_USER
  };
};

export { logUserIn, logUserOut };
