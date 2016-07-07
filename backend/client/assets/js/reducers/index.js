
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import authReducer from './auth'
import fnordReducer from './fnord'

// == Export combined reducer
export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  fnord: fnordReducer
});

