


// Just some reducer test...
var fnordReducer = function(state = 0, action) {
  if ( action.type == 'ADD_FNORD' ) {
    return state + 1;
  }
  else if ( action.type == 'REMOVE_FNORD' ) {
    return state - 1;
  }

  return state;
};


export default fnordReducer;

