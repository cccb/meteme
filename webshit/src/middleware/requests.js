
/*
 * Request Middleware
 *
 * Used for dispatching requests to the backend and
 * emitting response actions.
 */

import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'


// Request Action types
export const REQUEST_TYPE_PREFIX = "@@requests";

export const REQUEST_FETCH = `${REQUEST_TYPE_PREFIX}/FETCH`;
export const FETCH_REQUEST = `${REQUEST_TYPE_PREFIX}/FETCH_REQUEST`;
export const FETCH_SUCCESS = `${REQUEST_TYPE_PREFIX}/FETCH_SUCCESS`;
export const FETCH_ERROR   = `${REQUEST_TYPE_PREFIX}/FETCH_ERROR`;

export const REQUEST_CREATE = `${REQUEST_TYPE_PREFIX}/CREATE`;
export const CREATE_REQUEST = `${REQUEST_TYPE_PREFIX}/CREATE_REQUEST`;
export const CREATE_SUCCESS = `${REQUEST_TYPE_PREFIX}/CREATE_SUCCESS`;
export const CREATE_ERROR   = `${REQUEST_TYPE_PREFIX}/CREATE_ERROR`;

export const REQUEST_UPDATE = `${REQUEST_TYPE_PREFIX}/UPDATE`;
export const UPDATE_REQUEST = `${REQUEST_TYPE_PREFIX}/UPDATE_REQUEST`;
export const UPDATE_SUCCESS = `${REQUEST_TYPE_PREFIX}/UPDATE_SUCCESS`;
export const UPDATE_ERROR   = `${REQUEST_TYPE_PREFIX}/UPDATE_ERROR`;

export const REQUEST_DESTROY = `${REQUEST_TYPE_PREFIX}/DESTROY`;
export const DESTROY_REQUEST = `${REQUEST_TYPE_PREFIX}/DESTROY_REQUEST`;
export const DESTROY_SUCCESS = `${REQUEST_TYPE_PREFIX}/DESTROY_SUCCESS`;
export const DESTROY_ERROR   = `${REQUEST_TYPE_PREFIX}/DESTROY_ERROR`;


// Action creators
const _request = (type) => (endpoint, blocking) => ({
  type: type,
  payload: { 
    endpoint,
    blocking,
  },
});

const _success = (type) => (endpoint, data, blocking) => ({
  type: type,
  payload: {
    endpoint,
    data,
    blocking,
  }
});

const _error = (type) => (endpoint, error, blocking) => ({
  type: FETCH_ERROR,
  payload: {
    endpoint,
    error,
    blocking,
  }
});
  
const fetchRequest = _request(FETCH_REQUEST);
const fetchSuccess = _success(FETCH_SUCCESS);
const fetchError = _error(FETCH_ERROR);

const createRequest = _request(CREATE_REQUEST);
const createSuccess = _request(CREATE_SUCCESS);
const createError = _request(CREATE_ERROR);

const updateRequest = _request(UPDATE_REQUEST);
const updateSuccess = _success(UPDATE_SUCCESS);
const updateError = _error(UPDATE_ERROR);

const destroyRequest = _request(DESTROY_REQUEST);
const destroySuccess = _success(DESTROY_SUCCESS);
const destroyError = _error(DESTROY_ERROR);


function request(
    methodActionType,
    endpoint,
    onRequest,
    onSuccess,
    onError,
    data=null,
    blocking=false,
  ) {
  return {
    type: methodActionType,
    payload: {
      endpoint: endpoint,
      onRequest: onRequest,
      onSuccess: onSuccess,
      onError: onError,
      data: data,
      blocking: blocking,
    }
  }
}


// Actions
export function fetch(
    endpoint, onRequest, onSuccess, onError, blocking=false,
  ) {
  return request(
    REQUEST_FETCH,
    endpoint,
    onRequest,
    onSuccess,
    onError,
    null,
    blocking,
  );
}

export function create(
    endpoint, data, onRequest, onSuccess, onError, blocking=false,
  ) {
  return request(
    REQUEST_CREATE,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
    data,
    blocking,
  );
}

export function update(
    endpoint, data, onRequest, onSuccess, onError, blocking=false,
  ) {
  return request(
    REQUEST_UPDATE,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
    data,
    blocking,
  );
}

export function destroy(
    endpoint, onRequest, onSuccess, onError, blocking=false,
  ) {
  return request(
    REQUEST_DESTROY,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
    null,
    blocking,
  );
}

/*
 * Handle GET / POST / PUT / DELETE
 */
function handleFetch(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, blocking} = payload;

  dispatch(fetchRequest(endpoint, blocking));
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.get(endpoint)
    .then((res) => (camelcaseKeys(res.data, {deep: true})))
    .catch((err) => {
      dispatch(fetchError(endpoint, err, blocking));
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      dispatch(fetchSuccess(endpoint, data, blocking));
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleCreate(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, data, blocking} = payload;

  dispatch(createRequest(endpoint, blocking));
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.post(endpoint, data)
    .then((res) => (camelcaseKeys(res.data, {deep: true})))
    .catch((err) => {
      dispatch(createError(endpoint, err, blocking));
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      dispatch(createSuccess(endpoint, data, blocking));
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleUpdate(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, data, blocking} = payload;

  dispatch(updateRequest(endpoint, blocking));
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.put(endpoint, data)
    .then((res) => (camelcaseKeys(res.data, {deep: true})))
    .catch((err) => {
      dispatch(updateError(endpoint, err, blocking));
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      dispatch(updateSuccess(endpoint, data, blocking));
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleDestroy(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, blocking} = payload;

  dispatch(destroyRequest(endpoint, blocking));
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.delete(endpoint)
    .then((res) => (camelcaseKeys(res.data, {deep: true})))
    .catch((err) => {
      dispatch(destroyError(endpoint, err, blocking));
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      dispatch(destroySuccess(endpoint, data, blocking));
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

/*
 * Decode action and perform http request
 */
function handleRequestAction(dispatch, action) {
  switch (action.type) {
    case REQUEST_FETCH:
      return handleFetch(dispatch, action.payload);
    case REQUEST_CREATE:
      return handleCreate(dispatch, action.payload);
    case REQUEST_UPDATE:
      return handleUpdate(dispatch, action.payload);
    case REQUEST_DESTROY:
      return handleDestroy(dispatch, action.payload);
    default:
  }
}



export const requestsMiddleware = (store) => (next) => (action) => {
  // Handle request actions
  if (action.type.startsWith(REQUEST_TYPE_PREFIX)) {
    return handleRequestAction(store.dispatch, action);
  }

  return next(action);
}



