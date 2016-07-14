
import React from 'react'
import {connect} from 'react-redux'

import Card    from '../card'
import Datefmt from '../misc/datefmt'

import { fetchStats } from '../../actions/stats'


// Helper Views
var DonationStats = React.createClass({
  render() {
    var now = new Date();
    return (
      <li>Spenden:
        <ul>
          <li><Datefmt date={now} />:&nbsp;
            <span className="label label-primary">
              {this.props.currentMonth}
            </span>
          </li>
          <li>Gesamt:&nbsp;
            <span className="label label-primary">
              {this.props.total}
            </span>
          </li>
        </ul>
      </li>
    );
  }
});


// Helper View: Transactions
var TransactionStats = React.createClass({
  render() {
    var now = new Date();
    return (
      <li>
        Transaktionen:
          <ul>
            <li><Datefmt date={now} />:&nbsp;
              <span className="label label-primary">
                {this.props.currentMonth}
              </span>
            </li>
            <li>Gesamt:&nbsp;
              <span className="label label-primary">
                {this.props.total}
              </span>
            </li>
          </ul>
      </li>
    );
  }
});


// Main View: Stats
var StatsView = React.createClass({
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStats());
  },

  render(){
    return (
      <Card header="Stats">
        <div className="row">
          <div className="col-md-6">
            <ul className="stats-list">
              <li>Kassenstand:&nbsp;
                <span className="label label-primary">
                  {this.props.moneyGauge}
                </span>
              </li>
              <DonationStats currentMonth={this.props.donationsCurrentMonth}
                             total={this.props.donationsTotal} />
            </ul>
          </div /* End Left */>
          <div className="col-md-6">
            <ul className="stats-list">
              <TransactionStats currentMonth={this.props.transactionsCurrentMonth}
                                total={this.props.transactionsTotal} />
            </ul>
          </div /* End Right */>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <ul className="stats-list">
              <li>Accounts:&nbsp;
                <span className="label label-primary">{this.props.users}</span>
              </li>
            </ul>
          </div /* End Left */>
          <div className="col-md-6">
            <ul className="stats-list">
              <li>Version:&nbsp;
                <span className="label label-primary">{this.props.backendVersion}</span>
              </li>
            </ul>
          </div /* End Right */>
        </div /* End Row */>
      </Card>
    );
  }
});


// Export Container Component: Stats
export default connect(
  (state) => {
    return state.stats;
  }
)(StatsView);

