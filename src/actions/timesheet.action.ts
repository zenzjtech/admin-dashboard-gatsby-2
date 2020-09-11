import { timesheetConstants } from '../constants';

async function getAllTimesheet() {
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
