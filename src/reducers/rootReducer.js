import { combineReducers } from 'redux';

import currentUser from './currentUser';
import {
  timers,
  createTimer,
  updateTimer,
  deleteTimer
} from './timers';
import notifications from './notifications';

export default combineReducers({
  currentUser,
  timers,
  deleteTimer,
  updateTimer,
  createTimer,
  notifications
})
