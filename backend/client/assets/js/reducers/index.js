
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import authReducer from './auth'
import statsReducer from './stats'
import transactionsReducer from './transactions'

// == Export combined reducer
export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  stats: statsReducer,
  transactions: transactionsReducer
});

