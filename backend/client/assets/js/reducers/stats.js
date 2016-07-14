
import { REQUEST_STATS, RECEIVE_STATS } from '../actions/stats'
import { API_ERROR } from '../actions/api'


// Default state:
var initialState = {
  isFetching: false,
};

// Create Stats Reducer
export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_STATS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_STATS:
      // Update stats state
      var stats = action.stats;
      return Object.assign({}, state, {
        donationsCurrentMonth: stats.donations.current_month,
        donationsTotal: stats.donations.total,

        transactionsCurrentMonth: stats.transactions.current_month,
        transactionsTotal: stats.transactions.total,

        moneyGauge: stats.money_gauge,

        users: stats.users,
        backendVersion: stats.backend_version,

        isFetching: false
      });

    case API_ERROR:
      return Object.assign({}, state, {
        isFetching: false
      });
  }
  return state;
}

