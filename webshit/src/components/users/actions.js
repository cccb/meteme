
import { fetch } from "../../middleware/requests"

export const FETCH_USERS_REQUEST = "users/FETCH_REQUEST";
export const FETCH_USERS_SUCCESS = "users/FETCH_SUCCESS";
export const FETCH_USERS_ERROR = "users/FETCH_ERROR";


/*
 * Action Creators
 */

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  payload: error,
});

export const fetchUsers = () => fetch(
  "/api/v1/users",
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
);


