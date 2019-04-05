
/*
 * StatsView component
 */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchStats } from './actions'

const StatsView = (props) => {

  useEffect(() => {
    props.dispatch(fetchStats());
  }, []);

  // 
  useEffect(() => {
    // Refresh stats every huh... 10 seconds or so...
    const refreshTimer = setInterval(() => {
      props.dispatch(fetchStats());
    }, 10000);
  

    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>TX this month:</td>
          <td className="value">{props.txCurrentMonth}</td>
          <td>Total:</td>
          <td className="value">{props.txTotal}</td>
        </tr>
        <tr>
          <td>Users:</td><td className="value">{props.users}</td>
        </tr>
        <tr>
          <td>Money gauge:</td>
          <td className="value">{props.moneyGauge}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default connect(
  (state) => ({
    moneyGauge: state.stats.moneyGauge,
    users: state.stats.users,
    txTotal: state.stats.transactions.total,
    txCurrentMonth: state.stats.transactions.currentMonth,
  })
)(StatsView);
