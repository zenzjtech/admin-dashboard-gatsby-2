import { userConstants } from '../constants';

const initialState = {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state
  }
}
