import React from 'react'

import Nav from '../nav'
import Card from '../card'

import Stats from './stats'
import TransactionLog from './transaction-log'

export default React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-5">
          <Nav />

          <Stats />
          <TransactionLog />

        </div /* end col left */ >
        <div className="col-md-5 col-md-offset-1">
        </div /* end col right */>
      </div /* end row */ >
    );
  }
});


