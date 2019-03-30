import React from 'react'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router'

import PickUser from './pick-user'


class StoreMain extends React.Component {
  render() {
    return (
      <div className="store store-main">
        <Route exact path="/store" render={() => (
          <Redirect to="/store/pick-user" />
        )} />
        
        <Route path="/store/pick-user"
               component={PickUser} />
      
      </div>
    );
  }
}


export default connect(
  (state) => ({

  })
)(StoreMain);

