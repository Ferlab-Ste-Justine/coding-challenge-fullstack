import { INIT_COMMENTS_FETCH } from '../constants/app';

const appReducer = (state = false, action) => {
  switch (action.type) {
    case INIT_COMMENTS_FETCH:
      return action.initFetch;
    default:
      return state;
  }
};

export default appReducer;
