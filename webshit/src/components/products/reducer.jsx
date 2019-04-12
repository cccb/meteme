
import { FETCH_PRODUCTS_REQUEST,
         FETCH_PRODUCTS_SUCCESS,
         FETCH_PRODUCTS_ERROR } from './actions'

const initialState = {
  all: [],
  isLoading: false,
  error: null,
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case FETCH_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        all: action.payload.products,
     });

    case FETCH_PRODUCTS_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error,
      });

    default:
  }

  return state;
}

