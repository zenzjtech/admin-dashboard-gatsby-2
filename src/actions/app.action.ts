import { appConstants } from '../constants';

function showError(errorMessage) {
	return { type: appConstants.ACTION_ERROR_OCCURS, payload: errorMessage };
}

function clearError() {
	return { type: appConstants.ACTION_CLEAR_ERRORS }
}

export const appActions = {
	showError,
	clearError
};
