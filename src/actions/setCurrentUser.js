export const setCurrentUser = (token) => dispatch => {
  dispatch({
    type: 'SET_CURRENT_USER',
    payload: token
  })
}
