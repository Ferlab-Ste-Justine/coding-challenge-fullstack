import { INIT_COMMENTS_FETCH } from '../constants/app';

const initCommentsFetch = (initFetch = false) => {
  return {
    type: INIT_COMMENTS_FETCH,
    initFetch
  };
};

export { initCommentsFetch };
