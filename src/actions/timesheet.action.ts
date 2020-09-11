import { timesheetServices } from '../services/timesheet.service'

function getAllTimesheet() {
	return async (dispatch, getState) => {
		const state = getState();
		const userId = state.profile.login.id;
		const accessToken = state.auth.user.accessToken;
		try {
			const allTimesheet = await timesheetServices.getAllTimesheet(userId, accessToken);
			return allTimesheet
		} catch (error) {
			throw error;
		}
	}
}

export const timesheetActions = {
	getAllTimesheet
}
