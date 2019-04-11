

/*
 * Store reducer
 */

import { MAIN_SCREEN_TRANSITION_REQUEST,
         MAIN_SCREEN_TRANSITION_SUCCESS,

         PURCHASE_SUCCESS } from './actions'

const initialState = {
  needsMainScreenTransition: false,
};


export default function reducer(state=initialState, action) {
  switch(action.type) {
    case PURCHASE_SUCCESS:
    case MAIN_SCREEN_TRANSITION_REQUEST:
      return Object.assign({}, state, {
        needsMainScreenTransition: true,
      });

    case MAIN_SCREEN_TRANSITION_SUCCESS:
      return Object.assign({}, state, {
        needsMainScreenTransition: false,
      });

    default:
  }
  return state;
}

