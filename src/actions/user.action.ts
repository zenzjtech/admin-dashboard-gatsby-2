import { userConstants } from '../constants'
import { userService} from "../services"
import { navigate } from "@reach/router"

function login(email, password) {
  return async dispatch => {
    dispatch(request({ email }));
    try {
      const data = await userService.login(email, password);
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout
}
