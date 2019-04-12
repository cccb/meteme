

/*
 * Store reducer
 */

import { MAIN_SCREEN_TRANSITION_REQUEST,
         MAIN_SCREEN_TRANSITION_SUCCESS,

         TRANSFER_SUCCESS,
         TRANSFER_SET_AMOUNT,

         PURCHASE_SUCCESS } from './actions'

const initialState = {
  needsMainScreenTransition: false,
  transferAmount: 0,
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

    case TRANSFER_SET_AMOUNT:
      return Object.assign({}, state, {
        transferAmount: action.payload.amount,
      });

    case TRANSFER_SUCCESS:
      return Object.assign({}, state, {
        transferAmount: 0,
      });

    default:
  }
  return state;
}

