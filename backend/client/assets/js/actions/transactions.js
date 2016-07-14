
import axios from 'axios'

import { apiError } from './api'

export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

/*
 * Actions
 */

/**
 * Transactions stated loading
 */
export function requestTransactions() {
  return {
    type: REQUEST_TRANSACTIONS
  }
}

/**
 * Transactions finished loading
 */
export function receiveTransactions(transactions) {
  return {
    type: RECEIVE_TRANSACTIONS,
    transactions: transactions
  }
}

/**
 * Load all transactions from api
 */
export function fetchTransactions() {
  return (dispatch) => {
    dispatch(requestTransactions()); // Start loading event
    axios.get('/api/transactions/')
      .then(function(res) {
        dispatch(receiveTransactions(res.data));
      })
      .catch(function(error) {
        apiError(error);
      });
  }
}


