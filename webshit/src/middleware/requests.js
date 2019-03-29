
/*
 * Request Middleware
 *
 * Used for dispatching requests to the backend and
 * emitting response actions.
 */

import axios from 'axios'


// Request Action types
export const REQUEST_TYPE_PREFIX = "@@requests";

export const REQUEST_FETCH = `${REQUEST_TYPE_PREFIX}/FETCH`;
export const REQUEST_CREATE = `${REQUEST_TYPE_PREFIX}/CREATE`;
export const REQUEST_UPDATE = `${REQUEST_TYPE_PREFIX}/UPDATE`;
export const REQUEST_DESTROY = `${REQUEST_TYPE_PREFIX}/DESTROY`;


function request(
    methodActionType,
    endpoint,
    onRequest,
    onSuccess,
    onError,
    data=null,
  ) {
  return {
    type: methodActionType,
    payload: {
      endpoint: endpoint,
      onRequest: onRequest,
      onSuccess: onSuccess,
      onError: onError,
      data: data,
    }
  }
}


// Actions
export function fetch(endpoint, onRequest, onSuccess, onError) {
  return request(
    REQUEST_FETCH,
    endpoint,
    onRequest,
    onSuccess,
    onError,
  );
}

export function create(endpoint, data, onRequest, onSuccess, onError) {
  return request(
    REQUEST_CREATE,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
    data,
  );
}

export function update(endpoint, data, onRequest, onSuccess, onError) {
  return request(
    REQUEST_UPDATE,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
    data,
  );
}

export function destroy(endpoint, onRequest, onSuccess, onError) {
  return request(
    REQUEST_DESTROY,
    endpoint,
    onRequest,
    onSuccess, 
    onError,
  );
}

/*
 * Handle GET / POST / PUT / DELETE
 */
function handleFetch(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError} = payload;
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.get(endpoint)
    .then((res) => (res.data))
    .catch((err) => {
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleCreate(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, data} = payload;
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.post(endpoint, data)
    .then((res) => (res.data))
    .catch((err) => {
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleUpdate(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError, data} = payload;
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.put(endpoint, data)
    .then((res) => (res.data))
    .catch((err) => {
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
      if (onSuccess) { dispatch(onSuccess(data)) }
    });
}

function handleDestroy(dispatch, payload) {
  const {endpoint, onRequest, onSuccess, onError} = payload;
  if (onRequest) { dispatch(onRequest()); }

  // Make request
  axios.delete(endpoint)
    .then((res) => (res.data))
    .catch((err) => {
      if (onError) { dispatch(onError(err)); }
    })
    .then((data) => {
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



