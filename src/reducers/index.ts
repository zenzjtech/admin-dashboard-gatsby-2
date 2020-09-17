import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { profile } from './profile.reducer';
import { timesheet } from './timesheet.reducer'
import { app } from './app.reducer';

const rootReducer = combineReducers({
  auth,
  profile,
  timesheet,
  app
});

export default rootReducer;
