import { userConstants } from '../constants'
import { userService} from "../services"

function getCurrentUser() {
	return async (dispatch, getState) => {
		const state = getState();
		try {
			const profile = await userService.getCurrentUser(state.auth.user.accessToken);
			dispatch(success(profile));
			return profile;
		} catch (error) {
			throw error;
		}
	};

	function success(payload) { return { type: userConstants.UPDATE_CURRENT_USER, payload } }
}


export const profileActions = {
	getCurrentUser
}
