import { timesheetServices } from '../services/timesheet.service'
import { timesheetConstants } from '../constants'

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

function setCurrentTimesheet(timesheet) {
	return {
		type: timesheetConstants.SET_CURRENT_TIMESHEET,
		payload: timesheet
	}
}

function updateTimeSheet(timesheet) {
	return async (dispatch, getState) => {
		const state = getState();
		const accessToken = state.auth.user.accessToken;
		try {
			const allTimesheet = await timesheetServices.updateTimesheet(timesheet, accessToken);
			return allTimesheet
		} catch (error) {
			throw error;
		}
	}
}

export const timesheetActions = {
	getAllTimesheet,
	setCurrentTimesheet,
	updateTimeSheet
}
