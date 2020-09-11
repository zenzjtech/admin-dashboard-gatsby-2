const apiUrl = 'https://bcf8e.l.dedikuoti.lt/api'
import { handleResponse } from './helper';

function getAllTimesheet(userId, accessToken) {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
	};

	return fetch(`${apiUrl}/timesheet/user/${userId}/get`, requestOptions)
		.then(handleResponse)
		.then(data => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			// typeof window !== "undefined" && localStorage.setItem(userConstants.KEY_USER, JSON.stringify(data.token));
			return data;
		});
}

export const timesheetServices = {
	getAllTimesheet
};
