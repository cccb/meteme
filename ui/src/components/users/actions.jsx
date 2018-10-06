
import {HTTP_GET} from 'fetch/actions'

export const FETCH_USERS_REQUEST = "@users/FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "@users/FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "@users/FETCH_USERS_ERROR";


export function fetchUsers() {
  return {
    type: HTTP_GET,
    payload: {
      url: "/api/v1/users/",

      request: FETCH_USERS_REQUEST,
      success: FETCH_USERS_SUCCESS,
      error:   FETCH_USERS_ERROR,
    }
  }
}


