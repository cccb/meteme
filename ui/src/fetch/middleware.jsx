
/*
 * Http Request Middleware
 */
import axios from 'axios'

import {HTTP_GET,
        HTTP_POST,
        HTTP_PUT,
        HTTP_DELETE} from './actions'


const makeAction = (type, payload={}) => {
  return {
    type: type,
    payload: payload,
  }
}

const makeHttpRequest = (handler) => (dispatch, opts, extra) => {
  const data = opts["data"]||{};
  dispatch(makeAction(opts.request));
  handler(opts.url, data)
    .then((res) => {
      dispatch(makeAction(opts.success, res.data))
    })
    .catch((err) => {
      dispatch(makeAction(opts.error, err.data));
    });
}

const httpGet = makeHttpRequest(axios.get);
const httpPost = makeHttpRequest(axios.post);
const httpPut = makeHttpRequest(axios.put);
const httpDelete = makeHttpRequest(axios.delete);

const makeFetchMiddleware = (extra) =>
  ({dispatch, getState}) => (next) => (action) => {

  // Check if we have an request to the server
  if (!action.type.startsWith("@@request/")) {
    return next(action); // Just move on.
  }

  // Handle http request
  switch(action.type) {
    case HTTP_GET:
      return httpGet(dispatch, action.payload, extra);

    case HTTP_POST:
      return httpPost(dispatch, action.payload, extra);

    case HTTP_PUT:
      return httpPut(dispatch, action.payload, extra);

    case HTTP_DELETE:
      return httpDelete(dispatch, action.payload, extra);

    default:
      console.error("HTTP METHOD NOT IMPLEMENTED", action.type);
  }
};

export default makeFetchMiddleware();
