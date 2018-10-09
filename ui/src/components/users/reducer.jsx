
import {FETCH_USERS_REQUEST,
        FETCH_USERS_SUCCESS,
        FETCH_USERS_ERROR} from './actions'


const initialState = {
  all: [],
  error: null,
  isLoading: false
};


const _loadUsers = function(state, users) {
  return Object.assign({}, state, {
    all: users,
    error: null,
    isLoading: false,
  });
}

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case FETCH_USERS_SUCCESS:
      return _loadUsers(state, action.payload);

    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload,
      });

    default:
  }

  return state;
}

