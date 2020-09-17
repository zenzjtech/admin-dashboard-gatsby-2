import{ appConstants } from '../constants';

const initialState = { errorMessage: '', loading: false };

export const app = (state = initialState, action) => {
	switch (action.type) {
		case appConstants.ACTION_ERROR_OCCURS:
			return {
				...state,
				errorMessage: action.payload
			};
		case appConstants.ACTION_CLEAR_ERRORS:
			return {
				...state,
				errorMessage: ''
			};
		default:
			return state;
	}
}
