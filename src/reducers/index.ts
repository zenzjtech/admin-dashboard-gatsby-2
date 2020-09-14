import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { profile } from './profile.reducer';
import { timesheet } from './timesheet.reducer'

const rootReducer = combineReducers({
  auth,
  profile,
  timesheet
});

export default rootReducer;
