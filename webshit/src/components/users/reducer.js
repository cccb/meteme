
/*
 * Users reducer
 */
import { FETCH_USERS_REQUEST,
         FETCH_USERS_SUCCESS,
         FETCH_USERS_ERROR,
         
         FETCH_USER_REQUEST,
         FETCH_USER_SUCCESS,
         FETCH_USER_ERROR} from './actions'

import { DEPOSIT_SUCCESS, PURCHASE_SUCCESS }
  from '../store/actions'

const initialState = {
  all: [],
  current: null,
  isLoading: false,
  error: null,
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        all: action.payload.users,
      });
    case FETCH_USERS_ERROR:
    case FETCH_USER_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      });

    case FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        current: action.payload.user,
      });

    case PURCHASE_SUCCESS:
    case DEPOSIT_SUCCESS:
      return Object.assign({}, state, {
        current: action.payload.user,
      });
    default:
  }
  return state;
}


