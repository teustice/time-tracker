import { combineReducers } from 'redux';

import currentUser from './currentUser';
import {
  todos,
  deleteTodo,
  deleteTodoBatch,
  createTodo,
  createTodoBatch
} from './todos';
import notifications from './notifications';

export default combineReducers({
  currentUser,
  todos,
  deleteTodo,
  deleteTodoBatch,
  createTodo,
  createTodoBatch,
  notifications
})
