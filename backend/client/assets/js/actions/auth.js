
import axios from 'axios'

import { apiError } from './api'

export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR   = 'AUTHENTICATION_ERROR';

export const SESSION_SYNC_REQUEST = 'SESSION_SYNC_REQUEST';
export const SESSION_SYNC_SUCCESS = 'SESSION_SYNC_SUCCESS';


/**
 * Request authentication
 */
export function authenticationRequest() {
  return {
    type: AUTHENTICATION_REQUEST
  }
}


/**
 * Authentication success
 */
export function authenticationSuccess(session) {
  return {
    type: AUTHENTICATION_SUCCESS,
    session: session
  }
}

/**
 * Authentication error
 */
export function authenticationError(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: error
  }
}

/**
 * Authenticate
 */
export function authenticate(credentials) {
  return (dispatch) => {
    dispatch(authenticationRequest());
    axio.post('/api/session/', credentials)
      .then((result) => {
        dispatch(authenticationSuccess(result.data));
      })
      .catch((error) => {
        dispatch(authenticationError(error.data));
      });
  };
}


/**
 * Sync with session
 */
export function sessionSyncRequest() {
  return {
    type: SESSION_SYNC_REQUEST
  }
}

/**
 * Sync finished
 */
export function sessionSyncSuccess() {
  return {
    type: SESSION_SYNC_SUCCESS
  }
}


/**
 * Sync with session
 */
export function syncSession() {
  return (dispatch) => {
    dispatch(sessionSyncRequest());
    axios.get('/api/session/')
      .then((result) => {
        dispatch(sessionSyncSuccess());
        dispatch(authenticationSuccess(result.data));
      })
      .catch((result) => {
        dispatch(apiError(error.data));
      });
  };
}

