
/*
 * Users reducer
 */
import { FETCH_USERS_REQUEST,
         FETCH_USERS_SUCCESS,
         FETCH_USERS_ERROR } from './actions'


const initialState = {
  all: [],
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
        all: action.payload,
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload,
      });
    default:
  }
  return state;
}


