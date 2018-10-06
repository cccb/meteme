/*
 * Root Reducer
 */

import { combineReducers } from 'redux'

// Application Reducers
import usersReducer from 'components/users/reducer'


export default combineReducers({
  users: usersReducer,
});

