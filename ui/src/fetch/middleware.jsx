
/*
 * Fetch Middleware
 * (c) 2018 Matthias Hannig
 */

import {HTTP_GET,
        HTTP_POST,
        HTTP_PUT,
        HTTP_DELETE} from './actions'



const getCookie = function() {
  const cookie = decodeURIComponent(document.cookie);
  const parts = cookie.split("; ");
  let data = {};

  for (const p of parts) {
    const [k, v] = p.split("=", 2);
    data[k] = v;
  }

  return data;
}

const httpGet = function(opts, extra) {
  fetch(opts.url,
        Object.assign({}, extra, {
          method: 'GET'
        })
  ).then((res) => {
    console.log(res.json());
  })
  .catch((err) => {
    console.log("ERRR:", err);
  });
};


const makeFetchMiddleware = (extra) =>
  (dispatch, getState) => (next) => (action) => {

  // Check if we have an request to the server
  if (!action.type.startsWith("@@fetch/")) {
    return next(action); // Just move on.
  }

  // Handle http fetch
  switch(action.type) {
    case HTTP_GET:
      return httpGet(dispatch, action.payload, extra);

    case HTTP_POST:
      console.log("putting the data...");
      break;
    case HTTP_DELETE:
      console.log("deleting da resource");
      break;
    case HTTP_PUT:
      console.log('Updading...');
      break;

    default:
      console.error("HTTP METHOD NOT IMPLEMENTED", action.type);
  }

};


const cookie = getCookie();
export default makeFetchMiddleware({
  headers: {
    "X-CSRFToken": cookie["csrftoken"],
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});
