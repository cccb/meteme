
import { fetch } from '../../middleware/requests'


export const STATS_FETCH_REQUEST = "stats/FETCH_REQUEST";
export const STATS_FETCH_SUCCESS = "stats/FETCH_SUCCESS";
export const STATS_FETCH_ERROR = "stats/FETCH_ERROR";

// Action Creators
export const fetchStatsRequest = () => ({
  type: STATS_FETCH_REQUEST,
})

export const fetchStatsSuccess = (stats) => ({
  type: STATS_FETCH_SUCCESS,
  payload: stats,
})

export const fetchStatsError = (error) => ({
  type: STATS_FETCH_ERROR,
  payload: error,
})

export const fetchStats = () => fetch(
  "/api/v1/stats",
  () => fetchStatsRequest(),
  (stats) => fetchStatsSuccess(stats),
  (error) => fetchStatsError(error)
);


