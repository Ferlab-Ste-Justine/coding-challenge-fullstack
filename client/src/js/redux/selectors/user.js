function isUserLoggedIn(state) {
  return !!state.user.email && !!state.user.userName;
}

function selectUserName(state) {
  return state.user.userName;
}

export { isUserLoggedIn, selectUserName };
