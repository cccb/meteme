
import { REQUEST_TRANSACTIONS, RECEIVE_TRANSACTIONS } from '../actions/transactions'
import { API_ERROR } from '../actions/api'


// == Helpers

/**
 * Transform transaction
 */
function makeTransaction(raw) {
  var createdAt = new Date(raw.created_at);

  var transaction = {
    id: raw.id,
    amount: raw.amount,
    product: raw.product,
    productName: raw.product_name,
    createdAt: createdAt,
    createdAtMonth: createdAt.getMonth(),
    createdAtYear: createdAt.getFullYear()
  };
  return transaction;
}


// == Reducer

var initialState = {
  all: [],
  groupedByMonth: {},

  isFetching: false
};

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TRANSACTIONS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_TRANSACTIONS:
      // Prepare transactions: Group by (year, month)
      var transactions = [];
      action.transactions.forEach(function(transaction) {
        transactions.push(makeTransaction(transaction));
      });

      // Group transactions by (year, month)
      var groupedTransactions = {};
      transactions.forEach(function(transaction) {
        var key = [transaction.createdAtYear, transaction.createdAtMonth];
        if(!groupedTransactions[key]) {
          groupedTransactions[key] = [];
        }
        // Add to month
        groupedTransactions[key].push(transaction);
      });

      return Object.assign({}, state, {
        all: transactions,
        groupedByMonth: groupedTransactions
      });

    case API_ERROR:
      return Object.assign({}, state, {
        isFetching: false
      });
  }

  return state;
}


