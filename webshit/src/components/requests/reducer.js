
/*
 * Request reducer: Handles requests actions
 */

import { FETCH_REQUEST,
         FETCH_SUCCESS,
         FETCH_ERROR,

         CREATE_REQUEST,
         CREATE_SUCCESS,
         CREATE_ERROR,

         UPDATE_REQUEST,
         UPDATE_SUCCESS,
         UPDATE_ERROR,

         DESTROY_REQUEST,
         DESTROY_SUCCESS,
         DESTROY_ERROR } from '../../middleware/requests'

import { DISMISS_OVERLAY } from './actions'

const initialState = {
  endpoint: "",
  showModal: false,
  isLoading: false,
  isFinished: false,
  error: null,
}



function _handleRequest(state, payload) {
  const {endpoint, blocking} = payload;
  if (!blocking) {
    return state;
  }

  return Object.assign({}, state, {
    endpoint: endpoint,
    showModal: true,
    isLoading: true,
    isFinished: false,
    error: null,
  });
}

function _handleSuccess(state, payload) {
  const {endpoint} = payload;
  if (endpoint !== state.endpoint) {
    return state;
  }

  return Object.assign({}, state, {
    endpoint: "",
    isLoading: false,
    isFinished: true,
    showModal: false,
  });
}

function _handleError(state, payload) {
  const {endpoint,  error} = payload;
  if (endpoint !== state.endpoint) {
    return state;
  }

  return Object.assign({}, state, {
    isLoading: false,
    isFinished: true,
    error: error,
  });
}


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
    case CREATE_REQUEST:
    case UPDATE_REQUEST:
    case DESTROY_REQUEST:
      return _handleRequest(state, action.payload);

    case FETCH_SUCCESS:
    case CREATE_SUCCESS:
    case UPDATE_SUCCESS:
    case DESTROY_SUCCESS:
      return _handleSuccess(state, action.payload);

    case FETCH_ERROR:
    case CREATE_ERROR:
    case UPDATE_ERROR:
    case DESTROY_ERROR:
      return _handleError(state, action.payload);

    case DISMISS_OVERLAY:
      return Object.assign({}, state, {
        showModal: false,
      });

    default:
  }
  
  return state;
}

