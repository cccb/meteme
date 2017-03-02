
import { AUTHENTICATION_REQUEST,
         AUTHENTICATION_ERROR,
         AUTHENTICATION_SUCCESS,

         SESSION_SYNC_REQUEST,
         SESSION_SYNC_SUCCESS } from '../actions/auth'

import { API_ERROR } from '../actions/api'


// Auth reducer
const initialAuthState = {
  isSynced: false,
  isSyncing: false,
  isAuthenticated: false,
  isAuthenticating: false,
  user: {
    id: 0,
    name: ""
  }
}

var authReducer = function(state = initialAuthState, action) {

  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });

    case AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.user,
      });

    case AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.error
      });

    case SESSION_SYNC_REQUEST:
      return Object.assign({}, state, {
        isSyncing: true
      });

    case API_ERROR:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isSyncing: false
      });
  }
  return state;
};


// == Exports
export default authReducer;

