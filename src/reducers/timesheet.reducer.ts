import { timesheetConstants } from '../constants';

const initialState = {
	currentTimesheet: {}
};

export function timesheet(state = initialState, action) {
	switch (action.type) {
		case timesheetConstants.SET_CURRENT_TIMESHEET:
			return {
				...state,
				currentTimesheet: action.payload
			};
		default:
			return state
	}
}
