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
			return data;
		});
}

function updateTimesheet(timesheet, accessToken) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify(timesheet)
	};

	return fetch(`${apiUrl}/timesheet/month/update`, requestOptions)
		.then(handleResponse)
		.then(data => {
			return data;
		});
}

export const timesheetServices = {
	getAllTimesheet,
	updateTimesheet
};
