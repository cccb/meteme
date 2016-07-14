
import axios from 'axios'

import { apiError } from './api'

export const REQUEST_STATS = 'FETCH_STATS';
export const RECEIVE_STATS = 'RECEIVE_STATS';


/*
 * Actions
 */

export function requestStats() {
  return {
    type: REQUEST_STATS
  }
}

export function receiveStats(stats) {
  return {
    type: RECEIVE_STATS,
    stats: stats
  }
}

export function fetchStats() {
  return dispatch => {
    dispatch(requestStats()); // Send Event

    axios.get('/api/stats/')
      .then(function(res){
        dispatch(receiveStats(res.data))
      })
      .catch(function(error) {
        apiError(error);
      });
   };
}


