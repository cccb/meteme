
// Auth reducer
const initialAuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: {
    id: 0,
    name: ""
  }
}

var authReducer = function(state = initialAuthState, action) {

  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return Object.assign({}, state, {
        isAuthenticating: true
      });

    case 'AUTHENTICATION_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.user,
      });

    case 'AUTHENTICATION_ERROR':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.error
      });
  }
  return state;
};


// == Exports
export default authReducer;

