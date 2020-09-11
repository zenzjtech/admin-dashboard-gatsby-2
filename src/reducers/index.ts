import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { profile } from './profile.reducer';

const rootReducer = combineReducers({
  auth,
  profile
});

export default rootReducer;
