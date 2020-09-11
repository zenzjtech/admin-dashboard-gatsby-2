import { userConstants } from '../constants';

const initialState = {};

export function profile(state = initialState, action) {
	switch (action.type) {
		case userConstants.UPDATE_CURRENT_USER:
			return {
				...state,
				...action.payload
			};
		default:
			return state
	}
}
