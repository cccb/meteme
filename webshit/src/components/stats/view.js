
/*
 * StatsView component
 */

import React from 'react'
import { connect } from 'react-redux'

import { fetchStats } from './actions'

class StatsView  extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchStats());
  }

  render() {
    return (
      <table className="stats">
        <tbody>
          <tr>
            <td>TX this month:</td><td className="value">23</td>
            <td>Total:</td><td className="value">19239</td>
          </tr>
          <tr>
            <td>Users:</td><td className="value">23</td>
          </tr>
          <tr>
            <td>Money gauge:</td><td className="value">19329</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  (state) => ({

  })
)(StatsView);
