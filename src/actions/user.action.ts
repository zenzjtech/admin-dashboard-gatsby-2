import { userConstants } from '../constants'
import { userService} from "../services"
import { navigate } from "@reach/router"

function login(email, password) {
  return async dispatch => {
    dispatch(request({ email }));
    try {
      const data = await userService.login(email, password);
      dispatch(success(data));
      return data;
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function refreshToken(refreshToken) {
  return async dispatch => {
    try {
      const user = await userService.refreshToken(refreshToken)
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        user
      })
      return user
    } catch (error) {
      dispatch({
        type: userConstants.LOGIN_FAILURE,
        error
      })
      throw error;
    }
  }
}

function logout() {
  navigate('/login')
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout,
  refreshToken
}
