
import { fetch } from "../../middleware/requests"

export const FETCH_USERS_REQUEST = "users/FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "users/FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "users/FETCH_USERS_ERROR";

export const FETCH_USER_REQUEST = "users/FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "users/FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "users/FETCH_USER_ERROR";


/*
 * Action Creators
 */

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: {
    users: users,
  }
});

export const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  payload: {
    error: error,
  }
});

export const fetchUsers = () => fetch(
  "/api/v1/users",
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
);

export const fetchUserRequest = (userId) => () => ({
  type: FETCH_USER_REQUEST,
  payload: {
    userId: userId,
  }
});

export const fetchUserSuccess = (userId) => (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    userId: userId,
    user: user,
  }
});

export const fetchUserError = (userId) => (error) => ({
  type: FETCH_USER_ERROR,
  payload: {
    error: error,
    userId: userId,
  }
});

export const fetchUser = (userId) => fetch(
  `/api/v1/users/${userId}`,
  fetchUserRequest(userId),
  fetchUserSuccess(userId),
  fetchUserError(userId),
); 

