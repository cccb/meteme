

import React from 'react'
import { connect } from 'react-redux'

// Actions
import { fetchTransactions } from '../../actions/transactions'

// Components
import Card from '../card'

/**
 * Transaction
 */
const Transaction = React.createClass({
  render() {
    var date = this.props.date.toString();
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{date}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.product}</td>
      </tr>
    );
  }
});


/**
 * Transaction Group
 */
const TransactionsGroup = React.createClass({
  render() {

    var transactions = this.props.transactions.map(function(transaction) {
      return (
        <Transaction key={transaction.id}
                     id={transaction.id}
                     date={transaction.createdAt}
                     amount={transaction.amount}
                     product={transaction.productName} />

      );
    });

    return (
      <div className="transactions-group">
        <h4>{this.props.month}.{this.props.year}</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {transactions}
          </tbody>
        </table>
        <hr />
      </div>
    );
  }
});

/*
            {this.props.transactions.map(function(transaction) {
              ;
            })}

*/

/**
 * Transaction Log
 */
const TransactionsLog = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTransactions());
  },

  render() {
    var groups = [];
    for( var date in this.props.groupedTransactions ) {
      var transactions = this.props.groupedTransactions[date];
      var tokens = date.split(',');
      var year = tokens[0]; var month = tokens[1];
      groups.push(<TransactionsGroup key={date}
                                     year={year}
                                     month={month}
                                     transactions={transactions} />);
    }

    return (
         <Card header="Transactions">
          {groups}
         </Card>
    );
  }
});


// Create container component
export default connect(
  (state) => {
    return {
      groupedTransactions: state.transactions.groupedByMonth
    }
  }
)(TransactionsLog);

