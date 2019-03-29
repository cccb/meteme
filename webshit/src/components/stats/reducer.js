/*
 * Stats reducer
 */

import { STATS_FETCH_SUCCESS } from './actions'

const initialState = {
  backendVersion: "unknown",
  moneyGauge: "",
  transactions: {
    total: 0,
    currentMonth: 0,
  },
  donations: {
    total: 0,
    currentMonth: 0,
  },
  users: 0,
};


function handleFetchStatsSuccess(state, stats) {
  return Object.assign({}, state, stats);
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case STATS_FETCH_SUCCESS:
      return handleFetchStatsSuccess(state, action.payload);
    default:
  }

  return state;
}

