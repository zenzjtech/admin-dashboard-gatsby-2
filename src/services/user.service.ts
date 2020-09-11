// const apiUrl = process.env.GATSBY_API_URL;
const apiUrl = 'https://bcf8e.l.dedikuoti.lt/api'
import { handleResponse } from './helper';

export const userService = {
  login,
  logout,
  refreshToken,
  getCurrentUser
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${apiUrl}/auth/login`, requestOptions)
      .then(handleResponse)
      .then(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // typeof window !== "undefined" && localStorage.setItem(userConstants.KEY_USER, JSON.stringify(data.token));
        return data;
      });
}

function refreshToken(refreshToken) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`
    },
  }

  return fetch(`${apiUrl}/auth/refreshToken`, requestOptions)
      .then(handleResponse);
}

function getCurrentUser(accessToken) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  }

  return fetch(`${apiUrl}/profile/abaut/me`, requestOptions)
      .then(handleResponse);
}

function logout() {

}


