// const apiUrl = process.env.GATSBY_API_URL;
const apiUrl = 'https://bcf8e.l.dedikuoti.lt/api'

export const userService = {
  login,
  logout
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

function logout() {

}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
