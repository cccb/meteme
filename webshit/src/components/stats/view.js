
/*
 * StatsView component
 */

import React from 'react'
import { connect } from 'react-redux'

import { fetchStats } from './actions'

class StatsView  extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchStats());

    // Refresh stats every huh... 10 seconds or so...
    this.refreshTimer = setInterval(() => {
      this.props.dispatch(fetchStats());
    }, 10000);
  }

  componentDidUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  render() {
    return (
      <table className="stats">
        <tbody>
          <tr>
            <td>TX this month:</td>
            <td className="value">{this.props.txCurrentMonth}</td>
            <td>Total:</td>
            <td className="value">{this.props.txTotal}</td>
          </tr>
          <tr>
            <td>Users:</td><td className="value">{this.props.users}</td>
          </tr>
          <tr>
            <td>Money gauge:</td>
            <td className="value">{this.props.moneyGauge}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  (state) => ({
    moneyGauge: state.stats.moneyGauge,
    users: state.stats.users,
    txTotal: state.stats.transactions.total,
    txCurrentMonth: state.stats.transactions.currentMonth,
  })
)(StatsView);
